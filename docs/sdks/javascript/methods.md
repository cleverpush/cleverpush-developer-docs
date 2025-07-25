---
id: methods
title: Methods
---


## General


#### <code>triggerOptIn</code>

Triggers the opt-in dialog.
The appearance of the dialog and timing settings can be changed in your CleverPush account under `Channels / Select channel / Settings / Opt-In`.

```js
CleverPush = window.CleverPush || [];
CleverPush.push(['triggerOptIn', function(err, subscriptionId) {
    if (err) {
        console.error(err);
    } else {
        console.log('successfully subscribed with id', subscriptionId);
    }
}]);

// Set the second parameter to 'true' to skip the opt-in timeout.
// It will also show the opt-in if the user has previously denied or unsubscribed.
CleverPush.push(['triggerOptIn', true, ...]);
```

#### <code>subscribe</code>

Forces a subscription and shows the opt-in dialog immediately, if the user is not subscribed, yet. Callback is required.
Only show this in reaction to a user interaction. Otherwise please use `triggerOptIn` and specify `true` as first parameter to force the opt-in

```js
CleverPush = window.CleverPush || [];
CleverPush.push(['subscribe', function(err, subscriptionId) {
    if (err) {
        console.log('CleverPush Subscription Error:');
        console.warn(err);
    } else {
        console.log('CleverPush Subscription was successful with ID', subscriptionId);
    }
}]);
```


#### <code>isSubscribed</code>

Checks if the user is subscribed to push notifications.

```js
CleverPush = window.CleverPush || [];
CleverPush.push(['isSubscribed', function(result) {
  console.log('CleverPush isSubscribed result', result); // true or false
}]);
```


#### <code>unsubscribe</code>

Unsubscribes a subscribed user.

```js
CleverPush = window.CleverPush || [];
CleverPush.push(['unsubscribe']);
```


#### <code>getSubscriptionId</code>

Gets the current subscription ID.
Will return false otherwise

```js
CleverPush = window.CleverPush || [];
CleverPush.push(['getSubscriptionId', function(subscriptionId) {
    console.log('CleverPush Subscription ID', subscriptionId);
}]);
```

#### <code>getNotifications</code>

Get the received notifications of a subscriber or the last 50 notifications that were sent if not subscribed

```js
CleverPush = window.CleverPush || [];
CleverPush.push(['getNotifications', function (notifications) {
    console.log('getNotifications', notifications);
}]);
```

## Tags


#### <code>tagSubscription</code>

Tags an existing subscription.
You can also find your personal tagging codes in your CleverPush account under `Channels / Select channel / Settings / Tags`.

```js
CleverPush = window.CleverPush || [];
CleverPush.push(['tagSubscription', 'INSERT_TAG_ID']);
```


#### <code>untagSubscription</code>

Untags an existing subscription.

```js
CleverPush = window.CleverPush || [];
CleverPush.push(['untagSubscription', 'INSERT_TAG_ID']);
```


#### <code>getTags</code>

Get a user's subscribed tags.
This method automatically waits for an active subscription to be available before being executed.

```js
CleverPush = window.CleverPush || [];
CleverPush.push(['getTags', function (err, tags) {
  console.log(tags);
}]);
```


## Topics


#### <code>setTopics</code>

Programmatically sets the user's topics. This is not recommended, because tags should be used for automatic segmetation. Topics should only be managed by the user itself (via the notification bell panel, opt-in or content widget).
This method automatically waits for an active subscription to be available before being executed.

```js
CleverPush = window.CleverPush || [];
CleverPush.push(['setTopics', ['TOPIC_ID_1', 'TOPIC_ID_2', '...']]);
```


#### <code>getTopics</code>

Get a user's subscribed topics.
This method automatically waits for an active subscription to be available before being executed.

```js
CleverPush = window.CleverPush || [];
CleverPush.push(['getTopics', function (err, topics) {
  console.log(topics);
}]);
```


## Attributes (single value)


#### <code>setAttribute</code>

Set's a custom subscription attribute. The attribute needs to be created in the channel settings first. Call this method with the attribute's ID and the desired value afterwards.

```js
CleverPush = window.CleverPush || [];
CleverPush.push(['setAttribute', 'ATTRIBUTE_ID', 'VALUE']);
```


#### <code>getAttribute</code>

Gets custom subscription attribute.

```js
CleverPush = window.CleverPush || [];
CleverPush.push(['getAttribute', 'ATTRIBUTE_ID', function(value) {
    console.log(value);
}]);
```


#### <code>hasAttribute</code>

Check if subscription has attribute set.

```js
CleverPush = window.CleverPush || [];
CleverPush.push(['hasAttribute', 'ATTRIBUTE_ID', function(value) {
    console.log(value);
}]);
```

#### <code>incAttribute</code>

Increment a numeric attribute value. If the value not exists, it will set it to the specified number.

```js
CleverPush = window.CleverPush || [];
CleverPush.push(['incAttribute', 'ATTRIBUTE_ID', 1, function() {
    // completed
}]);
```


## Attributes (multi value)

You can add special multi value attributes at CleverPush (e.g. categories, products).


#### <code>hasAttributeValue</code>

Check if you have an attribute value.

```js
CleverPush = window.CleverPush || [];
CleverPush.push(['hasAttributeValue', 'ATTRIBUTE_ID', 'VALUE', function(result) {
    console.log('has attribute value:', result);
}]);
```


#### <code>pushAttributeValue</code>

Push an attribute value to the array.

```js
CleverPush = window.CleverPush || [];
CleverPush.push(['pushAttributeValue', 'ATTRIBUTE_ID', 'VALUE', function() {
    // completed
}]);
```


#### <code>pullAttributeValue</code>

Pull an attribute value from the array.

```js
CleverPush = window.CleverPush || [];
CleverPush.push(['pullAttributeValue', 'ATTRIBUTE_ID', 'VALUE', function() {
    // completed
}]);
```



## Web Banners


#### <code>showWebBannerById</code>

Shows an existing web banner by its ID.

```js
CleverPush = window.CleverPush || [];
CleverPush.push(['showWebBannerById', 'BANNER_ID']);
```


<br/>



## Events


#### <code>trackEvent</code>

Tracks a conversion Event
The last argument are the event properties, which are completely optional. You can specify any parameters and use them in your follow-up notification templates.

```js
CleverPush = window.CleverPush || [];
CleverPush.push(['trackEvent', 'EVENT_NAME', { ... }]);
```


<br/>



## Follow ups


#### <code>triggerFollowUpEvent</code>

*Deprecated: Use `trackEvent` instead to trigger Follow-ups via Events.*

Triggers a follow-up campaign event.
You can also find the full event code in your CleverPush account under `Channels / Select channel / Follow-up campaigns`.
Insert the desired follow-up campaign ID and the event name.
The last argument are the event's parameters, which are completely optional. You can specify any parameters and use them in your follow-up notification templates.

```js
CleverPush = window.CleverPush || [];
CleverPush.push(['triggerFollowUpEvent', 'INSERT_FOLLOW_UP_CAMPAIGN_ID', 'EVENT_NAME', { productAmount: 2500.00, productName: 'iMac' }]);
```


<br/>


## Initialization event

You can listen for the global initialization event.
This is very useful if you want to check if the current browser support Web Push notifications and then show a button to manually trigger the opt-in dialog.

Will fail if:
* Browser does not support push notifications
* There is no connection to our API available
* SDK was already initialized

Always make sure to insert this BEFORE your personal CleverPush loader code (`<script src="https://static.cleverpush.com/channel/loader/XXXXXX.js" async></script>`). If this is not possible, you need to check, if CleverPush was already initialized (see the code below).

Example:

```js
var showPushOptIn = function() {
    document.getElementById('cleverpush-button').style.display = 'block';
}

if (!window.CleverPush || !window.CleverPush.initialized) {
    window.cleverPushInitCallback = function(err) {
        if (err) {
            console.error('Init callback error:', err);
        } else {
            showPushOptIn();
        }
    };
} else {
    showPushOptIn();
}
```


## Subscription Events

Several subscription events can be listened for with one of the following methods (can only be called after successful initialization, see above):

```js
// will trigger always
CleverPush.on(event, callback);
// will trigger only once
CleverPush.once(event, callback);
```

`event` can be:

* 'initialized' (after successful initialization)
* 'subscribed' (after successful opt-in)
* 'unsubscribed' (after successful opt-out)
* 'bellReady' (when subscription bell can be shown)
* 'optInShown' (when opt-in prompt has been shown)
* 'panelShown' (when sidebar panel is shown after click on the bell)
* 'topicsSet' (when user has saved the preferred topics)
* 'optInClosed' (when user has manually closed the opt-in layer via the X - not the native opt-in itself)


## Chat

1. Additionally to the general CleverPush script, include the following script:

```html
<script src="https://static.cleverpush.com/sdk/cleverpush-chat.js"></script>
```

2. Place this empty div where you want the chat to appear:

```html
<div class="cleverpush-chat-target"></div>
```


## Wallet Passes


`generateWalletPass(walletPassId, options, callback)`

This method can generate individual Wallet Pass subscriptions.

Arguments:
* walletPassId: Die Wallet Pass ID, kann aus dem letzten Teil der URL auf der Pass-Bearbeiten Seite entnommen werden
* options: Optionally, you can set topics, tags or attributes here.
* callback: The callback will be called with an error as a first argument and if successful the pass URL as the second argument.

Example:
```javascript
CleverPush.generateWalletPass(walletPassId, {
  customAttributes: {
    user_id: '123'
  },
  tags: ['TAG_ID'],
  topics: ['TOPIC_ID'],
}, (error, passUrl) => {
  location.href = passUrl;
});
```


## Authorizer Webhook


This method can set your Authorization_Token for the channels where Authorizer Webhook is enabled.

`ClevePush.setAuthorizerToken("YOUR_AUTH_TOKEN_HERE")`

`YOUR_AUTH_TOKEN_HERE` can be used to: 

1. Add or Remove attributes
2. Add or Remove tags
3. Add or Remove topics
