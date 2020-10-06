---
id: methods
title: Methods
---

### Basic Usage

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


### Tags

```objective-c
NSArray* channelTags = [CleverPush getAvailableTags];

[CleverPush addSubscriptionTag:@"TAG_ID"];

[CleverPush removeSubscriptionTag:@"TAG_ID"];

BOOL hasTag = [CleverPush hasSubscriptionTag:@"TAG_ID"];

NSArray* subscriptionTags = [CleverPush getSubscriptionTags];
NSArray* subscriptionTopics = [CleverPush getSubscriptionTopics];
[CleverPush setSubscriptionTopics:@{@"ID_1", @"ID_2"}];
```


### Automatic Tag Assignment

The SDK can also automatically assign tags by using the `trackPageView` method. In simple cases you can just give the method a URL. In the CleverPush backoffice you can then set trigger the tags by matching URL Pathname RegExes. You can optionally also set combinations of min. visits, seconds or sessions for this tag.

Let's say you have created a tag with the URL pathname regex "/sports". This would trigger the tag for a subscriber:

```objective-c
[CleverPush trackPageView:@"https://example.com/sports/article-123123"];
```

We can also have more advanced use cases here by using Javascript functions for matching. For example you created a tag with the following function in the CleverPush backend: `params.category === "sports"`. This would then trigger the tag for a subscriber:

```objective-c
[CleverPush trackPageView:@"https://example.com/anything" params:[NSDictionary dictionaryWithObjectsAndKeys: @"sports", @"category", nil]];
```

Once the `trackPageView` method has been implemented you can set up all the tags dynamically in the CleverPush backend without touching your code.


### Topics

```objective-c
NSArray* subscriptionTopics = [CleverPush getSubscriptionTopics];

[CleverPush setSubscriptionTopics:@{@"ID_1", @"ID_2"}];

// let the user choose his topics
[CleverPush showTopicsDialog];
```

Here is how the topics dialog looks like:

iOS:

![Topics Dialog iOS](/img/topics-dialog-ios-png)

Android:

![Topics Dialog Android](/img/topics-dialog-android.png)



### Attributes

```objective-c
NSDictionary* customAttributes = [CleverPush getAvailableAttributes];

NSDictionary* subscriptionAttributes = [CleverPush getSubscriptionAttributes];

[CleverPush setSubscriptionAttribute:@"ATTRIBUTE_ID" value:@"ATTRIBUTE_VALUE"];

NSString* attribute = [CleverPush getSubscriptionAttribute:@"ATTRIBUTE_ID"];
```


### Received Notifications
(App Group from setup step 8 is required):
```objective-c
NSArray* notifications = [CleverPush getNotifications];
```


### App Banners

```objective-c
// usually call this after initializing
[CleverPush showAppBanners];
```


### Event Tracking

Events can be used to trigger follow-up campaigns or to track conversions.

```objective-c
[CleverPush trackEvent:@"EVENT NAME"];

// track a conversion with a specified amount
[CleverPush trackEvent:@"EVENT NAME" amount:37.50];
```


### Tracking Consent

You can optionally require a tracking consent from the user (e.g. you get this consent from a CMP). If you tell our SDK to wait for the tracking consent, it will not call any tracking-related features until the consent is available. Calls will be queued and automatically executed until the consent is available.

Step 1: Call this before initializing the SDK:

```objective-c
[CleverPush setTrackingConsentRequired:YES];
```

Step 2: Call this when the user gave his consent (needs to be called on every launch):

```objective-c
[CleverPush setTrackingConsent:YES];
```


### Chat

1. Import "CleverPush/CPChatView.h":

```objective-c
#import <CleverPush/CPChatView.h>
```

2. Add the Chat View:

```objective-c
CPChatView *chatView = [[CPChatView alloc] initWithFrame:CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height)];
[self.view addSubview:chatView];
```
