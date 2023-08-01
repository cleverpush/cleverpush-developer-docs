---
id: methods
title: Methods
---

## Initialization

Add the initialization code like this:

```javascript
import CleverPush from 'cleverpush-capacitor-sdk';

const Home: React.FC = () => {
  useEffect(() => {
    const subscribedListener = ({ subscriptionId }) => {
      console.log('CleverPush subscriptionId:', subscriptionId);
    };

    const notificationReceivedListener = ({ notification }) => {
      console.log('CleverPush notification received:', JSON.stringify(notification));
    };

    const notificationOpenedListener = ({ notification }) => {
      console.log('CleverPush notification opened:', JSON.stringify(notification));
    };

    CleverPush.addListener('subscribed', subscribedListener);
    CleverPush.addListener('notificationReceived', notificationReceivedListener);
    CleverPush.addListener('notificationOpened', notificationOpenedListener);

    // set this to `false` to prevent the SDK from automatically subscribing the user on the first launch of the SDK
    const autoRegister = true;

    // You can get the Channel ID from your CleverPush channel settings
    CleverPush.init({
      channelId: "INSERT_YOUR_CHANNEL_ID",
      autoRegister: autoRegister
    });
  }, []);
};
```

## Basic usage


Subscribe:
```javascript
CleverPush.subscribe().then(({ subscriptionId }) => {

});
```

Unsubscribe:
```javascript
CleverPush.unsubscribe();
```

Check if subscribed:
```javascript
CleverPush.isSubscribed().then(({ isSubscribed }) => {
  
});
```

Get Subscription ID (after subscribe)
```javascript
CleverPush.getSubscriptionId().then(({ subscriptionId }) => {
  
});
```


## App Banners

This listener will be called when a button in an app banner is clicked.

```javascript
const appBannerOpenedListener = (subscriptionId) => {
  console.log('CleverPush subscriptionId:', subscriptionId);
};

CleverPush.addListener('appBannerOpened', appBannerOpenedListener);
```

## Automatic Tag Assignment

The SDK can also automatically assign tags by using the `trackPageView` method. In simple cases you can just give the method a URL. In the CleverPush backoffice you can then set trigger the tags by matching URL Pathname RegExes. You can optionally also set combinations of min. visits, seconds or sessions for this tag.

Let's say you have created a tag with the URL pathname regex "/sports". This would trigger the tag for a subscriber:


<!--DOCUSAURUS_CODE_TABS-->

<!--JavaScript-->

```javascript
CleverPush.trackPageView({ url: "https://..." })
```

<!--END_DOCUSAURUS_CODE_TABS-->


## Tags

<!--DOCUSAURUS_CODE_TABS-->

<!--JavaScript-->

```javascript
// add subscription tag
CleverPush.addSubscriptionTag({ tagId: "" })
```

```javascript
// remove subscription tag
CleverPush.removeSubscriptionTag({ tagId: "" })
```

```javascript
// check subscription tag exists or not
const hasTag = await CleverPush.hasSubscriptionTag({ tagId: "" })
```

```javascript
// get subscription tags
const tags = CleverPush.getSubscriptionTags()
```

```javascript
// set setSubscription topics
CleverPush.setSubscriptionTopics({ topics: ["", ""] })
```

```javascript
// get subscription topics
const topics = await CleverPush.getSubscriptionTopics()
```

```javascript
// get available topics
const availableTopics = await CleverPush.getAvailableTopics()
```

<!--END_DOCUSAURUS_CODE_TABS-->


## Get received notifications:

<!--DOCUSAURUS_CODE_TABS-->

<!--JavaScript-->

```javascript
const { notifications } = await CleverPush.getNotifications();
```

<!--END_DOCUSAURUS_CODE_TABS-->
