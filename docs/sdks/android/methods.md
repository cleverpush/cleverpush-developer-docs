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


### Chat

Add the ChatView inside your Layout XML:

```xml
    <com.cleverpush.chat.ChatView
        android:layout_height="match_parent"
        android:layout_width="match_parent"
        />
```
