---
id: methods
title: Methods
---

## Basic Usage

Objective-C:
```objective-c
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
```
Swift:
```swift
// init with autoRegister:false to manually subscribe later
CleverPush.initWithLaunchOptions(launchOptions, channelId: "YOUR_CHANNEL_ID_HERE", handleNotificationOpened:{ result in
    if let value = result?.notification.value(forKey: "url") {
        print("Received Notification with URL: \(value)")
    }
}, handleSubscribed:{ subscriptionId in
    print("Subscribed to CleverPush with ID: \(subscriptionId ?? "")")
}, autoRegister: false)

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
NSArray* subscriptionTopics = [CleverPush getSubscriptionTopics];

[CleverPush setSubscriptionTopics:@{@"ID_1", @"ID_2"}];

// let the user choose his topics
[CleverPush showTopicsDialog];
```

Swift:
```swift
let subscriptionTopics = CleverPush.getSubscriptionTopics()

CleverPush.setSubscriptionTopics(["ID_1","ID_2"])

// let the user choose his topics
CleverPush.showTopicsDialog()
```



Here is how the topics dialog looks like:

![Topics Dialog iOS](https://developers.cleverpush.com/img/topics-dialog-ios.png)


## Attributes
Objective-C:
```objective-c
NSDictionary* customAttributes = [CleverPush getAvailableAttributes];

NSDictionary* subscriptionAttributes = [CleverPush getSubscriptionAttributes];

[CleverPush setSubscriptionAttribute:@"ATTRIBUTE_ID" value:@"ATTRIBUTE_VALUE"];

NSString* attribute = [CleverPush getSubscriptionAttribute:@"ATTRIBUTE_ID"];
```

Swift:
```swift
let customAttributes = CleverPush.getAvailableAttributes()

NSDictionary* subscriptionAttributes = [CleverPush getSubscriptionAttributes];

let subscriptionAttributes = CleverPush.getSubscriptionAttributes()

let attribute = CleverPush.getSubscriptionAttribute("ATTRIBUTE_ID")
```


## Received Notifications
(App Group from setup step 8 is required):

Objective-C:
```objective-c
NSArray* notifications = [CleverPush getNotifications];

```

Swift:
```swift
let notifications = CleverPush.getNotifications()

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


## Event Tracking

Events can be used to trigger follow-up campaigns or to track conversions.

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


## Chat
Objective-C:
1. Import "CleverPush/CPChatView.h":
2. Add the Chat View:

```objective-c
#import <CleverPush/CPChatView.h>

CPChatView *chatView = [[CPChatView alloc] initWithFrame:CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height)];
[self.view addSubview:chatView];
```
Swift:
1. Import CleverPush
2. Add the Chat View:

```swift
import CleverPush

let chatView = CPChatView(frame: CGRect(x: 0, y: 0, width: self.view.frame.size.width, height: self.view.frame.size.height))
self.view.addSubview(chatView)
```

## Stories
You can also implement CleverPush Stories into your application. For this, please set up a Story Widget in your CleverPush account. You can access stories via generated Widget Id and by following usage guide

Here is how the Stories will looks like:

![StoryBanner](https://user-images.githubusercontent.com/44965555/125643070-36a7fa6c-959f-4c6e-93e1-c73e9ac17886.png)
![StoryDetails](https://user-images.githubusercontent.com/44965555/125647371-a6d557e4-490e-4111-9276-7bd221e11cad.png)

Objective-C:
1. Import "CleverPush/CPStoryView.h":
2. Add the Story View:

```objective-c
#import <CleverPush/CPStoryView.h>

CPStoryView *storyView = [[CPStoryView alloc] 
initWithFrame:CGRectMake(0.0, 83.0, self.view.frame.size.width, 125.0)
                            backgroundColor:[UIColor greenColor]
                            textColor:[UIColor blackColor]
                            fontFamily:@"AppleSDGothicNeo-Bold"
                            borderColor:[UIColor redColor]
                            storyWidgetId:@"STORY_WIDGET_ID"];

[self.view addSubview:storyView];
```
Swift:
1. Import CleverPush
2. Add the Story View:

```swift
import CleverPush

let storyView = CPStoryView(frame: CGRect(x: 0.0, y: 83.0, width: self.view.frame.size.width, height: 125.0 ),
            backgroundColor: UIColor.green,
            textColor: UIColor.black,
            fontFamily: "AppleSDGothicNeo-Bold",
            borderColor: UIColor.red,
            storyWidgetId: "STORY_WIDGET_ID")!

self.view.addSubview(storyView)