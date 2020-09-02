---
id: methods
title: Methods
---

### Basic Usage

You can add a `NotificationReceivedListener` and a `NotificationOpenedListener` which fire when notifications have been received and/or opened:


```java
public class MainActivity extends Activity {
   public void onCreate(Bundle savedInstanceState) {
       CleverPush.getInstance(this).init(new NotificationReceivedListener() {
           @Override
           public void notificationReceived(NotificationOpenedResult result) {
              System.out.println("Received CleverPush Notification: " + result.getNotification().getTitle());
          }
       }, new NotificationOpenedListener() {
          @Override
          public void notificationOpened(NotificationOpenedResult result) {
             System.out.println("Opened CleverPush Notification: " + result.getNotification().getTitle());
         }
      });
   }
}
```


Instead of a `NotificationReceivedListener` you could also use a `NotificationReceivedCallbackListener`. This way you can dynamically control if you want to show a notification when the app is running in foreground:

```java
CleverPush.getInstance(this).init("XXXXXXX", new NotificationReceivedCallbackListener() {
   @Override
   public boolean notificationReceivedCallback(NotificationOpenedResult notificationOpenedResult) {
         boolean showNotification = true;
         return showNotification;
   }
}, ...);
```


You can add a `SubscribedListener` which fires when the user has successfully been subscribed:


```java
public class MainActivity extends Activity {
  public void onCreate(Bundle savedInstanceState) {
      CleverPush.getInstance(this).init(new NotificationReceivedListener() {
         @Override
         public void notificationReceived(NotificationOpenedResult result) {
            System.out.println("Received CleverPush Notification: " + result.getNotification().getTitle());
        }
     }, new NotificationOpenedListener() {
        @Override
        public void notificationOpened(NotificationOpenedResult result) {
           System.out.println("Opened CleverPush Notification: " + result.getNotification().getTitle());
        }
     }, new SubscribedListener() {
        @Override
        public void subscribed(String subscriptionId) {
           System.out.println("CleverPush Subscription ID: " + subscriptionId);+
        }
     });
  }
}
```


Subscribe (or unsubscribe) later:

```java
public class MainActivity extends Activity {
  public void onCreate(Bundle savedInstanceState) {
      // last parameter (autoRegister) is false
      CleverPush.getInstance(this).init(..., false);
      
      // subscribe
      CleverPush.getInstance(this).subscribe();
      
      // or unsubscribe
      CleverPush.getInstance(this).unsubscribe();
      
      // get subscription status (true or false)
      CleverPush.getInstance(this).isSubscribed();
  }
}
```


### Tags

```java
CleverPush.getInstance(this).getAvailableTags(tags -> {
    // returns Set<ChannelTag>
});

Set<String> subscribedTagIds = CleverPush.getInstance(this).getSubscriptionTags();

CleverPush.getInstance(this).addSubscriptionTag("tag_id");

CleverPush.getInstance(this).removeSubscriptionTag("tag_id");

boolean hasTag = CleverPush.getInstance(this).hasSubscriptionTag(channelTags.get(0).getId());
```


### Automatic Tag Assignment

The SDK can also automatically assign tags by using the `trackPageView` method. In simple cases you can just give the method a URL. In the CleverPush backoffice you can then set trigger the tags by matching URL Pathname RegExes. You can optionally also set combinations of min. visits, seconds or sessions for this tag.

Let's say you have created a tag with the URL pathname regex "/sports". This would trigger the tag for a subscriber:

```objective-c
CleverPush.getInstance(this).trackPageView("https://example.com/sports/article-123123");
```

We can also have more advanced use cases here by using Javascript functions for matching. For example you created a tag with the following function in the CleverPush backend: `params.category === "sports"`. This would then trigger the tag for a subscriber:

```objective-c
CleverPush.getInstance(this).trackPageView("https://example.com/anything", new HashMap<String, String>() {{
   put("category", "sports");
}}););
```

Once the `trackPageView` method has been implemented you can set up all the tags dynamically in the CleverPush backend without touching your code.


### Attributes

```java
CleverPush.getInstance(this).getAvailableAttributes(attributes -> {
    // returns Set<CustomAttribute>
});

Map<String, String> subscriptionAttributes = CleverPush.getInstance(this).getSubscriptionAttributes();

String attributeValue = CleverPush.getInstance(this).getSubscriptionAttribute("user_id");

CleverPush.getInstance(this).setSubscriptionAttribute("user_id", "1");
```


### Topics

```java
Set<String> subscribedTopicIds = CleverPush.getInstance(this).getSubscriptionTopics();

CleverPush.getInstance(this).setSubscriptionTopics(new String[]{"ID_1", "ID_2"});

// let the user choose his topics
CleverPush.getInstance(this).showTopicsDialog();
```


### Received Notifications

```java
Set<Notification> = CleverPush.getInstance(this).getNotifications();
```


### App Banners

```java
// usually call this after initializing
CleverPush.getInstance(this).showAppBanners();
```


### Event Tracking

Events can be used to trigger follow-up campaigns or to track conversions.

```java
CleverPush.getInstance(this).trackEvent("EVENT NAME");

// track a conversion with a specified amount
CleverPush.getInstance(this).trackEvent("EVENT NAME", 37.50f);
```


### Tracking Consent

You can optionally require a tracking consent from the user (e.g. you get this consent from a CMP). If you tell our SDK to wait for the tracking consent, it will not call any tracking-related features until the consent is available. Calls will be queued and automatically executed until the consent is available.

Step 1: Call this before initializing the SDK:

```java
CleverPush.getInstance(this).setTrackingConsentRequired(true);
```

Step 2: Call this when the user gave his consent (needs to be called on every launch):

```java
CleverPush.getInstance(this).setTrackingConsent(true);
```


### Chat

Add the ChatView inside your Layout XML:

```xml
    <com.cleverpush.chat.ChatView
        android:layout_height="match_parent"
        android:layout_width="match_parent"
        />
```
