---
id: methods
title: Methods
---

### Usage

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
    CleverPush.init('YOUR_CHANNEL_ID_HERE');
    
    // optionally, you can disable the automatic push prompt with 'autoRegister: false':
    CleverPush.init('YOUR_CHANNEL_ID_HERE', {
      autoRegister: false
    });

    CleverPush.addEventListener('opened', this.onOpened);
    CleverPush.addEventListener('received', this.onReceived);
    CleverPush.addEventListener('subscribed', this.onSubscribed);
  }

  componentWillUnmount() {
    CleverPush.removeEventListener('opened', this.onOpened);
    CleverPush.removeEventListener('received', this.onReceived);
    CleverPush.removeEventListener('subscribed', this.onSubscribed);
  }

  onReceived(receiveResult) {
    console.log('Notification received:', receiveResult);
  }

  onOpened(openResult) {
    console.log('Notification opened:', openResult);
  }

  onSubscribed(subscriptionId) {
    console.log('Subscribed with ID:', subscriptionId);
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


Get Subscription status:

```javascript
CleverPush.isSubscribed((err, isSubscribed) => {
  console.log(isSubscribed); // true
});
```


Subscribe:

```javascript
CleverPush.subscribe();
```


Unsubscribe:

```javascript
CleverPush.unsubscribe();
```


Tagging and Attributes:

```javascript
CleverPush.getAvailableTags((err, channelTags) => {
  console.log(channelTags); // [{ id: "tag1", name: "Tag 1" }]
});
CleverPush.getAvailableAttributes((err, customAttributes) => {
  console.log(customAttributes); // [{ id: "attribute1", name: "Attribute 1" }]
});

CleverPush.getSubscriptionTags((err, tagIds) => {
  console.log(tagIds); // ["tag_id_1", "tag_id_2"]
});
CleverPush.getSubscriptionAttributes((err, attributes) => {
  console.log(attributes); // { attribute1: "value1", attribute2: "value2" }
});

CleverPush.addSubscriptionTag("tag_id");
CleverPush.removeSubscriptionTag("tag_id");
CleverPush.setSubscriptionAttribute("user_id", "1");

CleverPush.hasSubscriptionTag("tag_id", (err, hasTag) => {
  console.log(hasTag); // false
});
CleverPush.getSubscriptionAttribute("user_id", (err, attributeValue) => {
  console.log(attributeValue); // "value"
});
CleverPush.setSubscriptionAttribute("user_id", "1");

CleverPush.setSubscriptionLanguage("de"); // iso language code
CleverPush.setSubscriptionCountry("DE"); // iso country code
```


Get received notifications:

```javascript
CleverPush.getNotifications((err, notifications) => {
  console.log(notifications);
});
```
