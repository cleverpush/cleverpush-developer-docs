---
id: notifications
title: Notifications
---


## Sending messages

API Endpoint: https://api.cleverpush.com/#api-Notifications-SendNotification

Please keep in mind: if you do not include any targeting parameter or subscriptionId / attributes, the notification will be sent to all subscriptions in the channel.


### Transactional messages

You can send transactional notifications in 2 ways:

*1. With the CleverPush subscription ID*

```json
{
  "subscriptionId": "XXXXXXXXXXXXX",
  …
}
```

You can also send to multiple IDs (up to 50.000 per request)
```json
{
  "subscriptionId": ["XXXXXXXXXXXXX", "YYYYYYYYYYYY"],
  …
}
```

*2. By using your own external User ID* (please see the _Working with external User IDs_ section in the _Subscriptions_ page for more information)

```json
{
  "customAttributes": {
    "user_id": "123456789"
  }
  …
}
```
