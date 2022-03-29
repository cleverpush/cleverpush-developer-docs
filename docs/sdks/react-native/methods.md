---
id: methods
title: Methods
---

## Usage

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


Topics:
```javascript
CleverPush.showTopicsDialog();
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


## Automatic Tag Assignment

The SDK can also automatically assign tags by using the `trackPageView` method. In simple cases you can just give the method a URL. In the CleverPush backoffice you can then set trigger the tags by matching URL Pathname RegExes. You can optionally also set combinations of min. visits, seconds or sessions for this tag.

Let's say you have created a tag with the URL pathname regex "/sports". This would trigger the tag for a subscriber:

```csharp
CleverPush.trackPageView("https://example.com/sports/article-123123");
```

We can also have more advanced use cases here by using Javascript functions for matching. For example you created a tag with the following function in the CleverPush backend: `params.category === "sports"`. This would then trigger the tag for a subscriber:

```csharp
CleverPush.trackPageView("https://example.com/anything", { "category", "sports" });
```

Once the `trackPageView` method has been implemented you can set up all the tags dynamically in the CleverPush backend without touching your code.




Get received notifications:

```javascript
CleverPush.getNotifications((err, notifications) => {
  console.log(notifications);
});
```
