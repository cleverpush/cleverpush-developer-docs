---
id: methods
title: Methods
---

### Usage

Add the initialization code to your `index.js` file

   ```javascript
   document.addEventListener('deviceready', function () {
     var notificationOpenedCallback = function(data) {
       console.log('notificationOpenedCallback:', JSON.stringify(data));
     };
     var subscribedCallback = function(subscriptionId) {
       console.log('subscriptionId:', subscriptionId);
     };

     window['plugins'].CleverPush.init("INSERT_YOUR_CHANNEL_ID", notificationOpenedCallback, subscribedCallback);
   }, false);
   ```

   Be sure to replace `INSERT_YOUR_CHANNEL_ID` with your CleverPush channel ID (can be found in the channel settings).
   
   If you are using Ionic, you can use platform.ready() instead of deviceready like this:
   
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
         var notificationOpenedCallback = function(data) {
           console.log('notificationOpenedCallback:', JSON.stringify(data));
         };
         var subscribedCallback = function(subscriptionId) {
           console.log('subscriptionId:', subscriptionId);
         };
   
         window['plugins'].CleverPush.init("INSERT_YOUR_CHANNEL_ID", notificationOpenedCallback, subscribedCallback);
       });
     }
   }
   ```
