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


### Topics

```objective-c
NSArray* subscriptionTopics = [CleverPush getSubscriptionTopics];

[CleverPush setSubscriptionTopics:@{@"ID_1", @"ID_2"}];

// let the user choose his topics
[CleverPush showTopicsDialog];
```


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
