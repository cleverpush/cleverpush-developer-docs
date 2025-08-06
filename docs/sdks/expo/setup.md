---
id: setup
title: Setup
---

## Installation

1. Install the CleverPush Expo plugin using the Expo CLI.

    ```bash
    npx expo install cleverpush-expo-plugin
    ```

    Add the cleverpush-react-native package to your project.

    ```bash
    npm i cleverpush-react-native -S
    ```


2. Install Pods for iOS
 
    ```bash
    cd ios && pod install && cd ..
    ```

3. Configure app.json

Add the CleverPush plugin to your `app.json` or `app.config.js`:

```json
{
  "expo": {
    "name": "Your App",
    "slug": "your-app",
    "version": "0.0.1",
    "platforms": ["ios", "android"],
    "plugins": [
      [
        "cleverpush-expo-plugin",
        {
          "mode": "development"
        }
      ]
    ],
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourapp"
    },
    "android": {
      "package": "com.yourcompany.yourapp"
    }
  }
}
```

4. Generate Native Projects

```bash
npx expo prebuild --clean

npx expo prebuild --platform ios

npx expo prebuild --platform android

```

5. Test the Integration

```bash
npx expo start

npx expo run:ios

npx expo run:android
```

## Setup iOS

1. Enable the required capabilities

   1. Go to your root project and switch to the tab "Capabilities"
   2. Enable "Push Notifications"
   3. Enable "Background Modes" and check "Remote notifications"

2. Notification Service Extension files should be automatically created via above commands 

   1. Verify NSE Target Exists in Xcode
        - Open your project in Xcode
        - Check that the `CleverPushNotificationServiceExtension` target exists in the project navigator
        - If missing, the NSE files should have been automatically created via the setup commands above

   2. Check CleverPush Framework is Linked to NSE
        - Select the `CleverPushNotificationServiceExtension` target in Xcode
        - Go to `Build Phases` > `Link Binary With Libraries`
        - Ensure `CleverPush.framework` is listed
        - If missing, add it manually
        
   3. Ensure App Groups are Configured
        - Verify App Groups are enabled for both main app and NSE targets
        - Check that the same App Group is selected for both targets
        - App Group should follow the pattern: `group.YOUR.BUNDLE.ID.cleverpush`
        
   4. Verify Developer Team and Capabilities
        - Ensure development team is selected for both main project and notification service extension
        - Check that capabilities are properly configured:
          - Push Notifications (enabled)
          - Background Modes > Remote notifications (enabled)
          - App Groups (enabled for both targets)

3. Manual NSE Setup (Alternative Method)
If the automatic NSE creation didn't work, you can manually create the Notification Service Extension:

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

    6. Run `pod install`
    7. Open `CleverPushNotificationServiceExtension/NotificationService.m` and replace the whole content with the following:

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


**Common iOS errors:**

```
ld: library not found for -lcleverpush-react-native
```

Go in *Xcode* > *Targets* > Your App > *Build Phases* > *Link Binary With Library*.
Click the + and select *libcleverpush-react-native.a*, then rebuild.

## Troubleshooting Rich Notifications (iOS)

If rich notifications are not working properly in iOS, follow these troubleshooting steps:

1. **Verify NSE Target Exists in Xcode**
   - Open your project in Xcode
   - Check that the `CleverPushNotificationServiceExtension` target exists in the project navigator
   - If missing, the NSE files should have been automatically created via the setup commands above

2. **Check CleverPush Framework is Linked to NSE**
   - Select the `CleverPushNotificationServiceExtension` target in Xcode
   - Go to `Build Phases` > `Link Binary With Libraries`
   - Ensure `CleverPush.framework` is listed
   - If missing, add it manually

3. **Ensure App Groups are Configured**
   - Verify App Groups are enabled for both main app and NSE targets
   - Check that the same App Group is selected for both targets
   - App Group should follow the pattern: `group.YOUR.BUNDLE.ID.cleverpush`

4. **Test with Actual Device**
   - Rich notifications may not work properly in iOS Simulator
   - Always test rich notifications on a physical iOS device

5. **Verify Developer Team and Capabilities**
   - Ensure development team is selected for both main project and notification service extension
   - Check that capabilities are properly configured:
     - Push Notifications (enabled)
     - Background Modes > Remote notifications (enabled)
     - App Groups (enabled for both targets)

## Setup Android

1. Setup Firebase inside your Android App and register the Sender ID and the API Key inside the CleverPush Channel settings. Please refer to the official docs: https://firebase.google.com/docs/android/setup

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

### Set Custom Notification Icon

You can define a custom notification icon that will be used by the CleverPush SDK for all push notifications.

The image must be named: ```cleverpush_notification_icon.png```

The SDK will automatically use this icon if it's found with the correct name.

Place your custom icon image in the appropriate drawable resource folders:

```
/drawable-[SIZE]/cleverpush_notification_icon.png
```

Examples:

```
/res/drawable-mdpi/cleverpush_notification_icon.png
/res/drawable-hdpi/cleverpush_notification_icon.png
/res/drawable-xhdpi/cleverpush_notification_icon.png
``` 

## Badge Counts

Disable automatic clearing of badge count when opening a notification. Enabled by default.
Please note that with the default behaviour (setting badge count to zero) iOS will automatically clear all notifications in the Notification Center.

Required setup steps:
1. <span style="color: red">Please set up the **App Group** like described in the iOS Setup section.</span>
2. Disable Badge Count in the CleverPush Channel Settings in the "iOS" section. It is not required anymore to send the Badge Count from the backend because the SDK will now handle the Badge Count by itself.

```javascript
CleverPush.setAutoClearBadge(false);
```

Enable automatic incrementation of badge count. Disabled by default.

```javascript
CleverPush.setIncrementBadge(true);
```
