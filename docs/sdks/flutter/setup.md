---
id: setup
title: Setup
---

### Installation

1. Add the following code to your `pubspec.yaml` file
    ```bash
    dependencies:
      cleverpush_flutter: ^1.24.35
    ```
    
2. Run `flutter packages get`


### iOS Dependency Manager (CocoaPods, Swift Package Manager, or both)

The CleverPush Flutter SDK ships with **both** integration methods, so you can use whichever your project relies on:

- a CocoaPods spec (`cleverpush_flutter.podspec`)
- a Swift Package Manager (SPM) manifest (`Package.swift`)

You only need **one** of them at build time. Picking a method up front avoids the most common iOS build errors (see [Troubleshooting](./troubleshooting.md)).

> **How Flutter decides:** If Swift Package Manager is enabled in your Flutter installation (`flutter config --enable-swift-package-manager`) **and** every iOS plugin supports SPM, `flutter run` / `flutter build` will automatically route plugins through SPM and add SPM integration to your Xcode project. If SPM is disabled, plugins are provided via CocoaPods. You can check your current setting with `flutter config`.

#### Option A — CocoaPods only (recommended if you are unsure)

1. Disable Swift Package Manager so plugins are always provided via CocoaPods:

    ```bash
    flutter config --no-enable-swift-package-manager
    ```

2. From your app directory, install everything cleanly:

    ```bash
    flutter clean
    flutter pub get
    cd ios
    pod install
    ```

3. `pod install` should report `cleverpush_flutter` among the installed pods. Always open the **`.xcworkspace`** (not the `.xcodeproj`) in Xcode.

#### Option B — Swift Package Manager only

1. Enable Swift Package Manager:

    ```bash
    flutter config --enable-swift-package-manager
    ```

2. Build through the Flutter tooling so the Swift packages are resolved and wired into Xcode:

    ```bash
    flutter clean
    flutter pub get
    flutter run        # or: flutter build ios
    ```

    > **Important:** With SPM enabled, the plugin is **not** added to your Podfile. A plain `pod install` will *not* compile the plugin. You must build at least once with `flutter run` / `flutter build ios` so SPM resolves the package — otherwise Xcode reports `Module 'cleverpush_flutter' not found`.

#### Option C — Using both (CocoaPods for an extension + SPM for plugins)

A common real-world case: your app uses SPM for plugins, but the Notification Service Extension still needs the `CleverPush/CleverPushExtension` CocoaPod. This works, but keep these rules in mind:

- Build the app with `flutter run` / `flutter build ios` (so SPM resolves the plugin), **not** by building the Runner target directly in Xcode right after a manual `pod install`.
- Keep the CleverPush version used by the extension **identical** to the version the plugin depends on (see step 2 below), otherwise CocoaPods will install two different CleverPush versions.

---

### Setup iOS

1. Enable the required capabilities

   1. Go to your root project and switch to the tab "Capabilities"
   
   2. Enable "Push Notifications"
   
   3. Enable "Background Modes" and check "Remote notifications"

2. Add Notification Service Extension

    This is required for correctly tracking notification deliveries and for displaying big images or videos in notifications.

    1. Select `File` > `New` > `Target` in Xcode
    2. Choose `Notification Service Extension` and press `Next`
    3. Enter `CleverPushNotificationServiceExtension` as Product Name, choose `Objective-C` as language and press `Finish`
    4. Press `Activate` on the next prompt
    5. Add the following at the bottom of your Podfile

        ```bash
        target 'CleverPushNotificationServiceExtension' do
          use_frameworks!

          pod 'CleverPush/CleverPushExtension', '1.34.45'
        end
        ```

        > **Pin the version.** Set the `CleverPush/CleverPushExtension` version to the **same** CleverPush version the SDK depends on (you can see it in `cleverpush_flutter.podspec` → `s.dependency 'CleverPush', '...'`). If you leave it unpinned, CocoaPods may install a different (older) version for the extension than for the main app, so `pod install` ends up installing **two CleverPush versions**. The app and the extension must use the same version.
    6. Run `pod install`
    7. Open `NotificationService.m` and replace the whole content with the following:

        ```objective-c
        #import <CleverPushExtension/CleverPushExtension.h>

        #import "NotificationService.h"

        @interface NotificationService ()

        @property (nonatomic, strong) void (^contentHandler)(UNNotificationContent *contentToDeliver);
        @property (nonatomic, strong) UNNotificationRequest *receivedRequest;
        @property (nonatomic, strong) UNMutableNotificationContent *bestAttemptContent;

        @end

        @implementation NotificationService

        - (void)didReceiveNotificationRequest:(UNNotificationRequest *)request withContentHandler:(void (^)(UNNotificationContent * _Nonnull))contentHandler {
            self.receivedRequest = request;
            self.contentHandler = contentHandler;
            self.bestAttemptContent = [request.content mutableCopy];

            [CleverPushExtension didReceiveNotificationExtensionRequest:self.receivedRequest withMutableNotificationContent:self.bestAttemptContent];

            self.contentHandler(self.bestAttemptContent);
        }

        - (void)serviceExtensionTimeWillExpire {
            [CleverPushExtension serviceExtensionTimeWillExpireRequest:self.receivedRequest withMutableNotificationContent:self.bestAttemptContent];

            self.contentHandler(self.bestAttemptContent);
        }

        @end
        ```

3. Create your iOS push certificate

   1. Open Keychain Access on your Mac. (Application > Utilities > Keychain Access).
   2. Select Keychain Access > Certificate Assistant > Request a Certificate From a Certificate Authority...
   3. Select the "Save to disk" option and enter any information in the required fields
   4. Go to the [Apple developer portal](https://developer.apple.com/account/ios/identifier/bundle), select your app and press "Edit"
   5. Enable "Push notifications" and press "Done"
   6. Go to the [Create new certificate page](https://developer.apple.com/account/ios/certificate/create), select "Apple Push Notification service SSL" and press "Continue"
   7. Select your Application Bundle ID and press "Continue"
   8. Press "Choose File...", select the previously generated "certSigningRequest" file and then press "Generate"
   9. Press "Download" and save your certificate
   10. Click on the downloaded .cer file, Keychain Access should open
   11. Select Login > My Certificates then right click on your key and click "Export (Apple Production iOS Push Services: com.your.bundle)..."
   12. Give the file a unique name and press save, be sure to leave the password field blank!
   13. Upload your certificate in the CleverPush channel settings
   

4. Add AppGroup (optional but recommended)

    This is required for getting the received notifications via the `getNotifications` method and also for automatic Badge Counting (i.e. when using `setIncrementBadge(true)`).

    1. Select your main application Target in Xcode
    2. Go to `Capabilities` and activate `App Groups`
    3. Create a new App Group with the following Scheme: `group.YOUR.BUNDLE.ID.cleverpush` (replace `YOUR.BUNDLE.ID` with your application's bundle identifier).
    4. Enable the created App Group by checking the checkbox next to it
    5. Select the `CleverPushNotificationServiceExtension` target and also enable the created App Group under `Capabilities`


### Setup Android

1. Setup Firebase inside your Android Runner App and register the Sender ID and the API Key inside the CleverPush Channel settings. Please refer to the official docs: https://firebase.google.com/docs/android/setup
