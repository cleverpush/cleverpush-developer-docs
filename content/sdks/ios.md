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

   {{< highlight objective-c >}}
   pod 'CleverPush'
   {{< /highlight >}}

2. Enable the required capabilities

   1. Go to your root project and switch to the tab "Capabilities"
   
   2. Enable "Push Notifications"
   
   3. Enable "Background Modes" and check "Remote notifications"

3. Add this code to your AppDelegate:

    Objective-C:

    {{< highlight objective-c >}}
    #import <CleverPush/CleverPush.h>
    
    @implementation AppDelegate
    
    - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
       // ...
    
       // Make sure to insert your CleverPush channelId
       [CleverPush initWithLaunchOptions:launchOptions channelId:@"INSERT-YOUR-CHANNEL-ID-HERE"];
    
       return YES;
    }
    
    @end
    {{< /highlight >}}


    Swift:

    {{< highlight swift >}}
    import CleverPush
    
    class AppDelegate {
        func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {	        // ...
    
            // Make sure to insert your CleverPush channelId
            CleverPush(launchOptions: launchOptions, channelId: "INSERT-YOUR-CHANNEL-ID-HERE")
    
            return true
        }
    }
    {{< /highlight >}}


   Optionally, you can also add your notification opened callback in your `didFinishLaunchingWithOptions` or the subscribed callback with the subscription ID like this:

   {{< highlight objective-c >}}
   // ...

	[CleverPush initWithLaunchOptions:launchOptions channelId:@"INSERT-YOUR-CHANNEL-ID-HERE" handleNotificationOpened:^(CPNotificationOpenedResult *result) {
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

4. Create your iOS push certificate

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

Subscribe (or unsubscribe) later:
{{< highlight objective-c >}}
// init with autoRegister:false
[CleverPush initWithLaunchOptions:launchOptions channelId:@"INSERT-YOUR-CHANNEL-ID-HERE" handleNotificationOpened:^(CPNotificationOpenedResult *result) {
    NSLog(@"Received Notification with URL: %@", [result.notification valueForKey:@"url"]);
} handleSubscribed:^(NSString *subscriptionId) {
    NSLog(@"Subscribed to CleverPush with ID: %@", subscriptionId);
} autoRegister:false];

// subscribe
[CleverPush subscribe]

// or unsubscribe
[CleverPush unsubscribe]
{{< /highlight >}}


Tag subscriptions and set attributes:

{{< highlight objective-c >}}
NSArray* channelTags = [CleverPush getAvailableTags];
NSDictionary* customAttributes = [CleverPush getAvailableAttributes];

[CleverPush addSubscriptionTag:@"TAG_ID"];
[CleverPush removeSubscriptionTag:@"TAG_ID"];
[CleverPush setSubscriptionAttribute:@"ATTRIBUTE_ID" value:@"ATTRIBUTE_VALUE"];

NSArray* subscriptionTags = [CleverPush getSubscriptionTags];
NSDictionary* subscriptionAttributes = [CleverPush getSubscriptionAttributes];
NSString* attribute = [CleverPush getSubscriptionAttribute:@"ATTRIBUTE_ID"];
bool hasTag = [CleverPush hasSubscriptionTag:@"TAG_ID"];
{{< /highlight >}}
