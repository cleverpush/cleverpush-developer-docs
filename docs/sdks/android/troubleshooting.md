---
id: troubleshooting
title: Troubleshooting
---

## The style on this component requires your app theme to be Theme.AppCompat (or a descendant).

Please use a parent theme which starts with "Theme.AppCompat.XXX" in your main theme (e.g. LaunchTheme).
Example:

```xml
<style name="LaunchTheme" parent="Theme.AppCompat.Light.NoActionBar">
</style>
```

## File google-services.json is missing. The Google Services Plugin cannot function without it.

Please make sure to set up a project in the Firebase console, you can download this file there and place it inside your project: https://console.firebase.google.com/


If you are not using Java 1.8 yet, please add this to your `app/build.gradle` if building fails with our SDK:

```groovy
android {
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}
```

## In project 'app' a resolved Google Play services library dependency depends on another at an exact version (...):

Add the following line at the bottom of `app/build.gradle`:

```groovy
googleServices { disableVersionCheck = true }
```

## UI Graphic issues
If you are seeing visual artifacts or other issues for example in our app-banners, check if you are applying stylings to global elements. 

##  Targeting S+ (version 31 and above) requires that one of FLAG_IMMUTABLE or FLAG_MUTABLE be specified when creating a PendingIntent.

Please upgrade atleast to CleverPush SDK version 1.17.0 when targeting Android API 31+.


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

- The CleverPush SDK is initialized **only once** in your application (e.g. in `Application.onCreate()`). Initializing it multiple times will break App Banners.
- You are using the latest stable version of the CleverPush Android SDK. Check the [Changelog](./changelog) for recent fixes.
- The correct **Channel ID** is passed to `CleverPush.getInstance(this).init(...)`.
- You are testing on a **physical Android device**. Emulators may behave differently, especially for WebView-based HTML banners.
- The app is in the **foreground** when the banner should appear.
- If you are triggering a banner by **event**, the event name in the code matches exactly what is configured in the dashboard (case-sensitive).
- If you are using `showAppBanner("BANNER_ID")` for direct display, the Banner ID is correct and the banner is active.
- Your app's main theme extends `Theme.AppCompat` (or a descendant) — App Banners require an AppCompat theme to render correctly. See [The style on this component requires your app theme to be Theme.AppCompat](#the-style-on-this-component-requires-your-app-theme-to-be-themeappcompat-or-a-descendant) above.

**Testing & Dev Mode**

- **Dev Mode** is enabled during development (`CleverPush.getInstance(this).enableDevelopmentMode()` before `init`). Without Dev Mode, banners may be throttled or cached.
- After enabling Dev Mode, **clear the app's data** (Settings → Apps → Your App → Clear Data) or uninstall/reinstall to reset any "already shown" state.
- You have waited a few seconds after SDK initialization before the banner is expected to appear — the SDK performs an async fetch on startup.

---

### Common Issues & Solutions

#### Banner Is Active in Dashboard but Never Appears in the App

1. Confirm Dev Mode is enabled for testing (see above).
2. Check that the banner frequency allows it to show again — if "Show only once" is set, clear app data or uninstall/reinstall to reset the subscription.
3. Verify targeting rules: open the banner in the dashboard and check if any segment, tag, attribute, or geofence filter is applied. The test device's subscription must match.
4. Add a listener to confirm the SDK is triggering banners:

**Java**
```java
CleverPush.getInstance(this).setAppBannerOpenedListener(action -> {
    System.out.println("App Banner Opened");
});
```

**Kotlin**
```kotlin
CleverPush.getInstance(this).setAppBannerOpenedListener({ action ->
    println("App Banner Opened")
})
```

If this listener never fires, the banner is not being triggered — the issue is in the targeting or scheduling configuration.

#### Banner Appeared Once but Will Not Appear Again

The banner's **frequency** setting controls repeat display. If it is set to "Show only once per subscription", it will not show again for that installation. To re-test:

- Enable Dev Mode before initialization — Dev Mode bypasses the frequency/session limits during development.
- Alternatively, clear the app's data or uninstall and reinstall to generate a new subscription.

#### Banner Appears on iOS but Not on Android (or Vice Versa)

- Confirm the banner is assigned to the correct channel and that channel's SDK type covers Android (or both).
- Check that the Android SDK version supports the banner type you are using (App Banners available from SDK version 1.8.0).
- Verify there is no Android-specific targeting rule (e.g. Android version range) that excludes your test device.

#### Visual Artifacts or Broken Layout in the Banner

If you see visual glitches, overlapping elements, or incorrect styling in App Banners:

- Check whether you are applying CSS-style overrides or theme attributes to **global** Android view elements (e.g. `TextView`, `Button` in your app's theme). These global styles can interfere with the banner's layout.
- Ensure the app theme is a pure `Theme.AppCompat` descendant without aggressive global attribute overrides.

#### HTML Banner Content Not Loading

- Ensure all asset URLs referenced in the HTML use **HTTPS**. HTTP content may be blocked depending on the device's network security configuration.
- Check that the device's `WebView` is up to date (via the Play Store → "Android System WebView"). Outdated WebView versions can fail to render modern HTML/CSS.
- Verify that the device's network allows access to those external URLs.
- If you use a custom `network_security_config.xml`, make sure it does not block external domains needed by the banner.

#### Banner Callback (`setAppBannerOpenedListener`) Not Being Called

- The listener is only triggered when the user **taps a button** in the banner (an "action"). It is not called when the banner is merely displayed or dismissed.
- Ensure the listener is set **before** `CleverPush.getInstance(this).init(...)` is called.
- Make sure the SDK is not initialized more than once (a second initialization will overwrite your listener registration).

#### `showAppBanner` Has No Effect

- Verify the Banner ID is copied correctly from the CleverPush dashboard (it is case-sensitive).
- Confirm the banner status is **Active**.
- Call `showAppBanner` only after the SDK initialization callback has fired to ensure the SDK is fully ready.

#### ProGuard / R8 Obfuscation Breaks Banner Rendering

If banners stop working in release builds but work in debug builds, ProGuard/R8 may be stripping or renaming classes used by the SDK. Add the CleverPush keep rules to your ProGuard configuration. Refer to the [Setup](./setup) page for the recommended ProGuard rules.

---

### Still Not Working? Contact Support

If you have gone through the checklist and the common issues above and App Banners are still not working, please email us at **[support@cleverpush.com](mailto:support@cleverpush.com?subject=App%20Banner%20Issue%20%E2%80%94%20Android)** with answers to the questions below. The more detail you provide, the faster we can help.

```
--- App Banner Support Questionnaire (Android) ---

1.  Does the issue appear on iOS, Android, or both platforms?

2.  Which programming language are you using in your Android app?
    Java / Kotlin

3.  Which App Banner callback are you using in your code?
    setAppBannerOpenedListener (Java) / setAppBannerOpenedListener (Kotlin) / showAppBanner / other

4.  CleverPush Android SDK version:

5.  Android OS version of the test device:

6.  Device model and is it a physical device or emulator?

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
     Example: which method you are calling — CleverPush.getInstance(this).addSubscriptionTag / setAttribute — and where in the app flow

12c. How is the banner being triggered in your code?
     Example: automatically on SDK init / CleverPush.getInstance(this).showAppBanner("ID") / via an app banner event name

13. What is the banner frequency setting?
    Always / Once per session / Once per subscription / other

14. Describe the exact behavior you observe:
    Example: Banner never appears / Banner appeared once and never again / App crashes when banner loads

15. Is the issue reproducible on both debug and release builds?
    Yes / No / Not tested

16. When did this issue first appear? Was it ever working before?

17. Have you made any recent changes to the app or SDK version?

18. Any relevant Logcat output, crash reports, or error messages:

19. Any additional context or screenshots that might help:
```

## Huawei Certificate Error:

https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/game-preparation-v4#certificate

## Huawei Unable to instantiate service com.cleverpush.service.CleverPushHmsListenerService

In Huawei devices where both Huawei Mobile Services (HMS) and Google Mobile Services (GMS) are available, users might experience a crash when installing the app from App Gallery and then updating it from the Play Store. The error message displayed is:

`Unable to instantiate service com.cleverpush.service.CleverPushHmsListenerService`

To resolve this issue, you need to make adjustments in the `AndroidManifest.xml` file.

Add the attribute `tools:node="remove"` to the <service> tag. This tells the build tools to remove this service declaration during the merge process when generating the final manifest file.

```xml
<application ...>
    <service
        android:name="com.cleverpush.service.CleverPushHmsListenerService"
        android:exported="false"
        tools:node="remove">
        <intent-filter>
            <action android:name="com.huawei.push.action.MESSAGING_EVENT" />
        </intent-filter>
    </service>
</application>
```
