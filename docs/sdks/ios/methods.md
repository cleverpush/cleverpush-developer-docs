---
id: methods
title: Methods
---

## Basic usage

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
// init with autoRegister:false to manually subscribe later
CleverPush.initWithLaunchOptions(launchOptions,
  channelId: "YOUR_CHANNEL_ID_HERE",
  handleNotificationReceived:{ result in
    if let value = result?.notification.value(forKey: "url") {
      print("Received Notification with URL: \(value)")
    }
  },
  handleNotificationOpened:{ result in
    if let value = result?.notification.value(forKey: "url") {
      print("Opened Notification with URL: \(value)")
    }
  },
  handleSubscribed:{ subscriptionId in
    print("Subscribed to CleverPush with ID: \(subscriptionId ?? "")")
  },
  autoRegister: false
)

//get the locally stored notification.
let localNotifications = CleverPush.getNotifications()

// get remote notification and local notification based on the boolean argument.
// - if you pass boolean argument true you will get the list of remote notification else you will get the locally stored notification.
CleverPush.getNotifications(true, callback: { remoteNotification in
    print(remoteNotification as Any)
})

// subscribe
CleverPush.subscribe()

// unsubscribe later
CleverPush.unsubscribe()

// get subscription status
let isSubscribed = CleverPush.isSubscribed()
```

<!--Objective-C-->

```objective-c
// init with autoRegister:false to manually subscribe later
[CleverPush initWithLaunchOptions:launchOptions
            channelId:@"YOUR_CHANNEL_ID_HERE"
            handleNotificationReceived:^(CPNotificationReceivedResult *result) {
              NSLog(@"Received Notification with URL: %@", [result.notification valueForKey:@"url"]);
            handleNotificationOpened:^(CPNotificationOpenedResult *result) {
              NSLog(@"Opened Notification with URL: %@", [result.notification valueForKey:@"url"]);
            } handleSubscribed:^(NSString *subscriptionId) {
                NSLog(@"Subscribed to CleverPush with ID: %@", subscriptionId);
            }
            autoRegister:NO
];

//get the locally stored notification.
NSArray *localNotifications = [CleverPush getNotifications];

// get remote notification and local notification based on the boolean argument.
// - if you pass boolean argument YES you will get the list of remote notification else you will get the locally stored notification.
[CleverPush getNotifications:YES callback:^(NSArray *remoteNotification) {
    NSLog(@"%@", remoteNotification);
 }];

// subscribe
[CleverPush subscribe]

// unsubscribe later
[CleverPush unsubscribe]

// get subscription status
BOOL isSubscribed = [CleverPush isSubscribed]
```

<!--END_DOCUSAURUS_CODE_TABS-->


## Tags

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->


```swift
// get available tags
let channelTags = CleverPush.getAvailableTags()

// add/remove tag with action callback
CleverPush.addSubscriptionTag("TAG_ID", callback: { tagId in
    print(tagId as Any)
})

CleverPush.removeSubscriptionTag("TAG_ID", callback: { tagId in
    print(tagId as Any)
})

// add/remove multiple tags with action callback
let tags = ["TAG_ID1", "TAG_ID2"];

CleverPush.addSubscriptionTags(tags, callback: { addedTags in
    print(addedTags as Any)
})
  
CleverPush.removeSubscriptionTags(tags, callback: { remainingTags in
    print(remainingTags as Any)
})

// add/remove tag without action callback
CleverPush.addSubscriptionTag("TAG_ID")
CleverPush.removeSubscriptionTag("TAG_ID")

// add/remove multiple tags without action callback
CleverPush.addSubscriptionTags(tags)
CleverPush.removeSubscriptionTags(tags)

let hasTag = CleverPush.hasSubscriptionTag("TAG_ID")

let subscriptionTags = CleverPush.getSubscriptionTags()
let subscriptionTopics = CleverPush.getSubscriptionTopics()
CleverPush.setSubscriptionTopics(["ID_1", "ID_2"])
```

<!--Objective-C-->

```objective-c
// get available tags
NSArray* channelTags = [CleverPush getAvailableTags];

// add/remove tag with action callback
[CleverPush addSubscriptionTag:@"TAG_ID" callback:^(NSString *tagId) {
    NSLog(@"%@",tagId);
}];

[CleverPush removeSubscriptionTag:@"TAG_ID" callback:^(NSString *tagId) {
    NSLog(@"%@",tagId);
}];

// add/remove multiple tags with action callback
NSArray *tags = @[@"TAG_ID1", @"TAG_ID2"];

[CleverPush addSubscriptionTags:tags callback:^(NSArray *addedTags) {
    NSLog(@"%@",addedTags);
}];
    
[CleverPush removeSubscriptionTags:tags callback:^(NSArray *remainingTags) {
    NSLog(@"%@",remainingTags);
}];

// add/remove tag without action callback
[CleverPush addSubscriptionTag:@"TAG_ID"];
[CleverPush removeSubscriptionTag:@"TAG_ID"];

// add/remove multiple tags without action callback
[CleverPush addSubscriptionTags:tags];
[CleverPush removeSubscriptionTags:tags];

BOOL hasTag = [CleverPush hasSubscriptionTag:@"TAG_ID"];

NSArray* subscriptionTags = [CleverPush getSubscriptionTags];
NSArray* subscriptionTopics = [CleverPush getSubscriptionTopics];
[CleverPush setSubscriptionTopics:@{@"ID_1", @"ID_2"}];
```

<!--END_DOCUSAURUS_CODE_TABS-->


## Automatic Tag Assignment

The SDK can also automatically assign tags by using the `trackPageView` method. In simple cases you can just give the method a URL. In the CleverPush backoffice you can then set trigger the tags by matching URL Pathname RegExes. You can optionally also set combinations of min. visits, seconds or sessions for this tag.

Let's say you have created a tag with the URL pathname regex "/sports". This would trigger the tag for a subscriber:


<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
CleverPush.trackPageView("https://example.com/sports/article-123123")
```

<!--Objective-C-->

```objective-c
[CleverPush trackPageView:@"https://example.com/sports/article-123123"];
```

<!--END_DOCUSAURUS_CODE_TABS-->

We can also have more advanced use cases here by using Javascript functions for matching. For example you created a tag with the following function in the CleverPush backend: `params.category === "sports"`. This would then trigger the tag for a subscriber:


<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
CleverPush.trackPageView("https://example.com/anything", params: ["category" : "sports"])
```

<!--Objective-C-->

```objective-c
[CleverPush trackPageView:@"https://example.com/anything" params:[NSDictionary dictionaryWithObjectsAndKeys: @"sports", @"category", nil]];
```

<!--END_DOCUSAURUS_CODE_TABS-->


Once the `trackPageView` method has been implemented you can set up all the tags dynamically in the CleverPush backend without touching your code.


## Topics

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
//set the tint color for the topic attributes (save button and switches)
CleverPush.setNormalTintColor(UIColor .systemPurple);

//set branding color while you're going to enable highlighting newly added topic
CleverPush.setBrandingColor(UIColor .systemRed);

// get all the subscription topics
let subscriptionTopics = CleverPush.getSubscriptionTopics()

// set multiple subscription topics
CleverPush.setSubscriptionTopics(["ID_1", "ID_2"])

// get all the available topics
CleverPush.getAvailableTopics { channelTopics_ in
    print(channelTopics_ as Any)
}

// add a single topic
CleverPush.addSubscriptionTopic("ID_1")

// remove a single topic
CleverPush.removeSubscriptionTopic("ID_1")

let hasTopic = CleverPush.hasSubscriptionTopic("TOPIC_ID");

// let the user choose his topics
CleverPush.showTopicsDialog()
```

<!--Objective-C-->

```objective-c
//set the tint color for the topic attributes (save button and switches)
[CleverPush setNormalTintColor:[UIColor systemPurpleColor]];

//set branding color while you're going to enable highlighting newly added topic
[CleverPush setBrandingColor:[UIColor systemRedColor]];

// get all the subscription topics
NSArray* subscriptionTopics = [CleverPush getSubscriptionTopics];

// set multiple subscription topics
[CleverPush setSubscriptionTopics:@{@"ID_1", @"ID_2"}];

// get all the available topics
[CleverPush getAvailableTopics:^(NSArray* channelTopics_) {
    NSLog(@"CleverPush: Available topics %@", channelTopics_);
}];

// add a single topic
[CleverPush addSubscriptionTopic:@"ID_1"];

// remove a single topic
[CleverPush removeSubscriptionTopic:@"ID_1"];

BOOL hasTopic = [CleverPush hasSubscriptionTopic:@"TOPIC_ID"];

// let the user choose his topics
[CleverPush showTopicsDialog];

[CleverPush setTopicsChangedListener:^(NSArray* topicsIds) {
    NSLog(@"CleverPush: Changed topicsIds %@", topicsIds);
});
```

<!--END_DOCUSAURUS_CODE_TABS-->


Here is how the topics dialog looks like:

<img src="https://developers.cleverpush.com/img/topics-dialog-ios.png" alt="Topics Dialog iOS" height="500">


## Attributes

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
CleverPush.getAvailableAttributes { availableAttributes in
    print(availableAttributes as Any)
}

let subscriptionAttributes = CleverPush.getSubscriptionAttributes()

let attributeValue = CleverPush.getSubscriptionAttribute("ATTRIBUTE_ID")

// You can set string values like this
CleverPush.setSubscriptionAttribute("ATTRIBUTE_ID", value: "ATTRIBUTE_VALUE")

// You can also set array of string values like this
let valArray = ["ATTRIBUTE_VALUE_ONE", "ATTRIBUTE_VALUE_TWO", "ATTRIBUTE_VALUE_THREE", "ATTRIBUTE_VALUE_FOUR"]
CleverPush.setSubscriptionAttribute("ATTRIBUTE_ID", arrayValue: valArray)

// Please provide dates in the following format: YYYY-MM-DD
CleverPush.setSubscriptionAttribute("birthdate", value: "2020-06-21")

// You can also push/pull values to special array attributes (e.g. "categories")
CleverPush.pushSubscriptionAttributeValue("categories", value: "category_1");
CleverPush.pullSubscriptionAttributeValue("categories", value: "category_1");
```

<!--Objective-C-->

```objective-c
[CleverPush getAvailableAttributes^(NSDictionary* availableAttributes) {
    NSLog(@"CleverPush: Available attributes %@", availableAttributes);
}];

NSDictionary* subscriptionAttributes = [CleverPush getSubscriptionAttributes];

NSString* attributeValue = [CleverPush getSubscriptionAttribute:@"ATTRIBUTE_ID"];

// You can set string values like this
[CleverPush setSubscriptionAttribute:@"ATTRIBUTE_ID" value:@"ATTRIBUTE_VALUE"];

// You can also set array of string values like this
NSArray *valArray = @[@"ATTRIBUTE_VALUE_ONE", @"ATTRIBUTE_VALUE_TWO", @"ATTRIBUTE_VALUE_THREE", @"ATTRIBUTE_VALUE_FOUR"];
[CleverPush setSubscriptionAttribute:@"ATTRIBUTE_ID" arrayValue:valArray];

// Please provide dates in the following format: YYYY-MM-DD
[CleverPush setSubscriptionAttribute:@"birthdate" value:@"2020-06-21"];

// You can also push/pull values to special array attributes (e.g. "categories")
[CleverPush pushSubscriptionAttributeValue:@"categories" value:@"category_1"];
[CleverPush pullSubscriptionAttributeValue:@"categories" value:@"category_1"];

```

<!--END_DOCUSAURUS_CODE_TABS-->

## Country & Language

You can optionally override the country & language which is automatically detected from the system and can be used for targeting / translations.

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
CleverPush.setSubscriptionLanguage("en");
CleverPush.setSubscriptionCountry("US");
```

<!--Objective-C-->

```objective-c
[CleverPush setSubscriptionLanguage:@"en"];
[CleverPush setSubscriptionCountry: @"US"]
```

<!--END_DOCUSAURUS_CODE_TABS-->


## Received Notifications
(App Group from setup step 10 is required):

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
let notifications = CleverPush.getNotifications() as? [CPNotification]
print(notifications as Any)
print(notifications?[0].id as String)

```

<!--Objective-C-->

```objective-c
NSArray* notifications = [CleverPush getNotifications];

```

<!--END_DOCUSAURUS_CODE_TABS-->

## Remove Notification
You can remove notification stored locally using Notification ID

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
CleverPush.removeNotification("notification_Id")
```

<!--Objective-C-->
```objective-c
[CleverPush removeNotification:@"notification_Id"];
```

<!--END_DOCUSAURUS_CODE_TABS-->

## App Banners

(Available from version 1.3.0)

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
CleverPush.setAppBannerOpenedCallback { (_: CPAppBannerAction?) in
        print("App Banner Opened")
}

// You can also show one banner by its ID (we recommend app banner events for production usage)
CleverPush.showAppBanner("BANNER_ID")

```

<!--Objective-C-->

```objective-c
[CleverPush setAppBannerOpenedCallback:^(CPAppBannerAction *action) {
  NSLog(@"App Banner Opened");
}];

// You can also show one banner by its ID (we recommend app banner events for production usage)
[CleverPush showAppBanner:@"BANNER_ID"];
```

<!--END_DOCUSAURUS_CODE_TABS-->


Get banners by group ID

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
CleverPush.getAppBanners(byGroup: groupId) { banners in
  // do something with the banners
}
```

<!--Objective-C-->

```objective-c
[CleverPush getAppBannersByGroup:groupId callback:^(NSArray<CPAppBanner *> *banners) {
  // do something with the banners
}];
```

<!--END_DOCUSAURUS_CODE_TABS-->


### Disabling banners

You can also disable app banners temporarily, e.g. during a splash screen. Banners are enabled by default.
If a banner would show during this time, it is added to an internal queue and shown when calling `enableAppBanners`.

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
CleverPush.disableAppBanners();
CleverPush.enableAppBanners();
```

<!--Objective-C-->

```objective-c
[CleverPush disableAppBanners];
[CleverPush enableAppBanners];
```

<!--END_DOCUSAURUS_CODE_TABS-->


### Development mode

You can enable the development mode to disable caches for app banners, so you always see the most up to date version.

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
CleverPush.enableDevelopmentMode();
```

<!--Objective-C-->

```objective-c
[CleverPush enableDevelopmentMode];
```

<!--END_DOCUSAURUS_CODE_TABS-->

### HTML Banners

CleverPush supports various JavaScript functions which can be called from HTML banners:

<!--DOCUSAURUS_CODE_TABS-->

<!--JavaScript-->

```javascript
CleverPush.subscribe();
CleverPush.unsubscribe();
CleverPush.closeBanner();
CleverPush.trackEvent(eventId, propertiesObject);
CleverPush.trackClick(buttonId);
CleverPush.trackClick(buttonId, customDataObject);
CleverPush.openWebView(url);
CleverPush.setSubscriptionAttribute(attributeId, value);
CleverPush.addSubscriptionTag(tagId);
CleverPush.removeSubscriptionTag(tagId);
CleverPush.setSubscriptionTopics(topicIds);
CleverPush.addSubscriptionTopic(topicId);
CleverPush.removeSubscriptionTopic(topicId);
CleverPush.showTopicsDialog();
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Event Tracking

Events can be used to track conversions or trigger app banners.

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
CleverPush.trackEvent("EVENT NAME")

// track an event with custom properties
CleverPush.trackEvent("EVENT NAME", properties: ["property-1": "value"])

// track an event with a specified amount
CleverPush.trackEvent("EVENT NAME", amount: 37.50)

```

<!--Objective-C-->

```objective-c
[CleverPush trackEvent:@"EVENT NAME"];

// track an event with custom properties
[CleverPush trackEvent:@"EVENT NAME" properties:@{
  @"property-1": @"value"
}];

// track an event with a specified amount
[CleverPush trackEvent:@"EVENT NAME" amount:37.50];

```

<!--END_DOCUSAURUS_CODE_TABS-->


## Follow up Events

Events can be used to trigger follow-up campaigns.

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
CleverPush.triggerFollowUpEvent("EVENT NAME")

// add custom parameters
CleverPush.triggerFollowUpEvent("EVENT NAME", ["id": "123456"])

```

<!--Objective-C-->

```objective-c
[CleverPush triggerFollowUpEvent:@"EVENT NAME"];

// add custom parameters
[CleverPush triggerFollowUpEvent:@"EVENT NAME" parameters:@{@"id": @"123456"}];

```

<!--END_DOCUSAURUS_CODE_TABS-->


## Tracking Consent

You can optionally require a tracking consent from the user (e.g. you get this consent from a CMP). If you tell our SDK to wait for the tracking consent, it will not call any tracking-related features until the consent is available. Calls will be queued and automatically executed until the consent is available.

Step 1: Call this before initializing the SDK:

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
CleverPush.setTrackingConsentRequired(true)
```

<!--Objective-C-->

```objective-c
[CleverPush setTrackingConsentRequired:YES];
```

<!--END_DOCUSAURUS_CODE_TABS-->

Step 2: Call this when the user gave his consent (needs to be called on every launch):


<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
CleverPush.setTrackingConsent(true)
```

<!--Objective-C-->

```objective-c
[CleverPush setTrackingConsent:YES];
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Authorization Token

You can set an authorization token that will be used in an API call.

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->
```swift
CleverPush.setAuthorizerToken("YOUR_AUTH_TOKEN_HERE")
```

<!--Objective-C-->
```objective-c
[CleverPush setAuthorizerToken:@"YOUR_AUTH_TOKEN_HERE"];
```

<!--END_DOCUSAURUS_CODE_TABS-->

## TCF2 CMP

You can set IabTcfMode. Perform subscribe or tracking according to IabTcfMode if vendor consent is 1.

Call this before initializing the SDK

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->
```swift
// IabTcfModes are .subscribeWaitForConsent, .trackingWaitForConsent, .disabled
CleverPush.setIabTcfMode(.subscribeWaitForConsent)
```

<!--Objective-C-->
```objective-c
// IabTcfModes are CPIabTcfModeSubscribeWaitForConsent, CPIabTcfModeTrackingWaitForConsent, CPIabTcfModeDisabled
[CleverPush setIabTcfMode:CPIabTcfModeSubscribeWaitForConsent];
```

<!--END_DOCUSAURUS_CODE_TABS-->
    
## Implementation of App Banner Delegate for Displaying Banners on Custom View Controllers

Implemented an App Banner Delegate feature allowing the display of banners on custom view controllers. This feature introduces a custom delegate or protocol for passing a view controller, enabling the presentation of banners on specific, user-defined views.

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->
```swift
CleverPush.setShowAppBannerCallback { viewController in
            print("App Banner will be displayed on ViewController: \(viewController)")
            // Implement your logic to show the banner on the provided viewController
        }
```

<!--Objective-C-->
```objective-c
[CleverPush setShowAppBannerCallback:^(UIViewController *viewController) {
        NSLog(@"App Banner will be displayed on ViewController: %@", viewController);
        // Implement your logic to show the banner on the provided viewController
    }];
```

<!--END_DOCUSAURUS_CODE_TABS-->
    
## Auto Request Notification Permission

You can diable the notification permission dialog while subscribe.

Default `autoRequestNotificationPermission` value is `true` so while subscribing it checks that if notification permission is not given then it will display the dialog. By seting `autoRequestNotificationPermission` value to `false` notification permission dialog will not display if permission is not given while subscribe. 

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->
```swift
// This method sets the boolean variable true or false.
CleverPush.setAutoRequestNotificationPermission(false)
```

<!--Objective-C-->
```objective-c
// This method sets the boolean variable true or false.
[CleverPush setAutoRequestNotificationPermission:FALSE];
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Auto Resubscribe

You can perform auto resubscribe whenever app open if the user has given notification permission and subscriptionId is null.

Default `autoResubscribe` value is `false`. By seting `autoResubscribe` value to `true` whenever app open it checks that the user has given notification permission and subscriptionId is null then perform subscribe. 


<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->
```swift
// This method sets the boolean variable true or false.
CleverPush.setAutoResubscribe(true)
```

<!--Objective-C-->
```objective-c
// This method sets the boolean variable true or false.
[CleverPush setAutoResubscribe:TRUE];
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Set Local Track Event Retention Days

App Banners: Targeting by events from previous sessions

Added the `Add Event` feature in the `Targeting` section in the app banner. Where you can set the last x days event called and fulfil the specific condition then the banner will display.

E.g `in last 5 days between from 5 to 10 event TEST`. It will store the banner event data in a local database and check from the current date to till next five days. If the event called count for that particular banner is between 5 to 10 or not. If it's between those values then the banner will display otherwise not. After 5 days banner will not display. 

To delete the local database's table entry need to set `trackEventRetentionDays`. The default days are `90 days`. It will check each record's createdDateTime, if it's greater than trackEventRetentionDays then that data will be deleted from the table.

Call this before initializing the SDK

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->
```swift
CleverPush.setLocalEventTrackingRetentionDays(20)
```

<!--Objective-C-->
```objective-c
[CleverPush setLocalEventTrackingRetentionDays:20];
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Set Application Notification Badge Count

You can set or get your application's badge count using the methods provided below.

1. to get the application notification badge count

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->
```swift
CleverPush.getBadgeCount{ badge in
            print("Badge Count = %ld",badge)
      }
```

<!--Objective-C-->
```objective-c
[CleverPush getBadgeCount:^(NSInteger badge) {
        NSLog(@"Badge Count = %ld",badge);
    }];
```
2. to set the application notification badge count

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->
```swift
CleverPush.setBadgeCount(10)
```

<!--Objective-C-->
```objective-c
[CleverPush setBadgeCount:10];
```

<!--END_DOCUSAURUS_CODE_TABS-->