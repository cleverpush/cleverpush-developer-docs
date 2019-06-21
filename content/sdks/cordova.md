+++
description = ""
title = "Cordova SDK"
date = "2017-04-10T16:43:08+01:00"
draft = false
weight = 200
bref=""
toc = true
+++

### Intallation

1. Add the required Cordova plugin

   {{< highlight bash >}}cordova plugin add cleverpush-cordova-sdk{{< /highlight >}}


2. Add the initialization code to your `index.js` file

   {{< highlight javascript >}}
   document.addEventListener('deviceready', function () {
     var notificationOpenedCallback = function(data) {
       console.log('notificationOpenedCallback:', JSON.stringify(data));
     };
     var subscribedCallback = function(subscriptionId) {
       console.log('subscriptionId:', subscriptionId);
     };

     window.plugins.CleverPush.init("INSERT_YOUR_CHANNEL_ID", notificationOpenedCallback, subscribedCallback);
   }, false);
   {{< /highlight >}}

   Be sure to replace `INSERT_YOUR_CHANNEL_ID` with your CleverPush channel ID (can be found in the channel settings).
   
