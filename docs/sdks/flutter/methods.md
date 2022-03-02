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
CleverPush.shared.subscribe();

// unsubscribe 
CleverPush.shared.unsubscribe();

// Get the subscription success callback with subscriptionId 
CleverPush.shared.setSubscribedHandler((subscriptionId) {
      print("Subscribed: ${subscriptionId}");
});

// Get the subscription status by execute the following code
CleverPush.shared.isSubscribed().then((status) {
  console.log(status);
});
```

### Hide Foreground Notifications (Android)

```dart
CleverPush.shared.setShowNotificationsInForeground(false);
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

// get all the available tags
var availableTags = await CleverPush.shared.getAvailableTags();
```

## Attributes
```dart
// get all the subscription attributes
var subscriptionAttributes = await CleverPush.shared.getSubscriptionAttributes();

// set attribute values by their ID
CleverPush.shared.setSubscriptionAttribute('ATTRIBUTE_ID', 'ATTRIBUTE_VALUE');
var attributeValue = await CleverPush.shared.getSubscriptionAttribute('ATTRIBUTE_ID');

// get all the available attributes
var availableAttributes = await CleverPush.shared.getAvailableAttributes();
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