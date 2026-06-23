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


## When opening a Notification, all other Notifications get cleared

This is due to iOS automatically clearing all notifications when our SDK reset the badge count to zero. This behaviour can be changed.
Please refer to the **Badge Counts** section on the **Methods** page for further instructions.


## Notifications not received while developing

In some cases it is needed to mark your subscriptions as "Sandbox mode" subscriptions in the CleverPush dashboard (Channels -> App Push -> Subscriptions -> Click on your subscription -> Mark as APNS Sandbox mode).


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
- The correct **Channel ID** is passed to `CleverPush.initWithLaunchOptions`.
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
4. Add a callback to confirm the SDK is triggering banners:

**Swift**
```swift
CleverPush.setAppBannerOpenedCallback { (_: CPAppBannerAction?) in
    print("App Banner Opened")
}
```

**Objective-C**
```objective-c
[CleverPush setAppBannerOpenedCallback:^(CPAppBannerAction *action) {
    NSLog(@"App Banner Opened");
}];
```

If this callback never fires, the banner is not being triggered — the issue is in the targeting or scheduling configuration.

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

# Silent Notification Limitations and Restrictions for iOS

1. Silent notifications do not work on the iOS Simulator.You must test silent notifications on a **physical device** to ensure that background tasks and data processing are triggered properly.

2. Silent notifications may not be delivered immediately, as the system prioritizes resources to optimize battery life and prevent unnecessary background activity.If your app uses background fetch, silent notifications can trigger it, but you must ensure that **background fetch is enabled** in your app settings.

3. If your app performs too many background tasks or notifications within a short period, the system may throttle or defer the delivery of notifications.

4. Silent notifications may also be deferred when the device is in **Low Power Mode** to preserve battery life.

5. Sending too many silent notifications in a short time could lead to delivery issues or **throttling** by the system.

6. If your app sends too many silent notifications within a short time, iOS may throttle or delay their delivery to optimize battery life and device performance.