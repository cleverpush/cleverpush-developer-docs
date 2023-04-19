---
id: methods
title: Methods
---

## Initialization

Add the initialization code like this:

```javascript
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
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
