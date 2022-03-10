---
id: setup
title: Setup
---

### Installation

1. Add the CleverPush NuGet Package
    ```bash
    Install-Package Com.CleverPush -Version 1.2.1
    ```


### Setup iOS

1. Enable the required capabilities

   1. Go to your root project and switch to the tab "Capabilities"
   
   2. Enable "Push Notifications"
   
   3. Enable "Background Modes" and check "Remote notifications"

2. Add Notification Service Extension

    This is required for correctly tracking notification deliveries and for displaying big images or videos in notifications.

    1. Right click on the project in the navigator on the left, then select Add -> `Add New Project`.
    2. Select `iOS` -> `Extension` -> `Notification Service Extension`.
    3. Right click on new Project’s References then select Edit References.
    4. Add the `CleverPush` nuget.
    5. Replace the `NotificationService.cs` file with the following contents:

      ```csharp
      using System;
      using Foundation;
      using UIKit;
      using UserNotifications;
      using Com.CleverPush;
      using Com.CleverPush.Abstractions;

      namespace CleverPushNotificationServiceExtension
      {
        [Register("NotificationService")]
        public class NotificationService : UNNotificationServiceExtension
        {
          Action<UNNotificationContent> ContentHandler { get; set; }
          UNMutableNotificationContent BestAttemptContent { get; set; }
          UNNotificationRequest ReceivedRequest { get; set; }

          protected NotificationService(IntPtr handle) : base(handle)
          {

          }

          public override void DidReceiveNotificationRequest(UNNotificationRequest request, Action<UNNotificationContent> contentHandler)
          {
            ReceivedRequest = request;
            ContentHandler = contentHandler;
            BestAttemptContent = (UNMutableNotificationContent)request.Content.MutableCopy();

            (CleverPush.Current as CleverPushImplementation).DidReceiveNotificationExtensionRequest(request, BestAttemptContent);

            ContentHandler(BestAttemptContent);
          }

          public override void TimeWillExpire()
          {
            (CleverPush.Current as CleverPushImplementation).ServiceExtensionTimeWillExpireRequest(ReceivedRequest, BestAttemptContent);

            ContentHandler(BestAttemptContent);
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


Common iOS errors:

```
ld: library not found for -lcleverpush-react-native
```

Go in *Xcode* > *Targets* > Your App > *Build Phases* > *Link Binary With Library*.
Click the + and select *libcleverpush-react-native.a*, then rebuild.


### Setup Android

1. Add `compileOptions` to the `android` section in the `android/app/build.gradle` file:

    ```groovy
    android {
   compileSdkVersion 27
   buildToolsVersion '27.0.3'
    
   compileOptions {
     sourceCompatibility JavaVersion.VERSION_1_8
     targetCompatibility JavaVersion.VERSION_1_8
   }
    
   ...
   ```


### Setup Huawei on Android

Please see these following docs from Huawei to setup the HMS libs.

1. Setup HMS: https://developer.huawei.com/consumer/en/doc/HMS-Plugin-Guides-V1/libbinding-0000001050138443-V1

2. Integrate HMS Bindings: https://developer.huawei.com/consumer/en/doc/HMS-Plugin-Guides-V1/integratelibs-0000001050136494-V1

3. Integrate HMS SDK: https://developer.huawei.com/consumer/en/doc/HMS-Plugin-Guides-V1/integrating-sdk-0000001050138445-V1
