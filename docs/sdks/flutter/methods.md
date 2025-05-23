---
id: methods
title: Methods
---

## Basic Usage
```dart
import 'package:cleverpush_flutter/cleverpush_flutter.dart';

// init with autoRegister:false to manually subscribe later
await CleverPush.shared.init("INSERT_CLEVERPUSH_CHANNEL_ID_HERE", false);

// init with autoRegister:true to automatic subscribe 
await CleverPush.shared.init("INSERT_CLEVERPUSH_CHANNEL_ID_HERE", true);

// subscribe 
await CleverPush.shared.subscribe();

// unsubscribe 
await CleverPush.shared.unsubscribe();

// Get the subscription success callback with subscriptionId 
CleverPush.shared.setSubscribedHandler((subscriptionId) {
      print("Subscribed: ${subscriptionId}");
});

// Get the subscription status by execute the following code
CleverPush.shared.isSubscribed().then((status) {
  console.log(status);
});

// Get the subscription ID 
var subscriptionId = await CleverPush.shared.getSubscriptionId();
```

### Show/Hide Foreground Notifications

```dart
CleverPush.shared.setShowNotificationsInForeground(false);
```


### Notification permission

By default, the SDK automatically unsubscribes users who have revoked their notification permission in the iOS settings.
Sometimes it still makes sense to subscribe those users (e.g. for silent notifications). You can disable this behaviour with this method call (before init).
The SDK then also automatically subscribes all users, no matter if they accepted or denied the permission prompt.


```dart
CleverPush.shared.setIgnoreDisabledNotificationPermission(true);
```



## Topics
```dart
// get all the subscription topics
var subscriptionTopics = await CleverPush.shared.getSubscriptionTopics();

// set multiple subscription topics
List<String> topics = ['ID_1', 'ID_2'];
CleverPush.shared.setSubscriptionTopics(topics);

// let the user choose his topics
CleverPush.shared.showTopicsDialog();

// get all the available topics
var availableTopics = await CleverPush.shared.getAvailableTopics();
```
Here is how the topics dialog looks like:

![Topics Dialog iOS](https://developers.cleverpush.com/img/topics-dialog-ios.png)


## Tags
```dart
// get all the subscription tags
var subscriptionTags = await CleverPush.shared.getSubscriptionTags();

// add or remove tags by their ID
CleverPush.shared.addSubscriptionTag('TAG_ID');
CleverPush.shared.removeSubscriptionTag('TAG_ID');

// add or remove multiple subscription tags
List<String> tagIds = ['TAG_ID1', 'TAG_ID2'];
CleverPush.shared.addSubscriptionTags(tagIds);
CleverPush.shared.removeSubscriptionTags(tagIds);

// get all the available tags
var availableTags = await CleverPush.shared.getAvailableTags();
```

## Automatic Tag Assignment

The SDK can also automatically assign tags by using the `trackPageView` method. In simple cases you can just give the method a URL. In the CleverPush backoffice you can then set trigger the tags by matching URL Pathname RegExes. You can optionally also set combinations of min. visits, seconds or sessions for this tag.

Let's say you have created a tag with the URL pathname regex "/sports". This would trigger the tag for a subscriber:


```dart
CleverPush.shared.trackPageView('https://example.com/sports/article-123123');
```

Once the `trackPageView` method has been implemented you can set up all the tags dynamically in the CleverPush backend without touching your code.


## Attributes
```dart
// get all the subscription attributes
var subscriptionAttributes = await CleverPush.shared.getSubscriptionAttributes();

// set attribute values by their ID
CleverPush.shared.setSubscriptionAttribute('ATTRIBUTE_ID', 'ATTRIBUTE_VALUE');
var attributeValue = await CleverPush.shared.getSubscriptionAttribute('ATTRIBUTE_ID');

// get all the available attributes
var availableAttributes = await CleverPush.shared.getAvailableAttributes();

// You can also push/pull values to special array attributes (e.g. "categories")
CleverPush.shared.pushSubscriptionAttributeValue("categories","categories_1");
CleverPush.shared.pullSubscriptionAttributeValue("categories","categories_1");
```


## Event Tracking

Events can be used to track conversions.

```dart
await CleverPush.shared.trackEvent('EVENT NAME');

// track a conversion with a specified amount
await CleverPush.shared.trackEvent('EVENT NAME', 37.50);

// add custom parameters
await CleverPush.shared.trackEvent('EVENT NAME', {
  "id": "123456"
});
```


## Follow up Events

*Deprecated: Use `trackEvent` instead to trigger Follow-ups via Events.*

Events can be used to trigger follow-up campaigns.

```dart
await CleverPush.shared.triggerFollowUpEvent('EVENT NAME');

// add custom parameters
await CleverPush.shared.triggerFollowUpEvent('EVENT NAME', {
  "id": "123456"
});
```


## Country & Language

You can optionally override the country & language which is automatically detected from the system and can be used for targeting / translations.

```dart
CleverPush.shared.setSubscriptionLanguage("en");
CleverPush.shared.setSubscriptionCountry("US");
```


## Notifications

```dart
// Get the notification callback once you recieve the notification 
CleverPush.shared.setNotificationReceivedHandler((CPNotificationReceivedResult result) {
      print("Notification received: \n${result.notification.jsonRepresentation()}");
});

// Get the notification callback once you open the notification
CleverPush.shared.setNotificationOpenedHandler((CPNotificationOpenedResult result) {
      print("Notification opened: \n${result.notification.jsonRepresentation()}");
});

// Get all the recieved notification
var notifications = await CleverPush.shared.getNotifications();

// get remote notification and local notification based on the boolean argument.
// - if you pass boolean argument YES you will get the list of remote notification else you will get the locally stored notification.
bool combineWithApi = true;
var remoteNotifications = await CleverPush.shared.getNotificationsWithApi(combineWithApi);
```

## App Banners

```dart
CleverPush.shared.setAppBannerOpenedHandler((CPAppBannerAction action) {
      print("Banner action URL: \n${action.url}");
});
```

### showAppBanner

(Available from version 1.23.24)

You can also show one banner by its ID (we recommend app banner events for production usage)

```dart
CleverPush.shared.showAppBanner("APP_BANNER_ID");
```

You can show one banner by its ID and listen when it is closed (we recommend app banner events for production usage)

```dart
CleverPush.shared.showAppBanner("APP_BANNER_ID", () {
    print("APP BANNER CLOSED");
});
```

## Tracking Consent

You can optionally require a tracking consent from the user (e.g. you get this consent from a CMP). If you tell our SDK to wait for the tracking consent, it will not call any tracking-related features until the consent is available. Calls will be queued and automatically executed until the consent is available.

Step 1: Call this before initializing the SDK:

```dart
CleverPush.shared.setTrackingConsentRequired(true);
```

Step 2: Call this when the user gave his consent (needs to be called on every launch):

```dart
CleverPush.shared.setTrackingConsent(true);
```

## Authorization Token

You can set an authorization token that will be used in an API call.

```dart
CleverPush.shared.setAuthorizerToken('YOUR_AUTH_TOKEN_HERE');
```
