+++
description = ""
title = "JavaScript SDK"
date = "2017-04-10T16:43:08+01:00"
draft = false
weight = 200
bref=""
toc = true
+++

We provide several JavaScript methods to make the integration into your website even easier.


Calls to the SDK are all made via an array-like push method. This ensures that also calls which are made before the Script even loads are added to a queue.

Please make sure that your personal CleverPush code is implemented on every site (`<script src="https://static.cleverpush.com/channel/XXXXXX/loader.js" async></script>`).

Example:

{{< highlight js >}}
CleverPush = window.CleverPush || [];
CleverPush.push(['triggerOptIn']);
{{< /highlight >}}


### Methods

#### <code>triggerOptIn</code>

Triggers the opt-in dialog.
The appearance of the dialog and timing settings can be changed in your CleverPush account under `Channels / Select channel / Settings / Opt-In`.

{{< highlight js >}}
CleverPush = window.CleverPush || [];
CleverPush.push(['triggerOptIn', function(err, subscriptionId) {
    if (err) {
        console.error(err);
    } else {
        console.log('successfully subscribed with id', subscriptionId);
    }
}]);
{{< /highlight >}}

#### <code>subscribe</code>

Forces a subscription and shows the opt-in dialog immediately, if the user is not subscribed, yet. Callback is required.

{{< highlight js >}}
CleverPush = window.CleverPush || [];
CleverPush.push(['subscribe', function(err, subscriptionId) {
    if (err) {
        console.error(err);
    } else {
        console.log('successfully subscribed with id', subscriptionId);
    }
}]);
{{< /highlight >}}


#### <code>tagSubscription</code>

Tags an existing subscription.
You can also find your personal tagging codes in your CleverPush account under `Channels / Select channel / Settings / Tags`.

{{< highlight js >}}
CleverPush = window.CleverPush || [];
CleverPush.push(['tagSubscription', 'INSERT_TAG_ID']);
{{< /highlight >}}


#### <code>untagSubscription</code>

Untags an existing subscription.

{{< highlight js >}}
CleverPush = window.CleverPush || [];
CleverPush.push(['untagSubscription', 'INSERT_TAG_ID']);
{{< /highlight >}}


#### <code>setTopics</code>

Programmatically sets the user's topics. This is not recommended, because tags should be used for automatic segmetation. Topics should only be managed by the user itself (via the notification bell panel, opt-in or content widget).
This method automatically waits for an active subscription to be available before being executed.

{{< highlight js >}}
CleverPush = window.CleverPush || [];
CleverPush.push(['setTopics', ['TOPIC_ID_1', 'TOPIC_ID_2', '...']]);
{{< /highlight >}}


#### <code>getTopics</code>

Get a user's subscribed topics.
This method automatically waits for an active subscription to be available before being executed.

{{< highlight js >}}
CleverPush = window.CleverPush || [];
CleverPush.push(['getTopics', function (err, topics) {
  console.log(topics);
}]);
{{< /highlight >}}


#### <code>setAttribute</code>

Set's a custom subscription attribute. The attribute needs to be created in the channel settings first. Call this method with the attribute's ID and the desired value afterwards.

{{< highlight js >}}
CleverPush = window.CleverPush || [];
CleverPush.push(['setAttribute', 'ATTRIBUTE_ID', 'VALUE']);
{{< /highlight >}}


#### <code>isSubscribed</code>

Checks if the user is subscribed to push notifications.

{{< highlight js >}}
CleverPush = window.CleverPush || [];
CleverPush.push(['isSubscribed', function(result) {
  console.log('isSubscribed result', result); // true or false
}]);
{{< /highlight >}}


#### <code>unsubscribe</code>

Unsubscribes a subscribed user.

{{< highlight js >}}
CleverPush = window.CleverPush || [];
CleverPush.push(['unsubscribe']);
{{< /highlight >}}


#### <code>triggerFollowUpEvent</code>

Triggers a follow-up campaign event.
You can also find the full event code in your CleverPush account under `Channels / Select channel / Follow-up campaigns`.
Insert the desired follow-up campaign ID and the event name.
The last argument are the event's parameters, which are completely optional. You can specify any parameters and use them in your follow-up notification templates.

{{< highlight js >}}
CleverPush = window.CleverPush || [];
CleverPush.push(['triggerFollowUpEvent', 'INSERT_FOLLOW_UP_CAMPAIGN_ID', 'EVENT_NAME', { productAmount: 2500.00, productName: 'iMac' }]);
{{< /highlight >}}


<br/>


### Initialization event

You can listen for the global initialization event.
This is very useful if you want to check if the current browser support Web Push notifications and then show a button to manually trigger the opt-in dialog.

Will fail if:
* Browser does not support push notifications
* There is no connection to our API available
* SDK was already initialized

Always make sure to insert this BEFORE your personal CleverPush loader code (`<script src="https://static.cleverpush.com/channel/XXXXXX/loader.js" async></script>`). If this is not possible, you need to check, if CleverPush was already initialized (see the code below).

Example:

{{< highlight js >}}
var showPushOptIn = function() {
    document.getElementById('#cleverpush-button').style.display = 'block';
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
{{< /highlight >}}


### Subscription Events

Several subscription events can be listened for with one of the following methods (can only be called after successful initialization, see above):

{{< highlight js >}}
CleverPush.on(event, callback)
CleverPush.once(event, callback)
{{< /highlight >}}

`event` can be:

* 'SUBSCRIBED' (after successful opt-in)
* 'UNSUBSCRIBED' (after successful opt-out)



</section>


<section>
