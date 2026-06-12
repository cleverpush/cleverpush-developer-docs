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

## iOS: `Module 'cleverpush_flutter' not found` (in GeneratedPluginRegistrant)

This happens when **Swift Package Manager (SPM) and CocoaPods get mixed up**. The CleverPush Flutter SDK supports both, but a single build must use only one of them.

The most common cause: SPM is enabled in your Flutter installation, so `flutter pub get` routes the plugin through SPM and **excludes it from your Podfile**. If you then only run `pod install` (or build the `Runner` target directly in Xcode) without building through Flutter, the plugin's module is never compiled — neither by CocoaPods nor by SPM — and Xcode fails with `Module 'cleverpush_flutter' not found`.

You can confirm which manager is active:

```bash
flutter config
```

Look for `enable-swift-package-manager`. You can also open `ios/.flutter-plugins-dependencies` and check `swift_package_manager_enabled`. A telltale sign is `pod install` reporting fewer pods than expected (the `cleverpush_flutter` plugin is missing from the list).

**Fix — pick one approach:**

- **Use CocoaPods only** (simplest):

    ```bash
    flutter config --no-enable-swift-package-manager
    flutter clean
    flutter pub get
    cd ios && pod install
    ```

    `pod install` should now list `cleverpush_flutter`. Open the `.xcworkspace` in Xcode and build.

- **Use Swift Package Manager** — build through the Flutter tooling so SPM resolves the package (do **not** just build the Runner target in Xcode after a manual `pod install`):

    ```bash
    flutter clean
    flutter pub get
    flutter run        # or: flutter build ios
    ```

After switching, do a clean build in Xcode (`Product` → `Clean Build Folder`) so the stale error clears. See the [Setup page](./setup.md#ios-dependency-manager-cocoapods-swift-package-manager-or-both) for the full dependency-manager guide.


## iOS: `pod install` installs two different CleverPush versions

If `pod install` shows something like:

```
Installing CleverPush (1.34.45)
Installing CleverPush (1.34.43)
```

your main app and your Notification Service Extension are pulling **different** CleverPush versions. This usually means the extension dependency in your Podfile is **unpinned**:

```ruby
target 'CleverPushNotificationServiceExtension' do
  use_frameworks!

  pod 'CleverPush/CleverPushExtension'   # ← no version, may resolve to an older one
end
```

The app target gets the version required by the plugin (from `cleverpush_flutter.podspec`), while the extension keeps whatever was in `Podfile.lock`.

**Fix:** pin the extension to the **same** version the SDK depends on, then reinstall:

```ruby
target 'CleverPushNotificationServiceExtension' do
  use_frameworks!

  pod 'CleverPush/CleverPushExtension', '1.34.45'
end
```

```bash
cd ios && pod install
```

`pod install` should now install a single CleverPush version for both targets.


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
