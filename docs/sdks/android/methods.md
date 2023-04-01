---

id: methods
title: Methods

---

## Basic Usage

You can add a `NotificationReceivedListener` and a `NotificationOpenedListener` which fire when notifications have been received and/or opened:

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
public class MainActivity extends Activity {
  public void onCreate(Bundle savedInstanceState) {
      CleverPush.getInstance(this).init("CLEVERPUSH_CHANNEL_ID", new NotificationReceivedListener(){
        @Override
        public void notificationReceived(NotificationOpenedResult result){
            System.out.println("Received CleverPush Notification: " +result.getNotification().getTitle());
        }
      }, new NotificationOpenedListener() {
        @Override
        public void notificationOpened(NotificationOpenedResult result) {
            System.out.println("Opened CleverPush Notification: " + result.getNotification().getTitle());
        }
      }, true); // autoRegister: You can set this to false to prevent automatic subscribing on the first launch
  }
}
```

<!--Kotlin-->

```kotlin
class MainActivity:Activity() {
fun onCreate(savedInstanceState:Bundle) {
   CleverPush.getInstance(this).init("CLEVERPUSH_CHANNEL_ID",
               NotificationReceivedListener { result -> println("ReceivedCleverPushNotification: " + result.notification.title) },
               NotificationOpenedListener { result -> println("Opened CleverPush Notification: " + result.notification.title) })
  }
}
```

<!--END_DOCUSAURUS_CODE_TABS-->


Please note that `autoRegister` is turned to `true` in the above example. It means that the CleverPush SDK will automatically try to subscribe the user on the first launch of the app. If you later call `unsubscribe()` the SDK will not automatically try to subscribe again, instead you would have to call `subscribe()` yourself again.

Instead of a `NotificationReceivedListener` you could also use a `NotificationReceivedCallbackListener`. This way you can dynamically control if you want to show a notification when the app is running in foreground:

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).init("CLEVERPUSH_CHANNEL_ID", new NotificationReceivedCallbackListener() {
   @Override
   public boolean notificationReceivedCallback(NotificationOpenedResult notificationOpenedResult) {
      boolean showNotification = true;
      return showNotification;
   }
}, ...);
```

<!--Kotlin-->

```kotlin
CleverPush.getInstance(this).init("XXXXXXX", object:NotificationReceivedCallbackListener() {
fun notificationReceivedCallback(notificationOpenedResult:NotificationOpenedResult):Boolean {
   val showNotification = true
   return showNotification
}
}, ...)
```

<!--END_DOCUSAURUS_CODE_TABS-->


You can add a `SubscribedListener` which fires when the user has successfully been subscribed:

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
public class MainActivity extends Activity {
  public void onCreate(Bundle savedInstanceState) {
    CleverPush.getInstance(this).init("CLEVERPUSH_CHANNEL_ID", new NotificationReceivedListener() {
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

<!--Kotlin-->

```kotlin
class MainActivity:Activity() {
fun onCreate(savedInstanceState:Bundle) {
   CleverPush.getInstance(this).init("CLEVERPUSH_CHANNEL_ID",
               { result -> println("ReceivedCleverPushNotification: " + result.notification.title) },
               { result -> println("Opened CleverPush Notification: " + result.notification.title) },
               { subscriptionId -> System.out.println("CleverPush Subscription ID: $subscriptionId"); }
      )
  }
}
```

<!--END_DOCUSAURUS_CODE_TABS-->


Subscribe / Unsubscribe:

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

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

<!--Kotlin-->

```kotlin
class MainActivity:Activity() {
  fun onCreate(savedInstanceState:Bundle) {
    // last parameter (autoRegister) is false
    CleverPush.getInstance(this).init(..., false)

    // subscribe
    CleverPush.getInstance(this).subscribe()
    // or unsubscribe
    CleverPush.getInstance(this).unsubscribe()
    // get subscription status (true or false)
    CleverPush.getInstance(this).isSubscribed()
  }
}
```

<!--END_DOCUSAURUS_CODE_TABS-->


## Tags

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

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

<!--Kotlin-->

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

<!--END_DOCUSAURUS_CODE_TABS-->


## Automatic Tag Assignment

The SDK can also automatically assign tags by using the `trackPageView` method. In simple cases you can just give the method a URL. In the CleverPush backoffice you can then set trigger the tags by matching URL Pathname RegExes. You can optionally also set combinations of min. visits, seconds or sessions for this tag.

Let's say you have created a tag with the URL pathname regex "/sports". This would trigger the tag for a subscriber:

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).trackPageView("https://example.com/sports/article-123123");
```

<!--END_DOCUSAURUS_CODE_TABS-->

We can also have more advanced use cases here by using Javascript functions for matching. For example you created a tag with the following function in the CleverPush backend: `params.category === "sports"`. This would then trigger the tag for a subscriber:

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).trackPageView("https://example.com/anything", new HashMap<String, String>() {{
   put("category", "sports");
}});
```

<!--END_DOCUSAURUS_CODE_TABS-->


Once the `trackPageView` method has been implemented you can set up all the tags dynamically in the CleverPush backend without touching your code.

## Automatic View Tracking

The SDK can also automatically track view by using the `autoTrackWebViewPages` and `setWebViewClientListener` methods. 

**autoTrackWebViewPages**
You just need to add `autoTrackWebViewPages` to your webview clients `doUpdateVisitedHistory` method like below

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
new WebViewClient(){
            @Override
            public void doUpdateVisitedHistory(WebView view, String url, boolean isReload) {
                cleverPush.autoTrackWebViewPages(url);
                super.doUpdateVisitedHistory(view, url, isReload);
            }
        }
```

<!--END_DOCUSAURUS_CODE_TABS-->


**setWebViewClientListener**

You can set a `setWebViewClientListener` it will do Automatic View Tracking and you will get all the callback of WebViewClient in Listener : 

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
cleverPush.setWebViewClientListner(webView, new WebViewClientListener() {
   ...
}
```

<!--END_DOCUSAURUS_CODE_TABS-->


## Attributes

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).getAvailableAttributes(attributes -> {
   // returns Set<CustomAttribute>
});

Map<String, String> subscriptionAttributes = CleverPush.getInstance(this).getSubscriptionAttributes();

String attributeValue = CleverPush.getInstance(this).getSubscriptionAttribute("user_id");

// You can set string values like this
CleverPush.getInstance(this).setSubscriptionAttribute("user_id", "1");

// Please provide dates in the following format: YYYY-MM-DD
CleverPush.getInstance(this).setSubscriptionAttribute("birthdate", "YYYY-MM-DD");

// You can also push/pull values to special array attributes (e.g. "categories")
CleverPush.getInstance(this).pushSubscriptionAttributeValue("categories", "category_1");
CleverPush.getInstance(this).pullSubscriptionAttributeValue("categories", "category_1");
```

<!--Kotlin-->

```kotlin
CleverPush.getInstance(this).getAvailableAttributes({ attributes->
                                                   // returns Set<CustomAttribute>
                                                   })
val subscriptionAttributes = CleverPush.getInstance(this).getSubscriptionAttributes()

val attributeValue = CleverPush.getInstance(this).getSubscriptionAttribute("user_id")

// You can set string values like this
CleverPush.getInstance(this).setSubscriptionAttribute("user_id", "1")

// Please provide dates in the following format: YYYY-MM-DD
CleverPush.getInstance(this).setSubscriptionAttribute("birthdate", "YYYY-MM-DD")

// You can also push/pull values to special array attributes (e.g. "categories")
CleverPush.getInstance(this).pushSubscriptionAttributeValue("categories", "category_1")
CleverPush.getInstance(this).pullSubscriptionAttributeValue("categories", "category_1")
```

<!--END_DOCUSAURUS_CODE_TABS-->


## Country & Language

You can optionally override the country & language which is automatically detected from the system and can be used for targeting / translations.

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).setSubscriptionLanguage("en");
CleverPush.getInstance(this).setSubscriptionCountry("US");
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Topics

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).getAvailableTopics(topics -> {
   // returns Set<ChannelTopic>
});

Set<String> subscribedTopicIds = CleverPush.getInstance(this).getSubscriptionTopics();

CleverPush.getInstance(this).setSubscriptionTopics(new String[]{"ID_1", "ID_2"});

boolean hasTopic = CleverPush.getInstance(this).hasSubscriptionTopic("TOPIC_ID");

// let the user choose his topics
CleverPush.getInstance(this).showTopicsDialog();

CleverPush.getInstance(this).setTopicsChangedListener(new TopicsChangedListener() {
    @Override
    public void topicsChanged(Set<String> topicIds) {

    }
});
```

<!--Kotlin-->

```kotlin
CleverPush.getInstance(this).getAvailableTopics({ topics->
                                             // returns Set<ChannelTopic>
                                             })

val subscribedTopicIds = CleverPush.getInstance(this).getSubscriptionTopics()
CleverPush.getInstance(this).setSubscriptionTopics(arrayOf<String>("ID_1", "ID_2"))

val hasTopic = CleverPush.getInstance(this).hasSubscriptionTopic("TOPIC_ID");

// let the user choose his topics
CleverPush.getInstance(this).showTopicsDialog()
```

<!--END_DOCUSAURUS_CODE_TABS-->


Here is how the topics dialog looks like:

<img src="https://developers.cleverpush.com/img/topics-dialog-android.png" alt="Topics Dialog Android" height="500">


## Received Notifications

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
//get the locally stored notification.
Set<Notification> = CleverPush.getInstance(this).getNotifications();
```

<!--Kotlin-->

```kotlin
//get the locally stored notification.
CleverPush.getInstance(this).getNotifications()
```

<!--END_DOCUSAURUS_CODE_TABS-->

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
// get remote notification and local notification based on the boolean argument.
// - if you pass boolean argument YES you will get the list of remote notification else you will get the locally stored notification.
CleverPush.getInstance(this).getNotifications(true, new NotificationsCallbackListener() {
    @Override
    public void ready(Set<Notification> notifications) {

    }
});
```

<!--Kotlin-->

```kotlin
 // get remote notification and local notification based on the boolean argument.
// - if you pass boolean argument YES you will get the list of remote notification else you will get the locally stored notification.
CleverPush.getInstance(this).getNotifications(true) { }
```

## Remove Notification

You can remove notification stored locally using Notification ID

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java

CleverPush.getInstance(this).removeNotification("Notification ID");
```

<!--Kotlin-->

```kotlin

CleverPush.getInstance(this).removeNotification("Notification ID")
```

<!--END_DOCUSAURUS_CODE_TABS-->


## Notification Styles

CleverPush automatically chooses the fitting Notification Style for you (e.g. [BigImageStyle](https://developer.android.com/reference/android/app/Notification.BigImageStyle) or [BigTextStyle](https://developer.android.com/reference/android/app/Notification.BigTextStyle)).
We also provide a way that you can choose the displayed Notification style:

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
// Available Notification styles:
CleverPush.NotificationStyle.AUTO // default style
CleverPush.NotificationStyle.BIG_TEXT // big text style
CleverPush.NotificationStyle.BIG_PICTURE // big picture style
CleverPush.NotificationStyle.TEXT_WITH_IMAGE // custom style with big image and text in expanded view

CleverPush.getInstance(this).setNotificationStyle(CleverPush.NotificationStyle.AUTO);
```

<!--END_DOCUSAURUS_CODE_TABS-->


## App Banners

(Available from version 1.8.0)

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
// Will be called, once a user presses a button in the banner
CleverPush.getInstance(this).setAppBannerOpenedListener(action -> {
   System.out.println("App Banner Opened");
});

// You can also show one banner by its ID (we recommend app banner events for production usage)
CleverPush.getInstance(this).showAppBanner("BANNER_ID");
```

<!--Kotlin-->

```kotlin
// Will be called, once a user presses a button in the banner
CleverPush.getInstance(this).setAppBannerOpenedListener({ action-> println("App Banner Opened") })

// You can also show one banner by its ID (we recommend app banner events for production usage)
CleverPush.getInstance(this).showAppBanner("BANNER_ID")
```

<!--END_DOCUSAURUS_CODE_TABS-->


Get banners by group ID

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
// Will be called, once a user presses a button in the banner
CleverPush.getInstance(this).getAppBannersByGroup((Collection<Banner> banners) -> {
    for (Banner banner : banners) {
      System.out.println(banner.getId());
    }
},
groupId);
```

<!--END_DOCUSAURUS_CODE_TABS-->


### Custom activity

You can also set a custom activity, which will then be used to display the app banners:

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).setCustomActivity(activity);
```

<!--END_DOCUSAURUS_CODE_TABS-->


### Development mode

You can enable the development mode to disable caches for app banners, so you always see the most up to date version.

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).enableDevelopmentMode();
```

<!--END_DOCUSAURUS_CODE_TABS-->


### HTML Banners

CleverPush supports various JavaScript functions which can be called from HTML banners:

<!--DOCUSAURUS_CODE_TABS-->

<!--JavaScript-->

```javascript
CleverPush.subscribe();
CleverPush.unsubscribe();
CleverPush.closeBanner();
CleverPush.trackEvent(eventId, propertiesObject);
CleverPush.trackClick(buttonId);
CleverPush.trackClick(buttonId, customDataObject);
CleverPush.openWebView(url);
CleverPush.setSubscriptionAttribute(attributeId, value);
CleverPush.addSubscriptionTag(tagId);
CleverPush.removeSubscriptionTag(tagId);
CleverPush.setSubscriptionTopics(topicIds);
CleverPush.addSubscriptionTopic(topicId);
CleverPush.removeSubscriptionTopic(topicId);
CleverPush.showTopicsDialog();
```

<!--END_DOCUSAURUS_CODE_TABS-->


## Event Tracking

Events can be used to track conversions or trigger app banners.

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).trackEvent("EVENT NAME");

// track an event with custom properties
CleverPush.getInstance(this).trackEvent("EVENT NAME", new HashMap<String, Object>() {{
    put("property_1", "value");
}});

// track an event with a specified amount
CleverPush.getInstance(this).trackEvent("EVENT NAME", 37.50f);
```

<!--Kotlin-->

```kotlin
CleverPush.getInstance(this).trackEvent("EVENT NAME")

// track a conversion with a specified amount
CleverPush.getInstance(this).trackEvent("EVENT NAME", 37.50f)
```

<!--END_DOCUSAURUS_CODE_TABS-->


## Follow up Events

Events can be used to trigger follow-up campaigns.

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).triggerFollowUpEvent("EVENT NAME");

// add custom parameters
CleverPush.getInstance(this).triggerFollowUpEvent("EVENT NAME", new HashMap<String, String>() {{
  put("id", "123456");
}});
```

<!--Kotlin-->

```kotlin
CleverPush.getInstance(this).triggerFollowUpEvent("EVENT NAME")

// add custom parameters
CleverPush.getInstance(this).triggerFollowUpEvent("EVENT NAME", hashMapOf("id" to "123456"))
```

<!--END_DOCUSAURUS_CODE_TABS-->


## Tracking Consent

You can optionally require a tracking consent from the user (e.g. you get this consent from a CMP). If you tell our SDK to wait for the tracking consent, it will not call any tracking-related features until the consent is available. Calls will be queued and automatically executed until the consent is available.

Step 1: Call this before initializing the SDK:

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).setTrackingConsentRequired(true);
```

<!--END_DOCUSAURUS_CODE_TABS-->


Step 2: Call this when the user gave his consent (needs to be called on every launch):

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).setTrackingConsent(true);
```

<!--END_DOCUSAURUS_CODE_TABS-->


## Geo Fencing

For using Geo Fencing you need to request the location permission from the user.

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).requestLocationPermission();
```

<!--END_DOCUSAURUS_CODE_TABS-->


You can also check at any time if the user has already granted the permission:

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
boolean hasPermission = CleverPush.getInstance(this).hasLocationPermission();
```

<!--END_DOCUSAURUS_CODE_TABS-->
