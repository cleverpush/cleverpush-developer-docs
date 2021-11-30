---
id: methods
title: Methods
---

# Usage

## Cordova

Add the initialization code to your `index.js` file

```javascript
document.addEventListener('deviceready', function () {
  window['plugins'].CleverPush.setNotificationReceivedListener(function(data) {
    console.log('CleverPush notification received:', JSON.stringify(data));
  });

  window['plugins'].CleverPush.setNotificationOpenedListener(function(data) {
    console.log('CleverPush notification opened:', JSON.stringify(data));
  });

  window['plugins'].CleverPush.setSubscribedListener(function(subscriptionId) {
    console.log('CleverPush subscriptionId:', subscriptionId);
  });

  window['plugins'].CleverPush.init("INSERT_YOUR_CHANNEL_ID");
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
      window['plugins'].CleverPush.setNotificationReceivedListener(function(data) {
        console.log('CleverPush notification received:', JSON.stringify(data));
      });

      window['plugins'].CleverPush.setNotificationOpenedListener(function(data) {
        console.log('CleverPush notification opened:', JSON.stringify(data));
      });
    
      window['plugins'].CleverPush.setSubscribedListener(function(subscriptionId) {
        console.log('CleverPush subscriptionId:', subscriptionId);
      });

      window['plugins'].CleverPush.init("INSERT_YOUR_CHANNEL_ID");
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

(Only supported on Android)
