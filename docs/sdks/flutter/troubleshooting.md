---
id: troubleshooting
title: Troubleshooting
---

## iOS/Android: Notifications are not shown

Please make sure you are not using the `firebase_messaging` dependency together with our SDK. The Android Firebase setup should be done directly in the Android project by following the official guide from the Firebase docs.

If you want to use our SDK together with `firebase_messaging`, although we do not recommend it, you can use the following workaround:

1. Add this to your `android/app/src/main/AndroidManifest.xml` file inside the `<application>` tag:
```
<service
    android:name=".FirebaseMessagingServiceProxy"
    android:exported="false">
    <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT" />
    </intent-filter>
</service>
```

2. Create the `FirebaseMessagingServiceProxy` class in your Android project:
```
package com.example;

import androidx.annotation.NonNull;

import com.cleverpush.service.CleverPushFcmListenerService;
import io.flutter.plugins.firebase.messaging.FlutterFirebaseMessagingService;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class FirebaseMessagingServiceProxy extends FirebaseMessagingService {
    private final List<FirebaseMessagingService> messagingServices = new ArrayList<>(2);

    public FirebaseMessagingServiceProxy() {
        messagingServices.add(new CleverPushFcmListenerService());
        messagingServices.add(new FlutterFirebaseMessagingService());
    }

    @Override
    public void onNewToken(@NonNull String token) {
        delegate(service -> {
            injectContext(service);
            service.onNewToken(token);
        });
    }

    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
        delegate(service -> {
            injectContext(service);
            service.onMessageReceived(remoteMessage);
        });
    }

    private void delegate(CPAction<FirebaseMessagingService> action) {
        for (FirebaseMessagingService service : messagingServices) {
            action.run(service);
        }
    }

    private void injectContext(FirebaseMessagingService service) {
        setField(service, "mBase", this);
    }

    private boolean setField(Object targetObject, String fieldName, Object fieldValue) {
        Field field;
        try {
            field = targetObject.getClass().getDeclaredField(fieldName);
        } catch (NoSuchFieldException e) {
            field = null;
        }
        Class superClass = targetObject.getClass().getSuperclass();
        while (field == null && superClass != null) {
            try {
                field = superClass.getDeclaredField(fieldName);
            } catch (NoSuchFieldException e) {
                superClass = superClass.getSuperclass();
            }
        }
        if (field == null) {
            return false;
        }
        field.setAccessible(true);
        try {
            field.set(targetObject, fieldValue);
            return true;
        } catch (IllegalAccessException e) {
            return false;
        }
    }

    interface CPAction<T> {
        void run(T t);
    }
}
```

## iOS: [...] does not contain bitcode. You must rebuild it with bitcode enabled (Xcode setting ENABLE_BITCODE), obtain an updated library from the vendor, or disable bitcode for this target. [...]

As we are using the newest iOS SDK with XCFramework support in the latest 1.17.5 version, our SDK does not come with bitcode support anymore, unfortunately. Also [Xcode 14 has deprecated bitcode submissions](https://developer.apple.com/documentation/xcode-release-notes/xcode-14-release-notes).

Flutter will soon [drop bitcode support](https://github.com/flutter/flutter/issues/107887) officially.

You should already be able to disable bitcode manually in the Xcode build settings by setting `ENABLE_BITCODE` to `NO` in all targets.


## iOS: Multiple commands produce '/Users/.../build/ios/Debug-dev-iphoneos/XCFrameworkIntermediates/CleverPush/CleverPush.framework:

Please make sure that the Deployment Target (iOS Version) for `Runner` and for the `CleverPushNotificationServiceExtension` target is the same.


## iOS: Issues with flutter_local_notifications plugin

If you encounter issues with `flutter_local_notifications` callbacks not being called, please make sure to add the following to your `ios/Runner/AppDelegate.swift` file:

```swift
override func userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification, withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
  super.userNotificationCenter(center, willPresent: notification, withCompletionHandler: completionHandler)
}

override func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
  super.userNotificationCenter(center, didReceive: response, withCompletionHandler: completionHandler)
}
```

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
