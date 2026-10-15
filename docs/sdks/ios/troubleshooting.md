---
id: troubleshooting
title: Troubleshooting
---

## Notification with images (Rich Medias) are not working

In the project navigator, select the top-level project directory and select the Open `CleverPushNotificationContentExtension` & `CleverPushNotificationServiceExtension` target in the project and targets list.

1. Once you start with the fresh Xcode project, it will select last OS support as a deployment target for e.g (if you have generated project via XCode 12.4 and its latest OS support is 14.4 so 14.4 will be default selection on Xcode.)

2. Unless you have a specific reason not to, you should set the Deployment Target to be iOS 10 which is the version of iOS that Apple released Rich Media for push. iOS versions under 10 will not be able to get Rich Media.

3. You will have to make sure all the deployment targets of the extensions must be the same.

4. In the Extension target, set `Skip Install` build setting to `NO` to test via Xcode

5. Make sure the build number + version for the Extension target is same like the Main target

6. An iOS device (iPhone, iPad, iPod Touch) to test on. The Xcode simulator doesn't support push notifications so you must test on a real device.

Also complete the [Notification Service Extension checklist](#notification-service-extension-delivered-count-incorrect-or-delivery-api-not-called) below. Rich media and delivery tracking both depend on the extension actually running.


## Notification Service Extension: delivered count incorrect or delivery API not called

CleverPush records **iOS notification delivered** events from the **Notification Service Extension (NSE)**, not from the main app. If the dashboard Delivered count is too low, stuck, or the delivery API is never called, the NSE is usually missing, not running, or not calling `CleverPushExtension`.

Full setup: [Setup → Add Notification Service Extension](./setup#4-add-notification-service-extension) and [replace the extension source](./setup#6-replace-notification-service-extension-source-code).

### What the extension must do

iOS only launches a Notification Service Extension when the push payload includes **`mutable-content: 1`**. CleverPush sets this for notifications that need media or delivery tracking. If that flag is missing, the extension never starts and no delivery request is sent.

Inside `NotificationService`, you must:

1. Copy the request content to `UNMutableNotificationContent`.
2. Call `CleverPushExtension.didReceiveNotificationExtensionRequest(_:with:)` (Swift) / `didReceiveNotificationExtensionRequest:withMutableNotificationContent:` (Objective-C).
3. Call the same `CleverPushExtension` expire method in `serviceExtensionTimeWillExpire`.
4. Then call Apple’s `contentHandler` with the (possibly updated) content.

Do not return from `didReceive` without calling the CleverPush method. Do not use a custom NSE implementation that never forwards the request to `CleverPushExtension`.

If you handle notifications entirely yourself, you can also report delivery with `CleverPush.trackNotificationDelivered("NOTIFICATION_ID")` from the main app (see [Methods](./methods#track-notification-delivered--clicked)). That is a fallback, not a replacement for a correctly integrated NSE.

### Checklist

**Target & embedding**

- The app has a Notification Service Extension target (recommended name: `CleverPushNotificationServiceExtension`).
- In the main app target → **Build Phases → Embed App Extensions**, the extension is listed and **“Copy only when installing” is unchecked**. If that checkbox is on, the NSE is not installed with debug/run builds and will never run.
- **Version** and **Build** of the extension match the main app.
- **Skip Install** is `NO` on the extension when you test from Xcode.
- Deployment target of the extension is iOS 10+ and aligned with the main app (see [Rich Medias](#notification-with-images-rich-medias-are-not-working)).

**Signing & capabilities**

- The extension is signed with the **same team** as the main app.
- **App Groups** is enabled on **both** the main app and the NSE, using `group.YOUR.BUNDLE.ID.cleverpush` (or `setAppGroupIdentifierSuffix` if you use a custom suffix). Delivery tracking and `getNotifications` share data through this group.
- Push Notifications capability stays on the **main app**. The NSE does not replace that capability.

**SDK in the extension (not the core SDK on the wrong target)**

- **CocoaPods:** the extension target uses `pod 'CleverPush/CleverPushExtension'` (same version as the app). After changing the Podfile, run `pod install`.
- **SPM:** add the **CleverPushExtension** product to the extension target. Do not add the core **CleverPush** product there.
- Do not mix two different CleverPush versions between the app and the extension.

**Source & Info.plist**

- `NotificationService` source matches the [Setup replacement](./setup#6-replace-notification-service-extension-source-code) (`import CleverPushExtension` / `#import "CleverPushExtension/CleverPushExtension.h"`).
- The extension `Info.plist` uses `UNNotificationServiceExtension` as `NSExtensionPointIdentifier` (Xcode sets this when you add the NSE template). Do not change it to a Content Extension identifier.

**Runtime**

- Test on a **physical device**. Remote pushes (and therefore the NSE) do not run on the Simulator.
- Reinstall the app after adding or changing the extension. iOS registers the NSE at install time.
- Another notification extension or a second NSE on the same app can prevent CleverPush’s extension from running. Keep a single NSE and forward to `CleverPushExtension`.
- Apps with **Stage / Live / Master** targets need a **separate NSE per target**, with matching App Groups. See [Managing Multiple Targets](./setup#managing-multiple-targets-in-your-app).

### How to confirm the extension is running

1. On a device, run the **extension scheme** (or the app with the NSE attached) from Xcode and set a breakpoint in `didReceive`.
2. Send a push that includes media or `mutable-content`. If the breakpoint never hits, iOS is not launching the NSE (embedding, signing, `mutable-content`, or “Copy only when installing”).
3. If the breakpoint hits but Delivered still does not increase, confirm the CleverPush call is present and that the App Group is shared so the SDK can read channel / subscription data.

### Notification Content Extension (optional)

The **Content Extension** is only for custom UI (for example carousels). It does **not** report Delivered. Missing or broken Content Extension will not explain a wrong delivered count; a missing or broken **Service** Extension will.


## When opening a Notification, all other Notifications get cleared

This is due to iOS automatically clearing all notifications when our SDK reset the badge count to zero. This behaviour can be changed.
Please refer to the **Badge Counts** section on the **[Setup](./setup#badge-counts)** page (`setAutoClearBadge` / `setIncrementBadge`) for further instructions.


## Notifications not received while developing

In some cases it is needed to mark your subscriptions as "Sandbox mode" subscriptions in the CleverPush dashboard (Channels -> App Push -> Subscriptions -> Click on your subscription -> Mark as APNS Sandbox mode).

Also confirm:

1. You are testing on a **physical device**. The iOS Simulator does not receive remote push notifications.
2. The main app target has the **Push Notifications** capability and **Background Modes → Remote notifications**.
3. An APNs Auth Key (or certificate) is uploaded in the CleverPush channel settings and matches this app’s Bundle ID.
4. Debug builds use the APNs **sandbox** environment. A production token will not receive sandbox pushes (and the other way around).
5. The SDK is initialized **once**, from `AppDelegate` (`initWithLaunchOptions`) or, for Scene-based apps, from SceneDelegate (`initWithConnectionOptions`). See [Do Not Initialize the SDK Twice](#do-not-initialize-the-sdk-twice).
6. No other push SDK (or a custom `UNUserNotificationCenter` delegate) is replacing CleverPush’s notification handling. See [Custom Delegate in UNUserNotificationCenter Breaking SDK](#custom-delegate-in-unusernotificationcenter-breaking-sdk).


## `getNotifications` is empty / badge count is not updated

`getNotifications`, inbox, and automatic badge updates require a shared **App Group** between the main app and the Notification Service Extension.

1. Create `group.YOUR.BUNDLE.ID.cleverpush` and enable it on **both** the app target and `CleverPushNotificationServiceExtension`. See [Setup → Add AppGroup](./setup#10-add-appgroup-optional-but-recommended).
2. If your App Group does not follow that default scheme, call `setAppGroupIdentifierSuffix` **before** initializing the SDK.
3. Extension **Version** and **Build** must match the main app.
4. Rebuild and reinstall after changing App Groups; entitlements are applied at install time.


## SceneDelegate apps: SDK not initialized / deep links not handled

If the app uses `UIScene` / SceneDelegate, `didFinishLaunchingWithOptions` may not contain the notification or Universal Link that opened the app.

- Initialize with `CleverPush.initWithConnectionOptions` in `scene:willConnectToSession:options:`.
- For Universal Links, implement SceneDelegate continue-user-activity handling, or call `setHandleUrlFromSceneDelegate(true)` / `captureDeepLinkURL` as described on the [Deep Links](./deeplinks) page.


## Swift Package Manager: framework or extension not found

- Add the **CleverPush** product to the main app target. Add **CleverPushExtension** to the Notification Service Extension (and Content Extension) target — not the core `CleverPush` product.
- After changing packages, run **File → Packages → Reset Package Caches**, then **Product → Clean Build Folder**.
- If you use CocoaPods, do not also add the same SDK via SPM (or the other way around) on the same target.
- The CocoaPods `CleverPush-CleverPushResources` signing issue below does **not** apply to SPM installs.


## `CleverPush-CleverPushResources` needs to have a Provisioning Profile selected.

This is an issue since Xcode 14 as `CODE_SIGNING_ALLOWED` has been changed from `NO` to `YES` in Resources (see https://github.com/CocoaPods/CocoaPods/issues/11402). Add the following to the bottom of your `Podfile` and run `pod install` to solve it:

```
post_install do |installer|
  assertDeploymentTarget(installer)
  installer.pods_project.targets.each do |target|
    if target.respond_to?(:product_type) and target.product_type == "com.apple.product-type.bundle"
      target.build_configurations.each do |config|
          config.build_settings['CODE_SIGNING_ALLOWED'] = 'NO'
      end
    end
  end
end
```

## Custom Delegate in UNUserNotificationCenter Breaking SDK

Adding a custom delegate to UNUserNotificationCenter may break the CleverPush SDK's functionality and prevent notifications from being handled correctly.

Avoid setting a custom delegate for UNUserNotificationCenter in your project. The CleverPush SDK internally manages notification handling, and overriding this delegate will conflict with our implementation, causing notification delivery and interaction issues.

To ensure seamless integration with CleverPush, remove any custom UNUserNotificationCenter delegate code from your app.

## Do Not Initialize the SDK Twice

Initializing the CleverPush SDK multiple times in your application can break the SDK's functionality and cause unexpected behavior.

We **do not recommend** initializing the SDK more than once, as it may lead to:

- Duplicate notification handling and incorrect subscription states
- Callbacks may not work properly or be called multiple times (notifications, banners, initialization)
- App Banners, Stories, Chat, Inbox, and Live Activities may malfunction
- Event tracking and deep links may not work as expected
- Tags, attributes, topics, and badge count may become inconsistent
- Memory leaks and performance issues

**Best Practice:** Initialize the SDK **only once** in your application. Avoid calling the initialization method in multiple places or view controllers.

---

## App Banner Troubleshooting

### Pre-Report Checklist

Before contacting support, please work through this checklist. Most App Banner issues can be resolved by verifying these points:

**Dashboard & Banner Configuration**

- The banner status is set to **Active** in the CleverPush dashboard (Channels → App Banners).
- The banner's **start date / end date** and time zone are configured correctly and the current time falls within the scheduled window.
- The banner **frequency** setting is not limiting display (e.g. "Show only once" means the banner will not appear again once a user has seen it).
- The banner is assigned to the correct **Channel** that matches the Channel ID used in your app.
- Any **targeting rules** (segments, subscriptions, geofences, tags, attributes) are met by the test device/subscription.
- The banner content (image URLs, HTML content) is accessible from the device's network — no firewall or proxy is blocking external resources.

**SDK Integration**

- The CleverPush SDK is initialized **only once** in your application (e.g. in `AppDelegate`). Initializing it multiple times will break App Banners. See the [Do Not Initialize the SDK Twice](#do-not-initialize-the-sdk-twice) section above.
- You are using the latest stable version of the CleverPush iOS SDK. Check the [Changelog](./changelog) for recent fixes.
- The correct **Channel ID** is passed to `CleverPush.initWithLaunchOptions` (or `initWithConnectionOptions` on Scene-based apps).
- You are testing on a **physical iOS device**. Some SDK features behave differently on the simulator.
- The app is in the **foreground** when the banner should appear (unless you have specifically configured background display).
- If you are triggering a banner by **event**, the event name in the code matches exactly what is configured in the dashboard (case-sensitive).
- If you are using `showAppBanner("BANNER_ID")` for direct display, the Banner ID is correct and the banner is active.

**Testing & Dev Mode**

- **Dev Mode** is enabled during development (`CleverPush.enableDevelopmentMode()` before `initWithLaunchOptions`). Without Dev Mode, banners may be throttled or cached.
- After enabling Dev Mode, **uninstall and reinstall** the app (or clear the app's local storage) to reset any "already shown" state for the banner.
- You have waited a few seconds after SDK initialization before the banner is expected to appear — the SDK performs an async fetch on startup.

---

### Common Issues & Solutions

#### Banner Is Active in Dashboard but Never Appears in the App

1. Confirm Dev Mode is enabled for testing (see above).
2. Check that the banner frequency allows it to show again — if "Show only once" is set, delete and re-add the app or reset the subscription.
3. Verify targeting rules: open the banner in the dashboard and check if any segment, tag, attribute, or geofence filter is applied. The test device's subscription must match.
4. Add a **shown** callback to confirm the SDK is displaying banners. `setAppBannerOpenedCallback` only fires when the user taps a banner action, not when the banner appears:

**Swift**
```swift
CleverPush.setAppBannerShownCallback { banner in
    print("App Banner shown: \(banner?.id ?? "")")
}
```

**Objective-C**
```objective-c
[CleverPush setAppBannerShownCallback:^(CPAppBanner *banner) {
    NSLog(@"App Banner shown: %@", banner.id);
}];
```

If this callback never fires, the banner is not being triggered — the issue is in the targeting, scheduling, or SDK initialization.

#### Banner Appeared Once but Will Not Appear Again

The banner's **frequency** setting controls repeat display. If it is set to "Show only once per subscription", it will not show again for that installation. To re-test:

- Enable Dev Mode before initialization — Dev Mode bypasses the frequency/session limits during development.
- Alternatively, uninstall the app and reinstall to generate a new subscription.

#### Banner Appears on Android but Not on iOS (or Vice Versa)

- Confirm the banner is assigned to the correct channel and that channel's SDK type is set to iOS (or both).
- Check that the iOS SDK version supports the banner type you are using (HTML banners require SDK 1.3.0+, custom fonts require a newer version — see the [Methods](./methods#app-banners) page).
- Verify there is no iOS-specific targeting rule (e.g. iOS version range) that excludes your test device.

#### Custom Fonts Not Rendering in the Banner

- Font files (`.ttf` / `.otf`) must be added to the Xcode project **and** included in **Build Phases → Copy Bundle Resources**.
- The font name passed to the CleverPush dashboard must match the font's **PostScript name** exactly, not the filename.
- Confirm the font is declared under `UIAppFonts` (Fonts provided by application) in your `Info.plist`.

#### HTML Banner Content Not Loading

- Ensure all asset URLs referenced in the HTML (images, scripts, stylesheets) use **HTTPS** — HTTP resources are blocked by App Transport Security on iOS.
- Check that the device's network allows access to those external URLs.
- Test the HTML content in a standard browser on the same network to rule out server-side issues.

#### Banner Callback (`setAppBannerOpenedCallback`) Not Being Called

- The callback is only triggered when the user **taps a button** in the banner (an "action"). It is not called when the banner is merely displayed or dismissed.
- Ensure the callback is set **before** `CleverPush.initWithLaunchOptions` is called.
- Make sure the SDK is not initialized more than once (a second initialization will overwrite your callback registration).

#### `showAppBanner` Has No Effect

- Verify the Banner ID is copied correctly from the CleverPush dashboard (it is case-sensitive).
- Confirm the banner status is **Active**.
- Call `showAppBanner` only after the SDK initialization callback has fired to ensure the SDK is fully ready.
- If banners should appear on a specific screen, set `setCustomTopViewController` or `setShowAppBannerCallback` before init.

---

### Still Not Working? Contact Support

If you have gone through the checklist and the common issues above and App Banners are still not working, please email us at **[support@cleverpush.com](mailto:support@cleverpush.com?subject=App%20Banner%20Issue%20%E2%80%94%20iOS)** with answers to the questions below. The more detail you provide, the faster we can help.

```
--- App Banner Support Questionnaire (iOS) ---

1.  Does the issue appear on iOS, Android, or both platforms?

2.  Which programming language are you using in your iOS app?
    Swift / Objective-C

3.  Which App Banner callback are you using in your code?
    setAppBannerOpenedCallback (Swift) / setAppBannerOpenedCallback:^ (Objective-C) / showAppBanner / other

4.  CleverPush iOS SDK version:

5.  iOS version of the test device:

6.  Device model and is it a physical device or simulator?

7.  Channel ID (found in CleverPush Dashboard → Channels):

8.  Banner ID(s) affected (found in Dashboard → App Banners):

9.  Banner type (Image, HTML, Carousel, etc.):

10. Is Dev Mode enabled in your app?
    Yes / No

11. How is the banner triggered?
    SDK startup / specific event / showAppBanner by ID / other

12. Are there any targeting rules set on the banner?
    Yes / No — if yes, list them (Segments, Tags, Attributes, Geofences, Subscription Filters):

12a. How are the targeting rules configured in the dashboard?
     Example: Segment = Premium Users, Tag = onboarding_complete = true, Attribute = country = DE

12b. How are you setting these values in your code before the banner is triggered?
     Example: which method you are calling — CleverPush.addSubscriptionTag / setAttribute — and where in the app flow

12c. How is the banner being triggered in your code?
     Example: automatically on SDK init / CleverPush.showAppBanner("ID") / via an app banner event name

13. What is the banner frequency setting?
    Always / Once per session / Once per subscription / other

14. Describe the exact behavior you observe:
    Example: Banner never appears / Banner appeared once and never again / App crashes when banner loads

15. When did this issue first appear? Was it ever working before?

16. Have you made any recent changes to the app or SDK version?

17. Any relevant console logs, crash reports, or error messages:

18. Any additional context or screenshots that might help:
```

## Silent Notification Limitations and Restrictions for iOS

Silent (background) pushes use APNs `content-available: 1` and typically have no alert, sound, or badge. iOS — not the SDK — decides if and when they run.

1. Silent notifications do not work on the iOS Simulator. You must test on a **physical device**.
2. Enable **Background Modes → Remote notifications** on the main app target (see [Setup](./setup#3-enable-the-required-capabilities)).
3. Delivery is not guaranteed to be immediate. iOS may delay or drop silent pushes to save battery, especially in **Low Power Mode**, when the app is force-quit, or when too many silent pushes are sent in a short time.
4. If the payload also contains an alert, iOS treats it as a visible notification, not a silent one.
5. Do not send a high volume of silent notifications. Repeated sends in a short window are throttled by the system.