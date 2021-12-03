---
id: setup
title: Setup
---

## Installation

**1. Tool Requirement and CleverPush Account setup guide:**

1. [Create A CleverPush Account](https://app.cleverpush.com/en/register) if you do not already have one
2. Your CleverPush Channel ID, available in `Channels` > `App Push` > `Advanced settings` > `Channel ID`  in the CleverPush Developer console.
3. An iOS device (iPhone, iPad, iPod Touch) to test on. The Xcode simulator doesn't support push notifications so you must test on a real device.
4. A Mac with a new version of Xcode.


**2. SDK Setup:**

**CocoaPods Installation**

Add CleverPush to your Podfile:

```bash
pod 'CleverPush', '~> 1.14.0'
```

Manual Installation** (not needed if you use CocoaPods):

1. Download the SDK release from https://github.com/cleverpush/cleverpush-ios-sdk/releases
2. Drop and drag `CleverPush/Framework/CleverPush.framework` into your Xcode project and check the copy option.
3. Add `SystemConfiguration`, `UIKit`, `UserNotifications`, `WebKit` and `JavaScriptCore` to your frameworks.
4. Continue to step 2. If you are at step 3 and 4, repeat these steps for the Service Extension and for the Content Extension

**3. Enable the required capabilities**

1. Go to your root project `Targets` > `Signing & Capabilities` > `Add Capabilities by clicking the "+ Capability" button`
2. Select "Push Notifications" from the list of the capabilities.
3. Select "Background Modes" from the list of the capabilities and tick on the option of "Remote notifications"

**4. Add Notification Service Extension**

This is required for correctly tracking notification deliveries and for displaying big images or videos in notifications.

1. Select `File` > `New` > `Target` in Xcode
2. Choose `Notification Service Extension` and press `Next`
3. Enter `CleverPushNotificationServiceExtension` as Product Name, choose `Objective-C` as language and press `Finish`
4. Press `Activate` on the next prompt
5. Add the following at the bottom of your Project's Podfile

    ```bash
    target 'CleverPushNotificationServiceExtension' do
        use_frameworks!

        pod 'CleverPush'

    end
    ```

**5. Add Notification Content Extension**

This is required for displaying custom notification contents (e.g. Carousel Notifications).

1. Select `File` > `New` > `Target` in Xcode
2. Choose `Notification Content Extension` and press `Next`
3. Enter `CleverPushNotificationContentExtension` as Product Name, choose `Objective-C` as language and press `Finish`
4. Press `Activate` on the next prompt
5. Add the following at the bottom of your Project's Podfile

    ```bash
    target 'CleverPushNotificationContentExtension' do
        use_frameworks!

        pod 'CleverPush'

    end
    ```    
    

**6. Run `pod install`**

**7. Open `CleverPushNotificationServiceExtension/NotificationService.m` and replace the whole content with the following:**

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

**8. Open `CleverPushNotificationContentExtension/NotificationViewController.h` and replace the whole content with the following:**

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
    [self cleverpushDidReceiveNotificationResponse:response completionHandler:completion];
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

8. Add this code to your AppDelegate:

Objective-C:

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

Swift:

```swift
import CleverPush

class AppDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {	        // ...

        // Make sure to insert your CleverPush channelId
        CleverPush.initWithLaunchOptions(launchOptions, channelId: "YOUR_CHANNEL_ID_HERE")

        // You can also leave out the Channel ID. You will need to specify the App's Bundle Identifier in the CleverPush Channel Settings.
        // CleverPush.initWithLaunchOptions(launchOptions);

        return true
    }
}
```

Optionally, you can also add your notification opened callback in your `didFinishLaunchingWithOptions` or the subscribed callback with the subscription ID like this:

Objective-C:

```objective-c
// ...

[CleverPush initWithLaunchOptions:launchOptions channelId:@"YOUR_CHANNEL_ID_HERE" handleNotificationOpened:^(CPNotificationOpenedResult *result) {
    NSLog(@"Received Notification with URL: %@", [result.notification valueForKey:@"url"]);
    
    UIAlertController* alert = [UIAlertController alertControllerWithTitle:[result.notification valueForKey:@"title"]
                                                                message:[result.notification valueForKey:@"text"]
                                                            preferredStyle:UIAlertControllerStyleAlert];
    
    UIAlertAction* defaultAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault
                                                        handler:^(UIAlertAction * action) {}];
    
    [alert addAction:defaultAction];
    [[[[UIApplication sharedApplication] keyWindow] rootViewController] presentViewController:alert animated:YES completion:nil];
} handleSubscribed:^(NSString *subscriptionId) {
    NSLog(@"Subscribed to CleverPush with ID: %@", subscriptionId);
}];
```

Swift:

```swift
// ...

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
// ...

    // Make sure to insert your CleverPush channelId
    

    CleverPush.initWithLaunchOptions(launchOptions, channelId: "YOUR_CHANNEL_ID_HERE", handleNotificationOpened: { (result) in
        
        print("Received Notification with URL: " + result!.notification.url!)
        let alert = UIAlertController(title: result!.notification.title, message: "Message", preferredStyle: UIAlertController.Style.alert)
        alert.addAction(UIAlertAction(title: "OK", style: UIAlertAction.Style.default, handler: nil))
        self.window?.rootViewController?.present(alert, animated: true, completion: nil)
        
    }, handleSubscribed:{ subscriptionId in
        
        print("Subscribed to CleverPush with ID: \(subscriptionId ?? "")")
        
    })
        


    return true
}
```

**9. Create your iOS push certificate**

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

**10. Add AppGroup (optional but recommended)**

This is required for getting the received notifications via the `getNotifications` method and also for automatic Badge Counting (i.e. when using `setIncrementBadge(true)`).

1. Select your main application Target in Xcode
2. Go to `Capabilities` and activate `App Groups`
3. Create a new App Group with the exact following scheme: `group.YOUR.BUNDLE.ID.cleverpush` (replace `YOUR.BUNDLE.ID` with your application's bundle identifier).
4. Enable the created App Group by checking the checkbox next to it
5. Select the `CleverPushNotificationServiceExtension` target and also enable the created App Group under `Capabilities`


## Custom sounds

iOS supports `aiff`, `wav` and `caf` audio files with a maximum length of 30 seconds.

1. Add the sound file(s) to the Xcode project root and make sure "Add to targets" is selected when adding the files.
2. When sending a notification you can enter the filename (with extension) in the field "Sound" in the advanced settings.
3. If you send notifications via the API you can use the parameter "soundFilename".


![](https://i.ibb.co/nssvMNk/Screenshot-2021-04-02-at-12-40-24-PM.png)

## Badge Counts

Disable automatic clearing of badge count when opening a notification. Enabled by default.
Please note that with the default behaviour (setting badge count to zero) iOS will automatically clear all notifications in the Notification Center.
For this to work, please set up the **App Group** like described in the Setup section.

Objective-C:
```objective-c
[CleverPush setAutoClearBadge:NO];
```

Swift:
```swift
CleverPush.setAutoClearBadge(false)
```

Enable automatic incrementation of badge count. Disabled by default.

Objective-C:
```objective-c
[CleverPush setIncrementBadge:YES];
```

Swift:
```swift
CleverPush.incrementBadge = true
```
**How to Create an iOS APNs Auth Key**

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