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

1. Add CleverPush to your Podfile
    
    {{< highlight bash >}}pod 'CleverPush', '~> 0.1.5'{{< /highlight >}}

    The latest stable iOS SDK version is `0.1.5`

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

  pod 'CleverPush', '~> 0.1.5'

end
{{< /highlight >}}
    6. Run `pod install`
    7. Open `CleverPushNotificationServiceExtension/NotificationService.m` and replace the whole content with the following:

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

4. Add this code to your AppDelegate:

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
        CleverPush(launchOptions: launchOptions, channelId: "YOUR_CHANNEL_ID_HERE")

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
    CleverPush(launchOptions: launchOptions, channelId: "YOUR_CHANNEL_ID_HERE", handleNotificationOpened: { (result) in
      print("Received Notification with URL: " + result!.notification["url"]);

      let alert = UIAlertController(title: result!.notification["title"], message: "Message", preferredStyle: UIAlertControllerStyle.Alert)
      alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.Default, handler: nil))
      self.presentViewController(alert, animated: true, completion: nil)
     })

    return true
}
{{< /highlight >}}

5. Create your iOS push certificate

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

6. Add AppGroup (optional)

    This is required for getting the received notifications via the `getNotifications` method

    1. Select your main application Target in Xcode
    2. Go to `Capabilities` and activate `App Groups`
    3. Create a new App Group with the following Scheme: `group.YOUR.BUNDLE.ID.cleverpush` (replace `YOUR.BUNDLE.ID` with your application's bundle identifier).
    4. Enable the created App Group by checking the checkbox next to it
    5. Select The `CleverPushNotificationExtension` target and also enable the created App Group under `Capabilities`


### Usage

Subscribe (or unsubscribe) later:
{{< highlight objective-c >}}
// init with autoRegister:false
[CleverPush initWithLaunchOptions:launchOptions channelId:@"YOUR_CHANNEL_ID_HERE" handleNotificationOpened:^(CPNotificationOpenedResult *result) {
    NSLog(@"Received Notification with URL: %@", [result.notification valueForKey:@"url"]);
} handleSubscribed:^(NSString *subscriptionId) {
    NSLog(@"Subscribed to CleverPush with ID: %@", subscriptionId);
} autoRegister:false];

// subscribe
[CleverPush subscribe]

// or unsubscribe
[CleverPush unsubscribe]

// get subscription status (returns true or false)
[CleverPush isSubscribed]
{{< /highlight >}}


Tag subscriptions and set attributes:

{{< highlight objective-c >}}
NSArray* channelTags = [CleverPush getAvailableTags];
NSDictionary* customAttributes = [CleverPush getAvailableAttributes];

[CleverPush addSubscriptionTag:@"TAG_ID"];
[CleverPush removeSubscriptionTag:@"TAG_ID"];
bool hasTag = [CleverPush hasSubscriptionTag:@"TAG_ID"];
NSArray* subscriptionTags = [CleverPush getSubscriptionTags];

NSDictionary* subscriptionAttributes = [CleverPush getSubscriptionAttributes];
[CleverPush setSubscriptionAttribute:@"ATTRIBUTE_ID" value:@"ATTRIBUTE_VALUE"];
NSString* attribute = [CleverPush getSubscriptionAttribute:@"ATTRIBUTE_ID"];

NSArray* subscriptionTopics = [CleverPush getSubscriptionTopics];
[CleverPush setSubscriptionTopics:@{@"ID_1", @"ID_2"}];
{{< /highlight >}}


Get received notifications (App Group from setup step 6 is required):
{{< highlight objective-c >}}
NSArray* notifications = [CleverPush getNotifications];
{{< /highlight >}}


Show topics dialog:
{{< highlight objective-c >}}
[CleverPush showTopicsDialog];
{{< /highlight >}}

App Banners:

{{< highlight objective-c >}}
[CleverPush showAppBanners];
{{< /highlight >}}
