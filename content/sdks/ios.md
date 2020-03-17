+++
description = ""
title = "iOS SDK"
date = "2017-04-10T16:43:08+01:00"
draft = false
weight = 200
bref=""
toc = true
+++

### Installation

1. *CocoaPods Installation*:

    Add CleverPush to your Podfile:
    
    {{< highlight bash >}}pod 'CleverPush', '~> 0.5.8'{{< /highlight >}}

    The latest stable iOS SDK version is `0.5.8`
    
   *Manual Installation* (not needed if you use CocoaPods):

    1. Download the SDK release from https://github.com/cleverpush/cleverpush-ios-sdk/releases
    2. Drop and drag CleverPush/Framework/CleverPush.framework into your Xcode project and check the copy option.
    3. Add `SystemConfiguration`, `UIKit`, and `UserNotifications`, `WebKit` to your frameworks.
    4. Continue to step 2. If you are at step 3 and 4, repeat these steps for the Service Extension and for the Content Extension

2. Enable the required capabilities

    1. Go to your root project and switch to the tab "Capabilities"
    2. Enable "Push Notifications"
    3. Enable "Background Modes" and check "Remote notifications"

3. Add Notification Service Extension

    This is required for correctly tracking notification deliveries and for displaying big images or videos in notifications.

    1. Select `File` > `New` > `Target` in Xcode
    2. Choose `Notification Service Extension` and press `Next`
    3. Enter `CleverPushNotificationServiceExtension` as Product Name, choose `Objective-C` as language and press `Finish`
    4. Press `Activate` on the next prompt
    5. Add the following at the bottom of your Project's Podfile

        {{< highlight bash >}}target 'CleverPushNotificationServiceExtension' do

  pod 'CleverPush', '~> 0.5.8'

end
{{< /highlight >}}

4. Add Notification Content Extension

    This is required for displaying custom notification contents (e.g. Carousel Notifications).

    1. Select `File` > `New` > `Target` in Xcode
    2. Choose `Notification Content Extension` and press `Next`
    3. Enter `CleverPushNotificationContentExtension` as Product Name, choose `Objective-C` as language and press `Finish`
    4. Press `Activate` on the next prompt
    5. Add the following at the bottom of your Project's Podfile

        {{< highlight bash >}}target 'CleverPushNotificationContentExtension' do

  pod 'CleverPush', '~> 0.5.8'

end
{{< /highlight >}}
    5. Run `pod install`
    6. Open `CleverPushNotificationServiceExtension/NotificationService.m` and replace the whole content with the following:

        Objective-C:

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

        Swift:

        {{< highlight swift >}}
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
{{< /highlight >}}

7. Open `CleverPushNotificationContentExtension/NotificationViewController.h` and replace the whole content with the following:

    Objective-C:

    {{< highlight objective-c >}}
#import <UIKit/UIKit.h>
#import <CleverPush/CleverPush.h>

@interface NotificationViewController : CPNotificationViewController

@end
{{< /highlight >}}

    Open `CleverPushNotificationContentExtension/NotificationViewController.m` and replace the whole content with the following:

    Objective-C:

    {{< highlight objective-c >}}
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
{{< /highlight >}}

    Open `CleverPushNotificationContentExtension/Info.plist` and replace the whole content with the following:

    {{< highlight xml >}}
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
{{< /highlight >}}

8. Add this code to your AppDelegate:

    Objective-C:

    {{< highlight objective-c >}}#import <CleverPush/CleverPush.h>
    
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
{{< /highlight >}}


    Swift:

    {{< highlight swift >}}import CleverPush

class AppDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {	        // ...

        // Make sure to insert your CleverPush channelId
        CleverPush.initWithLaunchOptions(launchOptions, channelId: "YOUR_CHANNEL_ID_HERE")

        // You can also leave out the Channel ID. You will need to specify the App's Bundle Identifier in the CleverPush Channel Settings.
        // CleverPush.initWithLaunchOptions(launchOptions);

        return true
    }
}
{{< /highlight >}}

    Optionally, you can also add your notification opened callback in your `didFinishLaunchingWithOptions` or the subscribed callback with the subscription ID like this:

    Objective-C:

    {{< highlight objective-c >}}// ...

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
{{< /highlight >}}

    Swift:

    {{< highlight swift >}}// ...

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
// ...

    // Make sure to insert your CleverPush channelId
    CleverPush.initWithLaunchOptions(launchOptions, channelId: "YOUR_CHANNEL_ID_HERE", handleNotificationOpened: { (result) in
      print("Received Notification with URL: " + result!.notification["url"]);

      let alert = UIAlertController(title: result!.notification["title"], message: "Message", preferredStyle: UIAlertControllerStyle.Alert)
      alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.Default, handler: nil))
      self.presentViewController(alert, animated: true, completion: nil)
     })

    return true
}
{{< /highlight >}}

9. Create your iOS push certificate

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

10. Add AppGroup (optional)

    This is required for getting the received notifications via the `getNotifications` method

    1. Select your main application Target in Xcode
    2. Go to `Capabilities` and activate `App Groups`
    3. Create a new App Group with the following Scheme: `group.YOUR.BUNDLE.ID.cleverpush` (replace `YOUR.BUNDLE.ID` with your application's bundle identifier).
    4. Enable the created App Group by checking the checkbox next to it
    5. Select The `CleverPushNotificationExtension` target and also enable the created App Group under `Capabilities`


### Basic Usage

{{< highlight objective-c >}}
// init with autoRegister:false to manually subscribe later
[CleverPush initWithLaunchOptions:launchOptions channelId:@"YOUR_CHANNEL_ID_HERE" handleNotificationOpened:^(CPNotificationOpenedResult *result) {
    NSLog(@"Received Notification with URL: %@", [result.notification valueForKey:@"url"]);
} handleSubscribed:^(NSString *subscriptionId) {
    NSLog(@"Subscribed to CleverPush with ID: %@", subscriptionId);
} autoRegister:false];

// subscribe
[CleverPush subscribe]

// unsubscribe later
[CleverPush unsubscribe]

// get subscription status
BOOL isSubscribed = [CleverPush isSubscribed]
{{< /highlight >}}


### Tags

{{< highlight objective-c >}}
NSArray* channelTags = [CleverPush getAvailableTags];

[CleverPush addSubscriptionTag:@"TAG_ID"];

[CleverPush removeSubscriptionTag:@"TAG_ID"];

BOOL hasTag = [CleverPush hasSubscriptionTag:@"TAG_ID"];

NSArray* subscriptionTags = [CleverPush getSubscriptionTags];
NSArray* subscriptionTopics = [CleverPush getSubscriptionTopics];
[CleverPush setSubscriptionTopics:@{@"ID_1", @"ID_2"}];
{{< /highlight >}}


### Topics

{{< highlight objective-c >}}
NSArray* subscriptionTopics = [CleverPush getSubscriptionTopics];

[CleverPush setSubscriptionTopics:@{@"ID_1", @"ID_2"}];

// let the user choose his topics
[CleverPush showTopicsDialog];
{{< /highlight >}}


### Attributes

{{< highlight objective-c >}}
NSDictionary* customAttributes = [CleverPush getAvailableAttributes];

NSDictionary* subscriptionAttributes = [CleverPush getSubscriptionAttributes];

[CleverPush setSubscriptionAttribute:@"ATTRIBUTE_ID" value:@"ATTRIBUTE_VALUE"];

NSString* attribute = [CleverPush getSubscriptionAttribute:@"ATTRIBUTE_ID"];
{{< /highlight >}}


### Received Notifications
(App Group from setup step 8 is required):
{{< highlight objective-c >}}
NSArray* notifications = [CleverPush getNotifications];
{{< /highlight >}}


### App Banners

{{< highlight objective-c >}}
// usually call this after initializing
[CleverPush showAppBanners];
{{< /highlight >}}


### Event Tracking

Events can be used to trigger follow-up campaigns or to track conversions.

{{< highlight objective-c >}}
[CleverPush trackEvent:@"EVENT NAME"];

// track a conversion with a specified amount
[CleverPush trackEvent:@"EVENT NAME" amount:37.50];
{{< /highlight >}}


### Chat

1. Import "CleverPush/CPChatView.h":

{{< highlight objective-c >}}
#import <CleverPush/CPChatView.h>
{{< /highlight >}}

2. Add the Chat View:

{{< highlight objective-c >}}
CPChatView *chatView = [[CPChatView alloc] initWithFrame:CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height)];
[self.view addSubview:chatView];
{{< /highlight >}}
