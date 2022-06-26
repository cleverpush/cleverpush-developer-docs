---
id: methods
title: Methods
---

# Usage

## Cordova

Add the initialization code to your `index.js` file

```javascript
document.addEventListener('deviceready', () => {
  const notificationReceivedListener = (data) => {
    console.log('CleverPush notification received:', JSON.stringify(data));
  };

  const notificationOpenedListener = (data) => {
    console.log('CleverPush notification opened:', JSON.stringify(data));
  };

  const subscribedListener = (subscriptionId) => {
    console.log('CleverPush subscriptionId:', subscriptionId);
  };

  // set this to `false` to prevent the SDK from automatically subscribing the user on the first launch of the SDK
  const autoRegister = true;

  window.plugins.CleverPush.init(
    "INSERT_YOUR_CHANNEL_ID",
    notificationReceivedListener,
    notificationOpenedListener,
    subscribedListener,
    autoRegister
  );
}, false);
```

Be sure to replace `INSERT_YOUR_CHANNEL_ID` with your CleverPush channel ID (can be found in the channel settings).

## Capacitor

Add the initialization code like this:

```javascript
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
    // ...
        const notificationReceivedListener = (data) => {
          console.log('CleverPush notification received:', JSON.stringify(data));
        };

        const notificationOpenedListener = (data) => {
          console.log('CleverPush notification opened:', JSON.stringify(data));
        };

        const subscribedListener = (subscriptionId) => {
          console.log('CleverPush subscriptionId:', subscriptionId);
        };

        // set this to `false` to prevent the SDK from automatically subscribing the user on the first launch of the SDK
        const autoRegister = true;

        window.plugins.CleverPush.init(
          "INSERT_YOUR_CHANNEL_ID",
          notificationReceivedListener,
          notificationOpenedListener,
          subscribedListener,
          autoRegister
        );
      }, false);
    });
  }
}
```

## Notification Received Callback Listener

Instead of a regular `NotificationReceivedListener` you could also use a `NotificationReceivedCallbackListener`. This way you can dynamically control if you want to show a notification when the app is running in foreground:

```javascript
window['plugins'].CleverPush.setNotificationReceivedCallbackListener(function(data) {
  console.log('CleverPush notification received:', JSON.stringify(data));
  var showInForeground = true;
  window['plugins'].CleverPush.setNotificationReceivedCallbackResult(data.notification._id, showInForeground);
});
```

(Only supported on Android)


## App Banners

This listener will be called when a button in an app banner is clicked.

```javascript
window.plugins.CleverPush.setAppBannerOpenedListener((action) => {
  console.log('App Banner opened:', action);
});
```
