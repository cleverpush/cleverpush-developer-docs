---
id: troubleshooting
title: Troubleshooting
---

## iOS: [...] does not contain bitcode. You must rebuild it with bitcode enabled (Xcode setting ENABLE_BITCODE), obtain an updated library from the vendor, or disable bitcode for this target. [...]

As we are using the newest iOS SDK with XCFramework support in the latest 1.17.5 version, our SDK does not come with bitcode support anymore, unfortunately. Also [Xcode 14 has deprecated bitcode submissions](https://developer.apple.com/documentation/xcode-release-notes/xcode-14-release-notes).

Flutter will soon [drop bitcode support](https://github.com/flutter/flutter/issues/107887) officially.

You should already be able to disable bitcode manually in the Xcode build settings by setting `ENABLE_BITCODE` to `NO` in all targets.


## iOS: Multiple commands produce '/Users/.../build/ios/Debug-dev-iphoneos/XCFrameworkIntermediates/CleverPush/CleverPush.framework:

Please make sure that the Deployment Target (iOS Version) for `Runner` and for the `CleverPushNotificationServiceExtension` target is the same.


## Android: "The style on this component requires your app theme to be Theme.AppCompat (or a descendant)." OR "Error inflating class com.google.android.material.tabs.TabLayout"

Please use a parent theme which starts with "Theme.AppCompat.XXX" in your main theme (e.g. LaunchTheme) in `res/values/styles.xml` and `res/values-night/styles.xml`.
Example:

```xml
<style name="LaunchTheme" parent="Theme.AppCompat.Light.NoActionBar">
</style>
```

## Android: In project 'app' a resolved Google Play services library dependency depends on another at an exact version (...):

Add the following line at the bottom of `app/build.gradle`:

```groovy
googleServices { disableVersionCheck = true }
```
