---
id: troubleshooting
title: Troubleshooting
---

## The style on this component requires your app theme to be Theme.AppCompat (or a descendant).

Please use a parent theme which starts with "Theme.AppCompat.XXX" in your main theme (e.g. LaunchTheme).
Example:

<style name="LaunchTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <!-- Show a splash screen on the activity. Automatically removed when
             Flutter draws its first frame -->
        <item name="android:windowBackground">@drawable/launch_background</item>
</style>

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


## Huawei Certificate Error:

https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/game-preparation-v4#certificate