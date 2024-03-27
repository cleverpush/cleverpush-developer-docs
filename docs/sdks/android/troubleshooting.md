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
