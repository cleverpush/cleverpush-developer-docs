---
id: methods
title: Methods
---

## Basic Usage

To initialize the CleverPush SDK, use the following method.

**CLEVERPUSH_CHANNEL_ID (String)**: Your unique CleverPush channel ID. This ID is required to link the app with your CleverPush account.

**setInitializedHandler**: A listener that handles the event when the CleverPush SDK initialization is completed. Returns success (bool) and an optional failureMessage (String?) if initialization fails.

**setNotificationReceivedHandler**: A listener that handles the event when a notification is received. The notificationReceived method is triggered with a CPNotificationReceivedResult object containing the details of the received notification. It fires when notifications have been received.

**setNotificationOpenedHandler**: A listener that handles the event when a notification is opened. The notificationOpened method is triggered with a CPNotificationReceivedResult object containing the details of the opened notification. It fires when notifications have been opened.

**setSubscribedHandler**: A listener that handles the event when a user subscribes. The subscribed method is triggered with the subscriptionId. it fires when the user has successfully been subscribed.


```dart
import 'package:cleverpush_flutter/cleverpush_flutter.dart';

CleverPush.shared.setNotificationReceivedHandler((CPNotificationReceivedResult result) {
      print("Notification received: \n${result.notification!.jsonRepresentation().replaceAll("\\n", "\n")}");
});

CleverPush.shared.setNotificationOpenedHandler((CPNotificationOpenedResult result) {
      print("Notification opened: \n${result.notification!.jsonRepresentation().replaceAll("\\n", "\n")}");
});

// Get the subscription success callback with subscriptionId 
CleverPush.shared.setSubscribedHandler((subscriptionId) {
      print("Subscribed: ${subscriptionId}");
});

CleverPush.shared.setInitializedHandler((bool success, String? failureMessage) {
      if (success) {
            print("Initialized successfully");
            _debugLabelString = "Initialized successfully";
      } else {
            print("Initialization failed: " + (failureMessage ?? "Unknown error"));
      }
});

// init with autoRegister:false to manually subscribe later
await CleverPush.shared.init("CLEVERPUSH_CHANNEL_ID", false);

// init with autoRegister:true to automatic subscribe 
await CleverPush.shared.init("CLEVERPUSH_CHANNEL_ID", true);
```

### Show/Hide Foreground Notifications

```dart
CleverPush.shared.setShowNotificationsInForeground(false);
```

## Subscribe / Unsubscribe

Subscribe:

```dart
// subscribe 
await CleverPush.shared.subscribe();
```

Get SubscriptionId:

```dart
var subscriptionId = await CleverPush.shared.getSubscriptionId();
```

Get Subscription status:

```dart
CleverPush.shared.isSubscribed().then((status) {
  console.log(status);
});
```

Unsubscribe:

```dart
// unsubscribe 
await CleverPush.shared.unsubscribe();
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

### Disabling/Enabling App Banners

App banners are enabled by default.

You can temporarily disable app banners, for example during a splash screen or while navigating between screens.

If a banner is triggered while banners are disabled, it will be added to an internal queue and automatically displayed once `enableAppBanners()` is called.

```dart
CleverPush.shared.disableAppBanners();
CleverPush.shared.enableAppBanners();
```

### Development mode

You can enable Development Mode to temporarily disable app banner caching.

This ensures that you always see the most up-to-date version of app banners during development and testing.

```dart
CleverPush.shared.enableDevelopmentMode();
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

## Remove Notification

(Available from version 1.23.30)

**Remove a notification stored locally**

You can remove a notification from local storage using its notification ID:


```dart
CleverPush.shared.removeNotification('notificationId');
```

**Remove a notification from local storage and the notification center**

You can remove a notification from both local storage and the notification center by setting removeFromNotificationCenter to true:

```dart
CleverPush.shared.removeNotification(
  notificationId,
  removeFromNotificationCenter: true,
);
```

**Clear all notifications from the notification center**

You can remove all notifications from the notification center only (this does not clear locally stored notifications):

```dart
CleverPush.shared.clearNotificationsFromNotificationCenter();
```

**Remove all notifications from local storage**

(Available from version 1.23.31)

You can remove all notifications stored locally using the following method (this does not clear any notifications from notification center):

```dart
CleverPush.shared.removeAllNotifications();
```

## Handle Universal Links In App (iOS)

(Available from version 1.23.30)

### Set domains for handling universal links in app

You can specify which domains should be handled as universal links inside the app instead of passing them to the system. Pass an array of domain strings. When a URL’s domain matches one of these domains, it will be delivered to your app as an in-app universal link.

```dart
CleverPush.shared.setHandleUniversalLinksInAppForDomains([
  'domain1.com',
  'domain2.com',
  'cleverpush.com',
]);
```

### Get domains for handling universal links in app

You can retrieve the list of domains that are currently configured to handle universal links inside the app. Returns `null` if no domains have been set.

```dart
final List<String>? domains = await CleverPush.shared.getHandleUniversalLinksInAppForDomains();
```

**Note:** These methods are iOS-only. On Android they have no effect; `getHandleUniversalLinksInAppForDomains` returns `null`.
