---
id: subscriptions
title: Subscriptions
---

## Create / update subscriptions

API Endpoint: https://api.cleverpush.com/#api-Subscriptions-SyncSubscription


### Example request (email channel)

You can provide the email address (required) and the opt-in form ID (optional, but recommended). The opt-in form ID is required to send double opt-in emails which are used to confirm the ownership of the user's email.

You can find the email opt-in form ID in the CleverPush channel settings when editing a form (the last part in the URL):
_https://app.cleverpush.com/en/app/project/XXXXXXXXXXXXX/channel/XXXXXXXXXXXXX/opt-in-forms/*OPT_IN_FORM_ID_HERE*_

You can also optionally include `topics` (IDs of topics) in the request to indicate which newsletters the user is interested in.

```json
{
  "emailAddress": "user@example.com",
  "emailOptInFormId": "OPT_IN_FORM_ID",
  "topics": ["TOPIC_ID_1", "TOPIC_ID_2"]
  …
}
```

*Example response (double opt in needed):*
```json
{
  …
  "emailConfirmationNeeded": true
}
```

*Example response (double opt in not needed):*
```json
{
  …
  "emailConfirmationNeeded": false
}
```


## Working with external User IDs

You can save external User ID's to subscriptions when creating/updating a subscription. You just need to include the `customAttributes` parameter with the `user_id` field inside.
```json
{
  "customAttributes": {
    "user_id": "123456789"
  }
  …
}
```
The `user_id` attribute needs to be created before in the CleverPush channel settings under _attributes_. You can also include other attributes inside the request.


### Get subscription by attribute (external user_id)

API Endpoint: https://api.cleverpush.com/#api-Subscriptions-GetSubscription

*Example request:*
GET https://api.cleverpush.com/subscription?channelId=XXXXXXXX&attributeId=user_id&attribute_value=123456789
