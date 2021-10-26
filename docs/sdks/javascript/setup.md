---
id: setup
title: Setup
---

## Requirements – if not already done:

1. Create a user account at cleverpush.com/register
2. After logging in, create a channel and *Web Push* platform inside it


## Implementation

Please navigate to Channels -> (select channel) in your CleverPush back office.
There you will find the operation mode setting. Set this option to Own Domain (HTTPS).
The cleverpush-worker.js file can then be downloaded by clicking the button.
This file must now be placed in the main directory of your web server. So it should be available at https://your-domain.com/cleverpush-worker.js.Note: If you do not have the option of placing the file in the main directory of your website, you can define your own file paths under the operating mode setting.
Now only the CleverPush Javascript snippet has to be integrated. The code for this is available in the channel settings in the sidebar under “Implementation”.This can be done in the <head> or in the <body> area of ​​the page.
Google Tag Manager is also possible (with occasional ad blockers blocking the entire GTM code).
In the Google Tag Manager, our Javascript code can easily be inserted as a “user-defined HTML tag”.

 

## Troubleshooting – opt-in does not work:

* Can the worker file be reached with the correct MIME type?
  * cleverpush-worker.js (application/javascript)
* Are you installing your own ServiceWorker yourself in parallel? There are 2 options:
  * Integrate the line of code from cleverpush-worker.js in your ServiceWorker and adapt the file path accordingly to your ServiceWorker
  * Install the CleverPush Worker in a different subdirectory
* When using your own file paths:
  * Paths should usually begin with a slash and do not contain any domains or protocols
  * Paths are absolute and not relative

## Using the SDK

A basic Web Push implementation does not neccesarily need to interact with our JavaScript SDK, as showing the opt-in works out of the box and can be configured in the CleverPush dashboard.

We provide several JavaScript methods to support deeper integrations into your website.

Calls to the SDK are all made via an array-like push method. This ensures that also calls which are made before the Script even loads are added to a queue.

Please make sure that your personal CleverPush code is implemented on every site (`<script src="https://static.cleverpush.com/channel/loader/XXXXXX.js" async></script>`).

Example method call:

```js
CleverPush = window.CleverPush || [];
CleverPush.push(['triggerOptIn']);
```

## Calling the SDK from iFrames

Sometimes, it's required to call some SDK methods not from the top frame but from a child iframe of the website. A common example is tracking a conversion or triggering a follow up campaign by doing so. This child iframe can post a message to the parent iframe and therefore interact with the CleverPush SDK.

It works by using `window.postMessage` with this data payload:
* `type`: `cleverpush`
* `method`: name of the CleverPush SDK method (see *Methods*)
* `arguments`: arguments to this method as an array


Example method call from iframe: 

```js
window.postMessage({ type: 'cleverpush', method: 'tagSubscription', arguments: ['METHOD_ARG_1', '...'] }, '*');
```
