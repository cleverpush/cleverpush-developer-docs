---
id: methods
title: Methods
---

## Usage

To initialize the CleverPush SDK, use the following method.

CLEVERPUSH_CHANNEL_ID (String): Your unique CleverPush channel ID. This ID is required to link the app with your CleverPush account.

received: A listener that handles the event when a notification is received. The notificationReceived method is triggered with a NotificationOpenedResult object containing the details of the received notification. It fires when notifications have been received.

opened: A listener that handles the event when a notification is opened. The notificationOpened method is triggered with a NotificationOpenedResult object containing the details of the opened notification. It fires when notifications have been opened.

subscribed: A listener that handles the event when a user subscribes. The subscribed method is triggered with the subscriptionId. it fires when the user has successfully been subscribed.

Basic Example:

```jsx
import React from 'react';
import { Text, View } from 'react-native';
import CleverPush from 'cleverpush-react-native';

export default class App extends React.Component {
  constructor() {
    super();

    this.onOpened = this.onOpened.bind(this);
    this.onReceived = this.onReceived.bind(this);
    this.onSubscribed = this.onSubscribed.bind(this);
  }
  
  componentWillMount() {
    CleverPush.init('CLEVERPUSH_CHANNEL_ID');
    
    // optionally, you can disable the automatic push prompt with 'autoRegister: false':
    /*
    CleverPush.init('CLEVERPUSH_CHANNEL_ID', {
      autoRegister: false
    });
    */

    CleverPush.addEventListener('opened', this.onOpened);
    CleverPush.addEventListener('received', this.onReceived);
    CleverPush.addEventListener('subscribed', this.onSubscribed);
  }

  componentWillUnmount() {
    CleverPush.removeEventListener('opened', this.onOpened);
    CleverPush.removeEventListener('received', this.onReceived);
    CleverPush.removeEventListener('subscribed', this.onSubscribed);
  }

  onReceived({ notification }) {
    console.log('Notification received:', notification);
  }

  onOpened({ notification }) {
    console.log('Notification opened:', notification);
    /*
    Example notification:

    {
      "_id": "Notification ID",
      "url": "https://example.com",
      "title": "Title…",
      "text": "Text…",
      "mediaUrl": "Image URL…",
      "customData": {
        "key": "value…"
      }
    }
    */
  }

  onSubscribed({ id }) {
    console.log('Subscribed with ID:', id);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}
```


## Subscribe / Unsubscribe

Subscribe:

```javascript
CleverPush.subscribe();
```

Unsubscribe:

```javascript
CleverPush.unsubscribe();
```

Get Subscription status:

```javascript
CleverPush.isSubscribed((err, isSubscribed) => {
  console.log(isSubscribed); // true
});
```

Get SubscriptionId:

```javascript
CleverPush.getSubscriptionId((err, subscriptionId) => {
  console.log('Subscription ID:', subscriptionId);
});
```


## Auto Resubscribe

You can perform auto resubscribe whenever app open if the user has given notification permission and subscriptionId is null.

Default `autoResubscribe` value is `false`. By seting `autoResubscribe` value to `true` whenever app open it checks that the user has given notification permission and subscriptionId is null then perform subscribe. 

```javascript
CleverPush.setAutoResubscribe(true);
```


## Check notification permission

Check if notification permission is given:

```javascript
CleverPush.areNotificationsEnabled((err, notificationsEnabled) => {
  console.log(notificationsEnabled); // true
});
```


## Topics

```javascript
CleverPush.showTopicsDialog();

CleverPush.getAvailableTopics((err, topics) => {
  if (err) {
    console.error('Error fetching available topics:', err);
  } else {
    console.log('Available Topics:', topics);
  }
});

CleverPush.getSubscriptionTopics((err, subscribedTopics) => {
  if (err) {
    console.error('Error fetching subscribed topics:', err);
  } else {
    console.log('Subscribed Topics:', subscribedTopics);
  }
});

CleverPush.setSubscriptionTopics(['TOPIC_ID1', 'TOPIC_ID2']);

CleverPush.addSubscriptionTopic('TOPIC_ID');

CleverPush.removeSubscriptionTopic('TOPIC_ID');
```


## Tags

```javascript
CleverPush.getAvailableTags((err, channelTags) => {
  console.log(channelTags); // [{ id: "tag1", name: "Tag 1" }]
});

CleverPush.getSubscriptionTags((err, tagIds) => {
  console.log(tagIds); // ["tag_id_1", "tag_id_2"]
});

CleverPush.addSubscriptionTag("tag_id");

CleverPush.removeSubscriptionTag("tag_id");

CleverPush.hasSubscriptionTag("tag_id", (err, hasTag) => {
  console.log(hasTag); // false
});
```


## Attributes

```javascript
CleverPush.getAvailableAttributes((err, customAttributes) => {
  console.log(customAttributes); // [{ id: "attribute1", name: "Attribute 1" }]
});

CleverPush.getSubscriptionAttributes((err, attributes) => {
  console.log(attributes); // { attribute1: "value1", attribute2: "value2" }
});

CleverPush.setSubscriptionAttribute("user_id", "1");

CleverPush.getSubscriptionAttribute("user_id", (err, attributeValue) => {
  console.log(attributeValue); // "value"
});
```


## Country & Language

You can optionally override the country & language which is automatically detected from the system and can be used for targeting / translations.

```javascript
CleverPush.setSubscriptionLanguage("de"); // iso language code

CleverPush.setSubscriptionCountry("DE"); // iso country code
```


## Automatic Tag Assignment

The SDK can also automatically assign tags by using the `trackPageView` method. In simple cases you can just give the method a URL. In the CleverPush backoffice you can then set trigger the tags by matching URL Pathname RegExes. You can optionally also set combinations of min. visits, seconds or sessions for this tag.

Let's say you have created a tag with the URL pathname regex "/sports". This would trigger the tag for a subscriber:

```javascript
CleverPush.trackPageView("https://example.com/sports/article-123123");
```

We can also have more advanced use cases here by using Javascript functions for matching. For example you created a tag with the following function in the CleverPush backend: `params.category === "sports"`. This would then trigger the tag for a subscriber:

```javascript
CleverPush.trackPageView("https://example.com/anything", { "category", "sports" });
```

Once the `trackPageView` method has been implemented you can set up all the tags dynamically in the CleverPush backend without touching your code.


## Event Tracking

Events can be used to track conversions or trigger app banners.

```javascript
CleverPush.trackEvent("EVENT NAME");

// Track an event with custom properties
CleverPush.trackEvent('EVENT NAME', {
  'property_1': 'value',
  'property_2': 'value',
});
```


## Get received notifications:

```javascript
CleverPush.getNotifications((err, notifications) => {
  console.log(notifications);
});
```


## Development mode

You can enable the development mode to disable caches for app banners, so you always see the most up to date version.

```javascript
CleverPush.enableDevelopmentMode();
```


## Geo Fencing

For using Geo Fencing you need to request the location permission from the user.

```javascript
CleverPush.requestLocationPermission();
```


### Show/Hide Foreground Notifications

(Available from version 1.7.5)

```javascript
CleverPush.setShowNotificationsInForeground(true);
```
