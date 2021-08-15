---
id: methods
title: Methods
---

## Basic Usage

```csharp
using Com.CleverPush;

public App()
{
  [...]

  CleverPush.Current.StartInit("CLEVERPUSH_CHANNEL_ID_HERE")
    .HandleNotificationOpened((result) =>
    {
        Debug.WriteLine("CleverPush HandleNotificationOpened: {0}", result.notification.title);
    })
    .HandleNotificationReceived((result) =>
    {
      Debug.WriteLine("CleverPush HandleNotificationReceived: {0}", result.notification.title);
    })
    .HandleSubscribed((subscriptionId) =>
    {
      Debug.WriteLine("CleverPush HandleSubscribed: {0}", subscriptionId);
    })
    .EndInit();

  
}
```

## Subscribe / Unsubscribe:

```csharp
CleverPush.Current.Subscribe();
CleverPush.Current.Unsubscribe();
```


## Tags

```csharp
CleverPush.Current.GetAvailableTags(new ChannelTagsListener(delegate (ICollection<CPChannelTag> tags) {
    // List<CPChannelTag>
});

List<string> subscribedTagIds = CleverPush.Current.GetSubscriptionTags();

// add single tag
CleverPush.Current.AddSubscriptionTag("TAG_ID")

// remove single tag
CleverPush.Current.RemoveSubscriptionTag("TAG_ID")

bool hasTag = CleverPush.Current.HasSubscriptionTag("TAG_ID");
```

## Automatic Tag Assignment

The SDK can also automatically assign tags by using the `TrackPageView` method. In simple cases you can just give the method a URL. In the CleverPush backoffice you can then set trigger the tags by matching URL Pathname RegExes. You can optionally also set combinations of min. visits, seconds or sessions for this tag.

Let's say you have created a tag with the URL pathname regex "/sports". This would trigger the tag for a subscriber:

```csharp
CleverPush.Current.TrackPageView("https://example.com/sports/article-123123");
```

We can also have more advanced use cases here by using Javascript functions for matching. For example you created a tag with the following function in the CleverPush backend: `params.category === "sports"`. This would then trigger the tag for a subscriber:

```csharp
CleverPush.Current.TrackPageView("https://example.com/anything", new Dictionary<string, string> {
  { "category", "sports" }
};
```

Once the `trackPageView` method has been implemented you can set up all the tags dynamically in the CleverPush backend without touching your code.


## Attributes

```csharp
CleverPush.Current.GetAvailableAttributes(new ChannelAttributesListener(delegate (ICollection<CPCustomAttribute> attributes) {
    // List<CPCustomAttribute>
}));

string attributeValue = CleverPush.Current.GetSubscriptionAttribute("user_id");

CleverPush.Current.SetSubscriptionAttribute("user_id", "1");
```

## Topics

```csharp
CleverPush.Current.GetAvailableTopics(new ChannelTopicsListener(delegate (ICollection<CPChannelTopic> topics) {
    // List<CPChannelTopic>
}));

List<string> subscribedTopicIds = CleverPush.Current.GetSubscriptionTopics();

CleverPush.Current.SetSubscriptionTopics(new [] {"ID_1", "ID_2"});

// let the user choose his topics
CleverPush.Current.ShowTopicsDialog();
```


## Received Notifications

```csharp
List<CPNotification> = CleverPush.Current.GetNotifications();
```

## App Banners

```csharp

// You can emit custom events and use them as a trigger for your banners
CleverPush.Current.TriggerAppBannerEvent("key", "value");

// You can also show one banner by its ID (we recommend app banner events for production usage)
CleverPush.Current.ShowAppBanner("BANNER_ID");
```

## Event Tracking

Events can be used to trigger follow-up campaigns or to track conversions.

```csharp
CleverPush.Current.TrackEvent("EVENT NAME");

// track a conversion with a specified amount
CleverPush.Current.TrackEvent("EVENT NAME", 37.50);
```

## Tracking Consent

You can optionally require a tracking consent from the user (e.g. you get this consent from a CMP). If you tell our SDK to wait for the tracking consent, it will not call any tracking-related features until the consent is available. Calls will be queued and automatically executed until the consent is available.

Step 1: Call this before initializing the SDK:

```csharp
CleverPush.Current.SetTrackingConsentRequired(true);
```

Step 2: Call this when the user gave his consent (needs to be called on every launch):

```csharp
CleverPush.Current.SetTrackingConsent(true);
```
