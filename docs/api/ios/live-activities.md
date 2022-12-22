---
id: live-activies
title: Live Activities (iOS 16)
---

![Live Activities](https://static.cleverpush.com/docs/live_activity_demo.gif)

Available in iOS SDK version 1.24.0+

## Register live activity with CleverPush API

API Endpoint: https://api.cleverpush.com/#api-Subscriptions-SyncSubscription

In Your IOS App code when we register new live activity there you will receive activity id and token <br />
Call following sync subscription api with activity id and token to register the activity

Note: Sync Live activity id and token with subscription endpoint whenever new live activity registered.

## Add custom attribute to your subscription to target live activities 
```
// You can set string values like this
[CleverPush setSubscriptionAttribute:@"ATTRIBUTE_ID" value:@"ATTRIBUTE_VALUE"];
```
Learn more [Attributes](https://developers.cleverpush.com/docs/sdks/ios/methods#attributes)

## Sync Subscription with Live activity id and token

```json
{
  "subscriptionId": "XXXXXXXXXXXXX",
  "iosLiveActivityId": "7EEA1D62-XXXX-XXXX-XXXX-EFEEE7D44125",
  "iosLiveActivityToken": "805787b***************************************46f06",
  ...
}
```

## Now send updates to your live actiivty with notification/send api endpoint with following payload

Your live activity contains data with content-state variables (title, message, driverName, estimatedDeliveryTime, can be whatever you want) <br />
We expecting here following payload to update an activity <br />

- [iosLiveActivityContentState](https://developer.apple.com/documentation/activitykit/activity/contentstate-swift.typealias)
  - The type alias for the structure that describes the dynamic content of a Live Activity.
  - Basically variables used in your live activity can be used here to update activity afterwards.
- [iosLiveActivityEvent](https://developer.apple.com/documentation/activitykit/updating-and-ending-your-live-activity-with-activitykit-push-notifications)
  - To update a Live Activity, set the value for the payload’s event key to update. To end a Live Activity, set it to end. If you end a Live Activity, include the final content state to make sure the Live Activity displays the latest data after it ends.
  - Available events **(update, end)**
- [type](https://api.cleverpush.com/#api-Notifications-SendNotification)
  - CleverPush notification type (**"iosLiveActivity"**)
- [iosLiveActivityDismissalDate](https://developer.apple.com/documentation/activitykit/activityuidismissalpolicy) (Optional)
  - Here we can pass [Epoch timestamp](https://www.epochconverter.com/) (Unix Timestamp) when to end the activity
  - It's optional - If you want to end activity immediately then don't pass dismissal date and use event: end to end the activity
- [customAttributes](https://api.cleverpush.com/#api-Notifications-SendNotification)
  - Object of custom attributes (Object Key = Attribute ID, Object value = Attribute value)
  - This object will be used to target all your subscriber's live activity

## Update Activity

```json
{
  "channel" : "XXXXXXXXXXXXX",
  "title": "Delivery Update",
  "text": "Your pizza order will arrive soon.",
  "iosLiveActivityContentState": {
      "driverName": "Anne Johnson",
      "estimatedDeliveryTime": 1659416365
  },
  "iosLiveActivityEvent": "update",
  "type": "iosLiveActivity",
  "customAttributes": {
      "member_id": "102"
  }
  ...
}
```

## End Activity

```json
{
  "channel" : "XXXXXXXXXXXXX",
  "title": "Delivery Update",
  "text": "Your pizza order will arrive soon.",
  "iosLiveActivityContentState": {
      "driverName": "Anne Johnson",
      "estimatedDeliveryTime": 1659416400
  },
  "iosLiveActivityEvent": "end",
  "iosLiveActivityDismissalDate": "1659416450", // On this timestamp activity will be ended
  "type": "iosLiveActivity",
  "customAttributes": {
      "member_id": "102"
  }
  ...
}
```

## References 

- [Apple documentation](https://developer.apple.com/documentation/activitykit/updating-and-ending-your-live-activity-with-activitykit-push-notifications)
- [CleverPush API](https://api.cleverpush.com/)
- [Displaying Live Activity](https://developer.apple.com/documentation/activitykit/displaying-live-data-with-live-activities)