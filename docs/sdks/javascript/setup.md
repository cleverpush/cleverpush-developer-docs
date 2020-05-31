---
id: setup
title: Setup
---

We provide several JavaScript methods to make the integration into your website even easier.


Calls to the SDK are all made via an array-like push method. This ensures that also calls which are made before the Script even loads are added to a queue.

Please make sure that your personal CleverPush code is implemented on every site (`<script src="https://static.cleverpush.com/channel/loader/XXXXXX.js" async></script>`).

Example:

```js
CleverPush = window.CleverPush || [];
CleverPush.push(['triggerOptIn']);
```
