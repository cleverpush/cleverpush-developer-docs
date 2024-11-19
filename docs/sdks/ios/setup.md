---
id: setup
title: Setup
---

## Installation

### 1. CleverPush account

1. [Create A CleverPush Account](https://app.cleverpush.com/en/register) if you do not have one
2. You need your CleverPush Channel ID, available in `Channels` > `App Push` > `Implementation` > `Channel ID`  in the CleverPush Developer console.
3. You need a Mac with the latest version of Xcode installed.


### 2. SDK Setup

#### CocoaPods Installation

Add CleverPush to your Podfile:

```bash
pod 'CleverPush', '~> 1.31.19'
```

#### Swift Package Manager Setup
(not needed if you use CocoaPods)

1. **Select your Project** > **Package Dependencies** > **+ button**.

    ![](https://raw.githubusercontent.com/cleverpush/cleverpush-developer-docs/refs/heads/master/static/img/sdks/iOS_Swift_Package_Manager_Step1.png)
    
2. **Enter Package URL & Click Add Package**:  
   `https://github.com/cleverpush/cleverpush-ios-sdk.git`  
   Make sure **Dependency Rule** is set to **Up to Next Major Version** [latest version].

   ![](https://raw.githubusercontent.com/cleverpush/cleverpush-developer-docs/refs/heads/master/static/img/sdks/iOS_Swift_Package_Manager_Step2.png)

3. **Click Add Package**.

    ![](https://raw.githubusercontent.com/cleverpush/cleverpush-developer-docs/refs/heads/master/static/img/sdks/iOS_Swift_Package_Manager_Step3.png)

4. **Select your Application Target** > **General** > **Frameworks, Libraries, and Embedded Content**.  
   Check to ensure the required **CleverPushFramework** and any optionally selected libraries have been added.

   ![](https://raw.githubusercontent.com/cleverpush/cleverpush-developer-docs/refs/heads/master/static/img/sdks/iOS_Swift_Package_Manager_Step4.png)

5. If you have a **Notification Service Extension** or **Content Extension**, repeat the above steps for those targets to ensure the **CleverPushFramework** is included.

    ![](https://raw.githubusercontent.com/cleverpush/cleverpush-developer-docs/refs/heads/master/static/img/sdks/iOS_Swift_Package_Manager_Step5.png)

#### Carthage Setup
(not needed if you use CocoaPods):

1. Make sure you have [Carthage](https://github.com/Carthage/Carthage#installing-carthage) installed before you begin.

2. Create a [Cartfile](https://github.com/Carthage/Carthage#adding-frameworks-to-an-application) in the same folder as your project. 

3. In your cartfile, include the CleverPush iOS SDK:
    ```bash
        github "cleverpush/cleverpush-ios-sdk"
    ```
    
4. Navigate to the cartfile directory and run the following command in  the terminal.
    ```bash
    carthage update --use-xcframeworks
    ```
5. When the command is executed correctly, a folder named Carthage is created. The Cleverpush Framework will be generated in the Carthage > Build folder.

6. Simply include the Cleverpush framework in your project.

#### Manual Setup
(not needed if you use CocoaPods):

1. Download the SDK release from https://github.com/cleverpush/cleverpush-ios-sdk/releases
2. Drop and drag `CleverPush/Framework/CleverPush.framework` into your Xcode project and check the copy option.
3. Add `SystemConfiguration`, `UIKit`, `UserNotifications`, `WebKit`, `JavaScriptCore`, `ImageIO` and `MobileCoreServices` to your frameworks.
4. Continue to step 3. If you are at step 4 and 5, repeat these steps for the Service Extension and for the Content Extension

### 3. Enable the required capabilities

1. Go to your root project `Targets` > `Signing & Capabilities` > `Add Capabilities by clicking the "+ Capability" button`
2. Select "Push Notifications" from the list of the capabilities.
3. Select "Background Modes" from the list of the capabilities and tick on the option of "Remote notifications"

### 4. Add Notification Service Extension

This is required for correctly tracking notification deliveries and for displaying big images or videos in notifications.

1. Select `File` > `New` > `Target` in Xcode
2. Choose `Notification Service Extension` and press `Next`
3. Enter `CleverPushNotificationServiceExtension` as Product Name, choose `Objective-C` as language and press `Finish`
4. Press `Activate` on the next prompt
5. If you use CocoaPods: Add the following at the bottom of your Project's Podfile

    ```bash
    target 'CleverPushNotificationServiceExtension' do
        use_frameworks!

        pod 'CleverPush'
    end
    ```
6. If you use CocoaPods: Run `pod install`

### 5. Add Notification Content Extension (optional)

This is only required for displaying custom notification contents (e.g. Carousel Notifications).
**Most use cases do not require this extension.**

1. Select `File` > `New` > `Target` in Xcode
2. Choose `Notification Content Extension` and press `Next`
3. Enter `CleverPushNotificationContentExtension` as Product Name, choose `Objective-C` as language and press `Finish`
4. Press `Activate` on the next prompt
5. If you use CocoaPods: Add the following at the bottom of your Project's Podfile

    ```bash
    target 'CleverPushNotificationContentExtension' do
        use_frameworks!

        pod 'CleverPush'
    end
    ```    
6. If you use CocoaPods: Run `pod install`


### 7. Replace Notification Service Extension source code

Open `CleverPushNotificationServiceExtension/NotificationService.m` and replace the whole content with the following:

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

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

<!--Objective-C-->

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

<!--END_DOCUSAURUS_CODE_TABS-->


### 8. Replace Notification Content Extension source code

Only required if Notification Content Extension has been added.

Open `CleverPushNotificationContentExtension/NotificationViewController.h` and replace the whole content with the following:

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
import UIKit
import CleverPush

class NotificationViewController: CPNotificationViewController {

}
```

<!--Objective-C-->

```objective-c
#import <UIKit/UIKit.h>
#import <CleverPush/CleverPush.h>

@interface NotificationViewController : CPNotificationViewController

@end
```

<!--END_DOCUSAURUS_CODE_TABS-->

Open `CleverPushNotificationContentExtension/NotificationViewController.m` and replace the whole content with the following:

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
import UIKit
import UserNotifications
import UserNotificationsUI

class NotificationViewController: CPNotificationViewController, UNNotificationContentExtension {

    override func viewDidLoad() {
        super.viewDidLoad()
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
    }

    func didReceive(_ notification: UNNotification) {
        cleverpushDidReceiveNotification(notification)
    }

    func didReceive(_ response: UNNotificationResponse, completionHandler completion: @escaping (UNNotificationContentExtensionResponseOption) -> Void) {
        cleverpushDidReceiveNotificationResponse(response, completionHandler: completion)
    }
}
```

<!--Objective-C-->

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
    [self cleverpushDidReceiveNotificationResponse:response completionHandler:completion];
}

@end
```

<!--END_DOCUSAURUS_CODE_TABS-->

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

### 9. Initialize the SDK in your AppDelegate

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
import UIKit
import CleverPush
@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

        // Make sure to insert your CleverPush channelId
        CleverPush.initWithLaunchOptions(launchOptions, channelId: "YOUR_CHANNEL_ID_HERE")

        // You can also leave out the Channel ID. You will need to specify the App's Bundle Identifier in the CleverPush Channel Settings.
        // CleverPush.initWithLaunchOptions(launchOptions);

        return true
    }
}
```

<!--Objective-C-->

```objective-c
#import <CleverPush/CleverPush.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
// ...

// Make sure to insert your CleverPush channelId
[CleverPush initWithLaunchOptions:launchOptions channelId:@"INSERT-YOUR-CHANNEL-ID-HERE"];

// You can also leave out the Channel ID. You will need to specify the App's Bundle Identifier in the CleverPush Channel Settings.
// [CleverPush initWithLaunchOptions:launchOptions];

return YES;
}

@end
```

<!--END_DOCUSAURUS_CODE_TABS-->


Optionally, you can also add your notification opened callback in your `didFinishLaunchingWithOptions` or the subscribed callback with the subscription ID like this:

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
// ...

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
  // ...
  CleverPush.initWithLaunchOptions(launchOptions,
        channelId: "YOUR_CHANNEL_ID_HERE",
        handleNotificationReceived: { (result) in
            print("Received Notification with URL: " + (result!.notification?.url)!)
     }, handleNotificationOpened: { (result) in
            print("Opened Notification with URL: " + (result!.notification?.url)!)
     }, handleSubscribed: { subscriptionId in
            print("Subscribed to CleverPush with ID: \(subscriptionId ?? "")")
     }, autoRegister: true)

  return true
}
```

<!--Objective-C-->

```objective-c
// ...

[CleverPush initWithLaunchOptions:launchOptions
        channelId:@"YOUR_CHANNEL_ID_HERE"
        handleNotificationReceived:^(CPNotificationReceivedResult *result) {
            NSLog(@"Received Notification with URL: %@", [result.notification valueForKey:@"url"]);
     }  handleNotificationOpened:^(CPNotificationOpenedResult *result) {
            NSLog(@"Opened Notification with URL: %@", [result.notification valueForKey:@"url"]);
     }  handleSubscribed:^(NSString *subscriptionId) {
            NSLog(@"Subscribed to CleverPush with ID: %@", subscriptionId);
     } autoRegister:YES];
```

<!--END_DOCUSAURUS_CODE_TABS-->

Please note that `autoRegister` is turned to `true` in the above example. It means that the CleverPush SDK will automatically try to subscribe the user on the first launch of the app. If you call `unsubscribe()` the SDK will not automatically try to subscribe again.

### 10. Create your iOS Auth Key

See the section below: **[How to Create an iOS APNS Auth Key](#how-to-create-an-ios-apns-auth-key)**

### 11. Add AppGroup (optional but recommended)

This is **required** for getting the received notifications via the `getNotifications` method and also for **automatic Badge Counting** (i.e. when using `setIncrementBadge(true)`).

1. Select your main application Target in Xcode
2. Go to `Capabilities` and activate `App Groups`
3. Create a new App Group with the exact following scheme: `group.YOUR.BUNDLE.ID.cleverpush` (replace `YOUR.BUNDLE.ID` with your application's bundle identifier).
4. Enable the created App Group by checking the checkbox next to it
5. Select the `CleverPushNotificationServiceExtension` target and also enable the created App Group under `Capabilities`

## Managing Multiple Targets in Your App

When developing an application with multiple targets (such as **Stage**, **Live**, **Master**, etc.), Here are the necessary steps and configurations:

### 1. Service Extensions
- Each target should have its own service extension to handle notifications and functionalities independently.
- Add a new target for each service extension in your Xcode project.
- Ensure that each service extension is configured to handle notifications specific to its environment.
    
### 2. App Groups
- Set up separate App Groups for each target to enable communication between your app and its service extensions.
- Create distinct App Groups for Stage, Live, and Master targets in your project settings.
- Update the entitlements files for each target to include the corresponding App Group.
- Ensure that the logic in your app and extensions uses the correct App Group for data storage and sharing.

### 3. Entitlements
- Confirm that the entitlements for each target are appropriately configured, including permissions for push notifications and shared capabilities.
- Review and customize the entitlements file for each target.
- Add capabilities relevant to the environment (e.g., Push Notifications, App Groups).

### 4. Configuration Settings
- Each target may require different configuration settings such as Channel ID.
    
### 5. Info.plist Files
- Each target should have its own Info.plist file with environment-specific configurations.

## Custom sounds

iOS supports `aiff`, `wav` and `caf` audio files with a maximum length of 30 seconds.

1. Add the sound file(s) to the Xcode project root and make sure "Add to targets" is selected when adding the files.
2. When sending a notification you can enter the filename (with extension) in the field "Sound" in the advanced settings.
3. If you send notifications via the API you can use the parameter "soundFilename".


![](https://raw.githubusercontent.com/cleverpush/cleverpush-developer-docs/refs/heads/master/static/img/sdks/channel-settings-custom-sounds.png)

## Badge Counts

Disable automatic clearing of badge count when opening a notification. Enabled by default.
Please note that with the default behaviour (setting badge count to zero) iOS will automatically clear all notifications in the Notification Center.

Required setup steps:
1. <span style="color: red">Please set up the **App Group** like described in the Setup section.</span>
2. Disable Badge Count in the CleverPush Channel Settings in the "iOS" section. It is not required anymore to send the Badge Count from the backend because the SDK will now handle the Badge Count by itself.

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
CleverPush.setAutoClearBadge(false)
```

<!--Objective-C-->

```objective-c
[CleverPush setAutoClearBadge:NO];
```

<!--END_DOCUSAURUS_CODE_TABS-->


Enable automatic incrementation of badge count. Disabled by default.

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
CleverPush.incrementBadge = true
```

<!--Objective-C-->

```objective-c
[CleverPush setIncrementBadge:YES];
```

<!--END_DOCUSAURUS_CODE_TABS-->


## Hiding notifications while in foreground

You can disable the automatic showing of notifcations when the app is in foreground:

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
CleverPush.setShowNotificationsInForeground(false)
```

<!--Objective-C-->

```objective-c
[CleverPush setShowNotificationsInForeground:NO];
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Notification permission

By default, the SDK automatically unsubscribes users who have revoked their notification permission in the iOS settings.
Sometimes it still makes sense to subscribe those users (e.g. for silent notifications). You can disable this behaviour with this method call (before init).
The SDK then also automatically subscribes all users, no matter if they accepted or denied the permission prompt.

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
CleverPush.setIgnoreDisabledNotificationPermission(true)
```

<!--Objective-C-->

```objective-c
[CleverPush setIgnoreDisabledNotificationPermission:YES];
```

<!--END_DOCUSAURUS_CODE_TABS-->

## How to Create an iOS APNS Auth Key

If you’d like to send push notifications to your iOS users, you will need to upload either an APNs Push Certificate, or an APNs Auth Key.

We recommend that you create and upload an APNs Auth Key for the following reasons:

No need to re-generate the push certificate every year

One auth key can be used for all your apps – this avoids the complication of maintaining different certificates

When sending push notifications using an APNs Auth Key, we require the following information about your app:

- Auth Key file
- Team ID
- Your app’s bundle ID
To create an APNs auth key, follow the steps below.

Visit the [Apple developer portal](https://developer.apple.com/)

![](https://user-images.githubusercontent.com/44965555/144593675-0f951c98-26a8-4899-817d-b2c8f849b529.png)

Click on “Certificates, Identifiers & Profiles”.

Go to Keys from the Left Menu.

Create a new Auth Key by clicking on the “+” button beside the **Key**.

![](https://user-images.githubusercontent.com/44965555/144594043-5939225c-484b-4c2c-a45b-ac9b33142d4a.png)

On the following page, add a Key Name, and select APNs Hit the Continue button.

![](https://user-images.githubusercontent.com/44965555/144594074-53f0bd00-6501-4edb-9eab-f289bad54eb6.png)  

and save the APNs Key And download.

![](https://user-images.githubusercontent.com/44965555/144594257-18a5c2c9-dcb8-4346-b176-477d08509f6d.png)

On this page, you will be able to download your auth key file. Please do not rename this file, and upload it as it is to our dashboard, as shown later below.

![](https://user-images.githubusercontent.com/44965555/144594154-af36cbe3-fe98-4d6d-bfe6-0346581c712b.png)

Locate and copy your Team ID – click on your name/company name at the top right corner, then select “View Account”.

![](https://user-images.githubusercontent.com/44965555/144594278-6b27143f-67af-4d30-9edc-65825f00d219.png)

Copy your Team ID, and head over to the CleverPush dashboard, and navigate to Channels ->Select your channel -> App Push -> iOS 

Paste the APNs Key ID which you have downloaded earlier, and paste your Team ID and your app’s bundle ID. Your app’s bundle ID can be found in Xcode.

Also, Mention Store ID if your application is in production mode.

![](https://user-images.githubusercontent.com/44965555/144594306-3dbdf598-87a4-45b7-9457-6103a78c84cf.png)
