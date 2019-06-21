+++
description = ""
title = "Cordova SDK"
date = "2017-04-10T16:43:08+01:00"
draft = false
weight = 200
bref=""
toc = true
+++

### Intallation

1. Add the required Cordova plugin

   {{< highlight bash >}}cordova plugin add cleverpush-cordova-sdk{{< /highlight >}}


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

        {{< highlight bash >}}target 'CleverPushNotificationServiceExtension' do

  pod 'CleverPush'

end
{{< /highlight >}}
    6. Run `pod install`
    7. Open `NotificationService.m` and replace the whole content with the following:

        {{< highlight objective-c >}}
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
{{< /highlight >}}

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


### Usage

Add the initialization code to your `index.js` file

   {{< highlight javascript >}}
   document.addEventListener('deviceready', function () {
     var notificationOpenedCallback = function(data) {
       console.log('notificationOpenedCallback:', JSON.stringify(data));
     };
     var subscribedCallback = function(subscriptionId) {
       console.log('subscriptionId:', subscriptionId);
     };

     window['plugins'].CleverPush.init("INSERT_YOUR_CHANNEL_ID", notificationOpenedCallback, subscribedCallback);
   }, false);
   {{< /highlight >}}

   Be sure to replace `INSERT_YOUR_CHANNEL_ID` with your CleverPush channel ID (can be found in the channel settings).
   
   If you are using Ionic, you can use platform.ready() instead of deviceready like this:
   
   {{< highlight javascript >}}
   import { Component } from '@angular/core';
   import { Platform } from '@ionic/angular';
   
   @Component({
     selector: 'app-root',
     templateUrl: 'app.component.html'
   })
   export class AppComponent {
     constructor(
       private platform: Platform
     ) {
       this.initializeApp();
     }
   
     initializeApp() {
       this.platform.ready().then(() => {
         var notificationOpenedCallback = function(data) {
           console.log('notificationOpenedCallback:', JSON.stringify(data));
         };
         var subscribedCallback = function(subscriptionId) {
           console.log('subscriptionId:', subscriptionId);
         };
   
         window['plugins'].CleverPush.init("Mw29Mswn2DgRD3Zyx", notificationOpenedCallback, subscribedCallback);
       });
     }
   }
   {{< /highlight >}}
