---
id: methods
title: Methods
---

## Basic Usage

You can add a `NotificationReceivedListener` and a `NotificationOpenedListener` which fire when notifications have been received and/or opened:

**JAVA**
```java
         public class MainActivity extends Activity {
            public void onCreate(Bundle savedInstanceState) {
               CleverPush.getInstance(this).init("CLEVERPUSH_CHANNEL_ID",new NotificationReceivedListener(){
                  @Override
                  public void notificationReceived(NotificationOpenedResult result){
                     System.out.println("Received CleverPush Notification: " +result.getNotification().getTitle());
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
**KOTLIN**
```kotlin
class MainActivity:Activity() {
  fun onCreate(savedInstanceState:Bundle) {
     CleverPush.getInstance(this).init("",
                NotificationReceivedListener { result -> println("ReceivedCleverPushNotification: " + result.notification.title) },
                NotificationOpenedListener { result -> println("Opened CleverPush Notification: " + result.notification.title) })
  }
}
```
Instead of a `NotificationReceivedListener` you could also use a `NotificationReceivedCallbackListener`. This way you can dynamically control if you want to show a notification when the app is running in foreground:

**JAVA**

```java
CleverPush.getInstance(this).init("XXXXXXX", new NotificationReceivedCallbackListener() {
   @Override
   public boolean notificationReceivedCallback(NotificationOpenedResult notificationOpenedResult) {
         boolean showNotification = true;
         return showNotification;
   }
}, ...);
```

**KOTLIN**

```kotlin
CleverPush.getInstance(this).init("XXXXXXX", object:NotificationReceivedCallbackListener() {
  fun notificationReceivedCallback(notificationOpenedResult:NotificationOpenedResult):Boolean {
    val showNotification = true
    return showNotification
  }
}, ...)
```
You can add a `SubscribedListener` which fires when the user has successfully been subscribed:

**JAVA**

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
           System.out.println("CleverPush Subscription ID: " + subscriptionId);
        }
     });
  }
}
```
**KOTLIN**

```kotlin
class MainActivity:Activity() {
  fun onCreate(savedInstanceState:Bundle) {
   CleverPush.getInstance(this).init("",
                { result -> println("ReceivedCleverPushNotification: " + result.notification.title) },
                { result -> println("Opened CleverPush Notification: " + result.notification.title) },
                { subscriptionId -> System.out.println("CleverPush Subscription ID: $subscriptionId"); }
        )
  }
}
```

Subscribe / Unsubscribe:

**JAVA**

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
**KOTLIN**

```kotlin
class MainActivity:Activity() {
  fun onCreate(savedInstanceState:Bundle) {
    // last parameter (autoRegister) is false
    CleverPush.getInstance(this).init(...,false)
    
    // subscribe
    CleverPush.getInstance(this).subscribe()
    // or unsubscribe
    CleverPush.getInstance(this).unsubscribe()
    // get subscription status (true or false)
    CleverPush.getInstance(this).isSubscribed()
  }
}
```

## Tags

**JAVA**
```java
CleverPush.getInstance(this).getAvailableTags(tags -> {
    // returns Set<ChannelTag>
});

Set<String> subscribedTagIds = CleverPush.getInstance(this).getSubscriptionTags();

// add single tag
CleverPush.getInstance(this).addSubscriptionTag("TAG_ID")

// add multiple tags
CleverPush.getInstance(this).addSubscriptionTags(new String[] {"TAG_ID_1", "TAG_ID_2"});

// remove single tag
CleverPush.getInstance(this).removeSubscriptionTag("TAG_ID")

// remove multiple tags
CleverPush.getInstance(this).removeSubscriptionTags(new String[] {"TAG_ID_1", "TAG_ID_2"});

boolean hasTag = CleverPush.getInstance(this).hasSubscriptionTag(channelTags.get(0).getId());
```

**KOTLIN**
```kotlin
CleverPush.getInstance(this).getAvailableTags({ tags-> 
                                               // returns Set<ChannelTag>
                                              })
val subscribedTagIds = CleverPush.getInstance(this).getSubscriptionTags()

// add single tag
CleverPush.getInstance(this).addSubscriptionTag("TAG_ID")

// add multiple tags
CleverPush.getInstance(this).addSubscriptionTags(arrayOf<String>("TAG_ID_1", "TAG_ID_2"))

// remove single tag
CleverPush.getInstance(this).removeSubscriptionTag("TAG_ID")

// remove multiple tags
CleverPush.getInstance(this).removeSubscriptionTags(arrayOf<String>("TAG_ID_1", "TAG_ID_2"))

val hasTag = CleverPush.getInstance(this).hasSubscriptionTag(channelTags.get(0).getId())
```

## Automatic Tag Assignment

The SDK can also automatically assign tags by using the `trackPageView` method. In simple cases you can just give the method a URL. In the CleverPush backoffice you can then set trigger the tags by matching URL Pathname RegExes. You can optionally also set combinations of min. visits, seconds or sessions for this tag.

Let's say you have created a tag with the URL pathname regex "/sports". This would trigger the tag for a subscriber:

```java
CleverPush.getInstance(this).trackPageView("https://example.com/sports/article-123123");
```

We can also have more advanced use cases here by using Javascript functions for matching. For example you created a tag with the following function in the CleverPush backend: `params.category === "sports"`. This would then trigger the tag for a subscriber:

```java
CleverPush.getInstance(this).trackPageView("https://example.com/anything", new HashMap<String, String>() {{
   put("category", "sports");
}}););
```

Once the `trackPageView` method has been implemented you can set up all the tags dynamically in the CleverPush backend without touching your code.


## Attributes

**JAVA**
```java
CleverPush.getInstance(this).getAvailableAttributes(attributes -> {
    // returns Set<CustomAttribute>
});

Map<String, String> subscriptionAttributes = CleverPush.getInstance(this).getSubscriptionAttributes();

String attributeValue = CleverPush.getInstance(this).getSubscriptionAttribute("user_id");

CleverPush.getInstance(this).setSubscriptionAttribute("user_id", "1");
```

**KOTLIN**
```kotlin
CleverPush.getInstance(this).getAvailableAttributes({ attributes-> 
                                                     // returns Set<CustomAttribute>
                                                    })
val subscriptionAttributes = CleverPush.getInstance(this).getSubscriptionAttributes()
val attributeValue = CleverPush.getInstance(this).getSubscriptionAttribute("user_id")
CleverPush.getInstance(this).setSubscriptionAttribute("user_id", "1")
```

## Topics

**JAVA**
```java
Set<String> subscribedTopicIds = CleverPush.getInstance(this).getSubscriptionTopics();

CleverPush.getInstance(this).setSubscriptionTopics(new String[]{"ID_1", "ID_2"});

// let the user choose his topics
CleverPush.getInstance(this).showTopicsDialog();
```
**KOTLIN**
```kotlin
val subscribedTopicIds = CleverPush.getInstance(this).getSubscriptionTopics()
CleverPush.getInstance(this).setSubscriptionTopics(arrayOf<String>("ID_1", "ID_2"))

// let the user choose his topics
CleverPush.getInstance(this).showTopicsDialog()
```

Here is how the topics dialog looks like:

![Topics Dialog Android](https://developers.cleverpush.com/img/topics-dialog-android.png)


## Received Notifications

**JAVA**
```java
Set<Notification> = CleverPush.getInstance(this).getNotifications();
```
**KOTLIN**
```java
CleverPush.getInstance(this).getNotifications()
```

## App Banners

(Available from version 1.8.0)

**JAVA**
```java
// Will be called, once a user presses a button in the banner
CleverPush.getInstance(this).setAppBannerOpenedListener(action -> {
   System.out.println("App Banner Opened");
});

// You can emit custom events and use them as a trigger for your banners
CleverPush.getInstance(this).triggerAppBannerEvent("key", "value");

// You can also show one banner by its ID (we recommend app banner events for production usage)
CleverPush.getInstance(this).showAppBanner("BANNER_ID");
```

**KOTLIN**
```kotlin
// Will be called, once a user presses a button in the banner
CleverPush.getInstance(this).setAppBannerOpenedListener({ action-> println("App Banner Opened") })

// You can emit custom events and use them as a trigger for your banners
CleverPush.getInstance(this).triggerAppBannerEvent("key", "value")

// You can also show one banner by its ID (we recommend app banner events for production usage)
CleverPush.getInstance(this).showAppBanner("BANNER_ID")
```

## Event Tracking

Events can be used to trigger follow-up campaigns or to track conversions.

**JAVA**
```java
CleverPush.getInstance(this).trackEvent("EVENT NAME");

// track a conversion with a specified amount
CleverPush.getInstance(this).trackEvent("EVENT NAME", 37.50f);
```

**KOTLIN**
```kotlin
CleverPush.getInstance(this).trackEvent("EVENT NAME")

// track a conversion with a specified amount
CleverPush.getInstance(this).trackEvent("EVENT NAME", 37.50f)
```

## Tracking Consent

You can optionally require a tracking consent from the user (e.g. you get this consent from a CMP). If you tell our SDK to wait for the tracking consent, it will not call any tracking-related features until the consent is available. Calls will be queued and automatically executed until the consent is available.

Step 1: Call this before initializing the SDK:

```java
CleverPush.getInstance(this).setTrackingConsentRequired(true);
```

Step 2: Call this when the user gave his consent (needs to be called on every launch):

```java
CleverPush.getInstance(this).setTrackingConsent(true);
```


## Chat

Add the ChatView inside your Layout XML:

```xml
    <com.cleverpush.chat.ChatView
        android:layout_height="match_parent"
        android:layout_width="match_parent"
        />
```
## Stories

You can also implement CleverPush Stories into your application. For this, please set up a Story Widget in your CleverPush account. You can access stories via generated Widget Id and by following usage guide.

### Story View

![Screenshot_1626271406](https://user-images.githubusercontent.com/42137835/125639839-95583410-5d4d-4c39-a1ef-7f3c02833a04.png)

### Story Player

![Screenshot_1626271443](https://user-images.githubusercontent.com/42137835/125640072-5c155112-5a66-4bd9-9c93-055d9b3159f5.png)

### How to use 

Add xml to your layout

```xml

 <com.cleverpush.stories.StoryView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:background_color="#000"
        app:border_color="#cA4000"
        app:fontFamily="CabinSketch-Bold"
        app:story_view_height="500dp"
        app:story_view_width="700dp"
        app:text_color="#fff"
        app:widget_id="o76hjaysdgohltyil"/>

```
-  `widget_id` Set the Story Widget ID using this attribute

### Customizations

You can customize the experience of `StoryView` using these attributes:

-  `story_view_height` story view height in dp
-  `story_view_width` story view width in dp
-  `border_color` border color
-  `background_color` story view background color
-  `text_color` text color
-  `font_family` text font family