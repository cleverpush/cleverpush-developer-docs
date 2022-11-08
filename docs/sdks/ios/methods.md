---
id: methods
title: Methods
---

## Basic Usage

Objective-C:
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
Swift:
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
## Tags
Objective-C:

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

Swift:

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


## Automatic Tag Assignment

The SDK can also automatically assign tags by using the `trackPageView` method. In simple cases you can just give the method a URL. In the CleverPush backoffice you can then set trigger the tags by matching URL Pathname RegExes. You can optionally also set combinations of min. visits, seconds or sessions for this tag.

Let's say you have created a tag with the URL pathname regex "/sports". This would trigger the tag for a subscriber:


Objective-C:
```objective-c
[CleverPush trackPageView:@"https://example.com/sports/article-123123"];
```

Swift:
```swift
CleverPush.trackPageView("https://example.com/sports/article-123123")
```

We can also have more advanced use cases here by using Javascript functions for matching. For example you created a tag with the following function in the CleverPush backend: `params.category === "sports"`. This would then trigger the tag for a subscriber:

Objective-C:
```objective-c
[CleverPush trackPageView:@"https://example.com/anything" params:[NSDictionary dictionaryWithObjectsAndKeys: @"sports", @"category", nil]];
```

Swift:
```swift
CleverPush.trackPageView("https://example.com/anything", params: ["category" : "sports"])
```


Once the `trackPageView` method has been implemented you can set up all the tags dynamically in the CleverPush backend without touching your code.


## Topics
Objective-C:
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

Swift:
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


Here is how the topics dialog looks like:

![Topics Dialog iOS](https://developers.cleverpush.com/img/topics-dialog-ios.png)


## Attributes
Objective-C:
```objective-c
[CleverPush getAvailableAttributes^(NSDictionary* availableAttributes) {
    NSLog(@"CleverPush: Available attributes %@", availableAttributes);
}];

NSDictionary* subscriptionAttributes = [CleverPush getSubscriptionAttributes];

NSString* attributeValue = [CleverPush getSubscriptionAttribute:@"ATTRIBUTE_ID"];

// You can set string values like this
[CleverPush setSubscriptionAttribute:@"ATTRIBUTE_ID" value:@"ATTRIBUTE_VALUE"];

// Please provide dates in the following format: YYYY-MM-DD
[CleverPush setSubscriptionAttribute:@"birthdate" value:@"2020-06-21"];

// You can also push/pull values to special array attributes (e.g. "categories")
[CleverPush pushSubscriptionAttributeValue:@"categories" value:@"category_1"];
[CleverPush pullSubscriptionAttributeValue:@"categories" value:@"category_1"];

```

Swift:
```swift
CleverPush.getAvailableAttributes { availableAttributes in
    print(availableAttributes as Any)
}

let subscriptionAttributes = CleverPush.getSubscriptionAttributes()

let attributeValue = CleverPush.getSubscriptionAttribute("ATTRIBUTE_ID")

// You can set string values like this
CleverPush.setSubscriptionAttribute("ATTRIBUTE_ID", value: "ATTRIBUTE_VALUE")

// Please provide dates in the following format: YYYY-MM-DD
CleverPush.setSubscriptionAttribute("birthdate", value: "2020-06-21")

// You can also push/pull values to special array attributes (e.g. "categories")
CleverPush.pushSubscriptionAttributeValue("categories", value: "category_1");
CleverPush.pullSubscriptionAttributeValue("categories", value: "category_1");
```


## Country & Language

You can optionally override the country & language which is automatically detected from the system and can be used for targeting / translations.

```objective-c
[CleverPush setSubscriptionLanguage:@"en"];
[CleverPush setSubscriptionCountry: @"US"]
```

```swift
CleverPush.setSubscriptionLanguage("en");
CleverPush.setSubscriptionCountry("US");
```


## Received Notifications
(App Group from setup step 10 is required):

Objective-C:
```objective-c
NSArray* notifications = [CleverPush getNotifications];

```

Swift:
```swift
let notifications = CleverPush.getNotifications() as? [CPNotification]
print(notifications as Any)
print(notifications?[0].id as String)

```


## Remove Notification
You can remove notification stored locally using Notification ID
Swift:
```swift
CleverPush.removeNotification("notification_Id")
```
Objective-C:
```objective-c
[CleverPush removeNotification:@"notification_Id"];
```


## App Banners

(Available from version 1.3.0)

Objective-C:
```objective-c
[CleverPush setAppBannerOpenedCallback:^(CPAppBannerAction *action) {
NSLog(@"App Banner Opened");
}];

// You can emit custom events and use them as a trigger for your banners
[CleverPush triggerAppBannerEvent:@"key" value:@"value"];

// You can also show one banner by its ID (we recommend app banner events for production usage)
[CleverPush showAppBanner:@"BANNER_ID"];

```

Swift:
```swift
CleverPush.setAppBannerOpenedCallback { (_: CPAppBannerAction?) in
        print("App Banner Opened")
}

// You can emit custom events and use them as a trigger for your banners
CleverPush.triggerAppBannerEvent("key", value: "value")

// You can also show one banner by its ID (we recommend app banner events for production usage)
CleverPush.showAppBanner("BANNER_ID")

```


## Conversion Event Tracking

Events can be used to track conversions.

Objective-C:
```objective-c
[CleverPush trackEvent:@"EVENT NAME"];

// track a conversion with a specified amount
[CleverPush trackEvent:@"EVENT NAME" amount:37.50];

```

Swift:
```swift
CleverPush.trackEvent("EVENT NAME")

// track a conversion with a specified amount
CleverPush.trackEvent("EVENT NAME", amount: 37.50)

```


## Follow up Events

Events can be used to trigger follow-up campaigns.

Objective-C:
```objective-c
[CleverPush triggerFollowUpEvent:@"EVENT NAME"];

// add custom parameters
[CleverPush triggerFollowUpEvent:@"EVENT NAME" parameters:@{@"id": @"123456"}];

```

Swift:
```swift
CleverPush.triggerFollowUpEvent("EVENT NAME")

// add custom parameters
CleverPush.triggerFollowUpEvent("EVENT NAME", ["id": "123456"])

```


## Tracking Consent

You can optionally require a tracking consent from the user (e.g. you get this consent from a CMP). If you tell our SDK to wait for the tracking consent, it will not call any tracking-related features until the consent is available. Calls will be queued and automatically executed until the consent is available.

Step 1: Call this before initializing the SDK:

Objective-C:
```objective-c
[CleverPush setTrackingConsentRequired:YES];
```

Swift:
```swift
CleverPush.setTrackingConsentRequired(true)
```


Step 2: Call this when the user gave his consent (needs to be called on every launch):


Objective-C:
```objective-c
[CleverPush setTrackingConsent:YES];
```

Swift:
```swift
CleverPush.setTrackingConsent(true)
```

## Inbox View
You can also implement CleverPush InboxView into your application. Inbox View will come up with the package of the all the notification you have recieved with the CleverPush. To use the InboxView you will need to use the sample code as described below.

Objective-C:
1. Import "CleverPush/CPInboxView.h":
2. Add the inbox view:

```objective-c
#import <CleverPush/CPInboxView.h>

CPInboxView *inboxView = [[CPInboxView alloc]initWithFrame:CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height)
                                              combine_with_api:YES
                                                    read_color:UIColor.whiteColor
                                                  unread_color:UIColor.lightGrayColor
                                       notification_text_color:UIColor.blackColor
                                 notification_text_font_family:@"AppleSDGothicNeo-Reguler"
                                        notification_text_size:17
                                               date_text_color:UIColor.blackColor
                                         date_text_font_family:@"AppleSDGothicNeo-Reguler"
                                                date_text_size:12
                                                divider_colour:UIColor.blackColor];
    [self.view addSubview:inboxView];
```

Swift:
1. Import CleverPush
2. Add the inbox view:

```swift
import CleverPush

        let inboxView = CPInboxView(frame: CGRect(x: 0.0, y: 0, width: self.view.frame.size.width, height: self.view.frame.height ),
                                    combine_with_api: true,
                                    read_color: UIColor.white,
                                    unread_color: UIColor.lightGray,
                                    notification_text_color: UIColor.black,
                                    notification_text_font_family: "AppleSDGothicNeo-Reguler",
                                    notification_text_size: 17,
                                    date_text_color: UIColor.black,
                                    date_text_font_family: "AppleSDGothicNeo-Bold",
                                    date_text_size: 12,
                                    divider_colour: UIColor.black)

self.view.addSubview(inboxView!)
```

and you can get the call back events when you tapped on the any of the index from the list.

```objective-c
[inboxView notificationClickCallback:^(CPNotification *result) {
        NSLog(@"%@", result);
 }];
```

```swift
inboxView?.notificationClickCallback({ result in
            print(result as Any)
})
```

Here is how the InboxView will looks.

![SS](https://user-images.githubusercontent.com/44965555/146535126-f41e22b2-a1aa-4466-a546-3b4157bd13f9.png)
