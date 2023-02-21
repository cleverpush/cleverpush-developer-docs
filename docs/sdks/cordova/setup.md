---
id: setup
title: Cordova Setup
---

## Intallation

1. Add the required Cordova plugin

   ```bash
   cordova plugin add cleverpush-cordova-sdk
   ```


## Setup Android

1. Setup Firebase inside your Android App and register the Sender ID and the API Key inside the CleverPush Channel settings. Please refer to the official docs: https://firebase.google.com/docs/android/setup


## Setup iOS

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

        pod 'CleverPush'

      end
      ```
      
    6. Run `pod install`
    7. Open `NotificationService.m` and replace the whole content with the following:

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
