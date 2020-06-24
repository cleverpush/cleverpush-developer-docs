---
id: setup
title: Setup
---

### Installation

1. Install via npm or yarn
    ```bash
    npm i cleverpush-react-native -S
    ```
    
2. Link native Dependencies (only needed for React Native < 0.60.0)
    ```bash
    react-native link
    ```
    
3. Install Pods for iOS
 
    ```bash
    cd ios && pod install && cd ..
    ```


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
    5. Add the following at the bottom of your Project's Podfile

        ```bash
        target 'CleverPushNotificationServiceExtension' do

          pod 'CleverPush'

        end
        ```

3. Add Notification Content Extension

    This is required for displaying custom notification contents (e.g. Carousel Notifications).

    1. Select `File` > `New` > `Target` in Xcode
    2. Choose `Notification Content Extension` and press `Next`
    3. Enter `CleverPushNotificationContentExtension` as Product Name, choose `Objective-C` as language and press `Finish`
    4. Press `Activate` on the next prompt
    5. Add the following at the bottom of your Project's Podfile

        ```bash
        target 'CleverPushNotificationContentExtension' do

          pod 'CleverPush'

        end
        ```

4. Run `pod install`
5. Open `CleverPushNotificationServiceExtension/NotificationService.m` and replace the whole content with the following:

        Objective-C:

        ```objective-c
        #import <CleverPush/CleverPush.h>

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

            [CleverPush didReceiveNotificationExtensionRequest:self.receivedRequest withMutableNotificationContent:self.bestAttemptContent];

            self.contentHandler(self.bestAttemptContent);
        }

        - (void)serviceExtensionTimeWillExpire {
            [CleverPush serviceExtensionTimeWillExpireRequest:self.receivedRequest withMutableNotificationContent:self.bestAttemptContent];

            self.contentHandler(self.bestAttemptContent);
        }

        @end
        ```

        Swift:

        ```swift
        import UserNotifications

        import CleverPush

        class NotificationService: UNNotificationServiceExtension {

            var contentHandler: ((UNNotificationContent) -> Void)?
            var receivedRequest: UNNotificationRequest!
            var bestAttemptContent: UNMutableNotificationContent?

            override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
                self.receivedRequest = request;
                self.contentHandler = contentHandler
                bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)

                if let bestAttemptContent = bestAttemptContent {
                    CleverPush.didReceiveNotificationExtensionRequest(self.receivedRequest, with: self.bestAttemptContent)
                    contentHandler(bestAttemptContent)
                }
            }

            override func serviceExtensionTimeWillExpire() {
                if let contentHandler = contentHandler, let bestAttemptContent =  bestAttemptContent {
                    CleverPush.serviceExtensionTimeWillExpireRequest(self.receivedRequest, with: self.bestAttemptContent)
                    contentHandler(bestAttemptContent)
                }
            }

        }
        ```

6. Open `CleverPushNotificationContentExtension/NotificationViewController.h` and replace the whole content with the following:

    Objective-C:

    ```objective-c
    #import <UIKit/UIKit.h>
    #import <CleverPush/CleverPush.h>

    @interface NotificationViewController : CPNotificationViewController

    @end
    ```

    Open `CleverPushNotificationContentExtension/NotificationViewController.m` and replace the whole content with the following:

    Objective-C:

    ```objective-c
    #import "NotificationViewController.h"
    #import <UserNotifications/UserNotifications.h>
    #import <UserNotificationsUI/UserNotificationsUI.h>

    @interface NotificationViewController () <UNNotificationContentExtension>

    @end

    @implementation NotificationViewController

    - (void)viewDidLoad {
        [super viewDidLoad];
    }

    - (void)viewDidAppear:(BOOL)animated {
        [super viewDidAppear:animated];
    }

    - (void)didReceiveNotification:(UNNotification *)notification {
        [self cleverpushDidReceiveNotification:notification];
    }

    - (void)didReceiveNotificationResponse:(UNNotificationResponse *)response completionHandler:(void (^)(UNNotificationContentExtensionResponseOption))completion {
        [self cleverpushDidReceiveNotificationResponse:response withCompletionHandler:completion];
    }

    @end
    ```

    Open `CleverPushNotificationContentExtension/Info.plist` and replace the whole content with the following:

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
    <dict>
        <key>CFBundleDevelopmentRegion</key>
        <string>$(DEVELOPMENT_LANGUAGE)</string>
        <key>CFBundleDisplayName</key>
        <string>CleverPushNotificationContentExtension</string>
        <key>CFBundleExecutable</key>
        <string>$(EXECUTABLE_NAME)</string>
        <key>CFBundleIdentifier</key>
        <string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
        <key>CFBundleInfoDictionaryVersion</key>
        <string>6.0</string>
        <key>CFBundleName</key>
        <string>$(PRODUCT_NAME)</string>
        <key>CFBundlePackageType</key>
        <string>$(PRODUCT_BUNDLE_PACKAGE_TYPE)</string>
        <key>CFBundleShortVersionString</key>
        <string>1.0</string>
        <key>CFBundleVersion</key>
        <string>1</string>
        <key>NSExtension</key>
        <dict>
            <key>NSExtensionAttributes</key>
            <dict>
                <key>UNNotificationExtensionCategory</key>
                <array>
                    <string>carousel</string>
                </array>
                <key>UNNotificationExtensionDefaultContentHidden</key>
                <false/>
                <key>UNNotificationExtensionInitialContentSizeRatio</key>
                <real>0.5</real>
            </dict>
            <key>NSExtensionPrincipalClass</key>
            <string>NotificationViewController</string>
            <key>NSExtensionPointIdentifier</key>
            <string>com.apple.usernotifications.content-extension</string>
        </dict>
    </dict>
    </plist>
    ```

7. Create your iOS push certificate

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
   

8. Add AppGroup (optional)

    This is required for getting the received notifications via the `getNotifications` method

    1. Select your main application Target in Xcode
    2. Go to `Capabilities` and activate `App Groups`
    3. Create a new App Group with the following Scheme: `group.YOUR.BUNDLE.ID.cleverpush` (replace `YOUR.BUNDLE.ID` with your application's bundle identifier).
    4. Enable the created App Group by checking the checkbox next to it
    5. Select The `CleverPushNotificationExtension` target and also enable the created App Group under `Capabilities`


Common iOS errors:

```
ld: library not found for -lcleverpush-react-native
```

Go in *Xcode* > *Targets* > Your App > *Build Phases* > *Link Binary With Library*.
Click the + and select *libcleverpush-react-native.a*, then rebuild.


### Setup Android

1. Add `compileOptions` to the `android` section in the `android/app/build.gradle` file:

    ```
    android {
   compileSdkVersion 27
   buildToolsVersion '27.0.3'
    
   compileOptions {
      sourceCompatibility JavaVersion.VERSION_1_8
      targetCompatibility JavaVersion.VERSION_1_8
   }
    
   // ...
   ```
  
2. Comment or remove Expo's FCM listener (if it exists) from `android/app/src/AndroidManifest.xml`:
    ```xml
    <!-- FCM -->
    <service
      android:name=".fcm.ExpoFcmMessagingService">
      <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT"/>
      </intent-filter>
    </service>
    ```
