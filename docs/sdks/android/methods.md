---

id: methods
title: Methods

---

## Basic Usage

To initialize the CleverPush SDK, use the following method.

CLEVERPUSH_CHANNEL_ID (String): Your unique CleverPush channel ID. This ID is required to link the app with your CleverPush account.

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
public class MainActivity extends Activity {
  public void onCreate(Bundle savedInstanceState) {
    CleverPush.getInstance(this).init("CLEVERPUSH_CHANNEL_ID");
  }
}
```

<!--Kotlin-->

```kotlin
class MainActivity:Activity() {
  fun onCreate(savedInstanceState:Bundle) {
    CleverPush.getInstance(this).init("CLEVERPUSH_CHANNEL_ID")
  }
}
```

<!--END_DOCUSAURUS_CODE_TABS-->


You can add a `NotificationReceivedListener` and a `NotificationOpenedListener` and a `SubscribedListener`

NotificationReceivedListener: A listener that handles the event when a notification is received. The notificationReceived method is triggered with a NotificationOpenedResult object containing the details of the received notification. It fires when notifications have been received.

NotificationOpenedListener: A listener that handles the event when a notification is opened. The notificationOpened method is triggered with a NotificationOpenedResult object containing the details of the opened notification. It fires when notifications have been opened.

SubscribedListener: A listener that handles the event when a user subscribes. The subscribed method is triggered with the subscriptionId. it fires when the user has successfully been subscribed.

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
public class MainActivity extends Activity {
  public void onCreate(Bundle savedInstanceState) {
    CleverPush.getInstance(this).init(
      "CLEVERPUSH_CHANNEL_ID",
        new NotificationReceivedListener() {
            @Override
            public void notificationReceived(NotificationOpenedResult result) {
              System.out.println("Received CleverPush Notification: " + result.getNotification().getTitle());
            }
        },
        new NotificationOpenedListener() {
            @Override
            public void notificationOpened(NotificationOpenedResult result) {
              System.out.println("Opened CleverPush Notification: " + result.getNotification().getTitle());
            }
        },
        new SubscribedListener() {
            @Override
            public void subscribed(String subscriptionId) {
                System.out.println("CleverPush Subscription ID: " + subscriptionId);
            }
        }
    );
  }
}
```

<!--Kotlin-->

```kotlin
class MainActivity:Activity() {
  fun onCreate(savedInstanceState:Bundle) {
    CleverPush.getInstance(this).init(
        "CLEVERPUSH_CHANNEL_ID",
        NotificationReceivedListener { result -> println("Received CleverPush Notification: " + result.notification.title) },
        NotificationOpenedListener { result -> println("Opened CleverPush Notification: " + result.notification.title) },
    ) { subscriptionId -> println("CleverPush Subscription ID: $subscriptionId") }
  }
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

You can set autoRegister.

autoRegister: The autoRegister parameter controls whether the CleverPush SDK will automatically attempt to subscribe the user upon the first launch of the app. In the below example, autoRegister is set to true. This means that the CleverPush SDK will automatically try to subscribe the user when they first launch the app. If you later call unsubscribe(), the SDK will not automatically try to subscribe the user again. You would need to call subscribe() manually to resubscribe the user.

By default, the autoRegister parameter in the SDK is set to true. This ensures that new users are automatically subscribed unless explicitly specified otherwise.

To prevent automatic subscribing on the first launch, set autoRegister to false in the initialization method. This allows you to control the subscription process manually.

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
public class MainActivity extends Activity {
  public void onCreate(Bundle savedInstanceState) {
    CleverPush.getInstance(this).init(
      "CLEVERPUSH_CHANNEL_ID",
        new NotificationReceivedListener() {
            @Override
            public void notificationReceived(NotificationOpenedResult result) {
              System.out.println("Received CleverPush Notification: " + result.getNotification().getTitle());
            }
        },
        new NotificationOpenedListener() {
            @Override
            public void notificationOpened(NotificationOpenedResult result) {
              System.out.println("Opened CleverPush Notification: " + result.getNotification().getTitle());
            }
        },
        new SubscribedListener() {
            @Override
            public void subscribed(String subscriptionId) {
                System.out.println("CleverPush Subscription ID: " + subscriptionId);
            }
        },
        true // autoRegister: You can set this to false to prevent automatic subscribing on the first launch
    );
  }
}
```

<!--Kotlin-->

```kotlin
class MainActivity:Activity() {
  fun onCreate(savedInstanceState:Bundle) {
    CleverPush.getInstance(this).init(
        "CLEVERPUSH_CHANNEL_ID",
        NotificationReceivedListener { result -> println("Received CleverPush Notification: " + result.notification.title) },
        NotificationOpenedListener { result -> println("Opened CleverPush Notification: " + result.notification.title) },
        { subscriptionId -> println("CleverPush Subscription ID: $subscriptionId") },
        true // autoRegister: You can set this to false to prevent automatic subscribing on the first launch
    )
  }
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

You can add a `InitializeListener`

The `InitializeListener` handles the initialization status of the CleverPush SDK. It provides methods that are called at different stages of the initialization process, allowing developers to respond accordingly. Can get notified if the initialization was successful or if it failed,

onInitialized(): This method is called when the initialization process starts. Logs that the initialization process has started.

onInitializationSuccess(): This optional method is called when the initialization is successful. You can override this method to handle the initialization success. Logs that the initialization was successful.

onInitializationFailure(Throwable throwable): This optional method is called when the initialization fails. You can override this method to handle the initialization failure. Logs the error message and details if the initialization fails.

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
public class MainActivity extends Activity {
  public void onCreate(Bundle savedInstanceState) {
      CleverPush.getInstance(this).init(
        "CLEVERPUSH_CHANNEL_ID",
        new NotificationReceivedListener() {
          @Override
          public void notificationReceived(NotificationOpenedResult result) {
            System.out.println("Received CleverPush Notification: " + result.getNotification().getTitle());
          }
        },
        new NotificationOpenedListener() {
          @Override
          public void notificationOpened(NotificationOpenedResult result) {
            System.out.println("Opened CleverPush Notification: " + result.getNotification().getUrl());
          }
        },
        new SubscribedListener() {
          @Override
          public void subscribed(String subscriptionId) {
            System.out.println("CleverPush Subscription ID: " + subscriptionId);
          }
        },
        true, // autoRegister: You can set this to false to prevent automatic subscribing on the first launch
        new InitializeListener() {
          @Override
          public void onInitialized() {
            Log.d("CleverPush", "CleverPush InitializeListener's default method Initialized");
          }

          @Override
          public void onInitializationSuccess() {
            InitializeListener.super.onInitializationSuccess();
            Log.d("CleverPush", "CleverPush Initialization Successful");
          }

          @Override
          public void onInitializationFailure(Throwable throwable) {
            InitializeListener.super.onInitializationFailure(throwable);
            Log.e("CleverPush", "CleverPush Initialization Failed: " + throwable.getMessage(), throwable);
          }
        }
    );
  }
}
```

<!--Kotlin-->

```kotlin
class MainActivity:Activity() {
  fun onCreate(savedInstanceState:Bundle) {
    CleverPush.getInstance(this).init(
        "CLEVERPUSH_CHANNEL_ID",
        NotificationReceivedListener { result -> println("Received CleverPush Notification: " + result.notification.title) },
        NotificationOpenedListener { result -> println("Opened CleverPush Notification: " + result.notification.url) },
        { subscriptionId -> println("CleverPush Subscription ID: $subscriptionId") },
        true, // autoRegister: You can set this to false to prevent automatic subscribing on the first launch
        object : InitializeListener {
            override fun onInitialized() {
                println("CleverPush InitializeListener's default method Initialized")
            }

            override fun onInitializationSuccess() {
                super<InitializeListener>.onInitializationSuccess()
                println("CleverPush Initialization Successful")
            }

            override fun onInitializationFailure(throwable: Throwable) {
                super<InitializeListener>.onInitializationFailure(throwable)
                println("CleverPush Initialization Failed: " + throwable.message)
            }
        }
    )
  }
}
```

<!--END_DOCUSAURUS_CODE_TABS-->


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


## Subscribe / Unsubscribe

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
public class MainActivity extends Activity {
  public void onCreate(Bundle savedInstanceState) {
    // last parameter (autoRegister) is false
    CleverPush.getInstance(this).init(..., false);

    // subscribe
    CleverPush.getInstance(this).subscribe();

    CleverPush.getInstance(MainActivity.this).subscribe(new SubscribedCallbackListener() {
      @Override
      public void onSuccess(String subscriptionId) {
        System.out.println("CleverPush Subscription ID: " + subscriptionId);
      }

      @Override
      public void onFailure(Throwable exception) {
        System.out.println("Error while subscribing: " + exception.getLocalizedMessage());
      }
    });

    // or unsubscribe
    CleverPush.getInstance(this).unsubscribe();

    // get subscription status (true or false)
    CleverPush.getInstance(this).isSubscribed();

    // get subscription id
    String subscriptionId = CleverPush.getInstance(this).getSubscriptionId(MainActivity.this);
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

    CleverPush.getInstance(this@MainActivity).subscribe(object : SubscribedCallbackListener {
      override fun onSuccess(subscriptionId: String) {
        println("CleverPush Subscription ID: $subscriptionId")
      }

      override fun onFailure(exception: Throwable) {
        println("Error while subscribing: ${exception.localizedMessage}")
      }
    })

    // or unsubscribe
    CleverPush.getInstance(this).unsubscribe()

    // get subscription status (true or false)
    CleverPush.getInstance(this).isSubscribed()

     // get subscription id
     val subscriptionId: String? = CleverPush.getInstance(this).getSubscriptionId(this@MainActivity)
  }
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Get Device Token

You can retrieve the current device token (used for push notifications) with the following method:

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).getDeviceToken(new DeviceTokenListener() {
    @Override
    public void complete(String deviceToken) {
        System.out.println("Device Token: " + deviceToken);
    }
});
```

<!--Kotlin-->

```kotlin
CleverPush.getInstance(this).getDeviceToken(object : DeviceTokenListener {
    override fun complete(deviceToken: String) {
        println("Device Token: $deviceToken")
    }
})
```

<!--END_DOCUSAURUS_CODE_TABS-->


## Tags

If you want to update tags from **Dashboard to SDK**:

If the `Sync tags to client on subscription sync (App)` option is enabled under `General Settings → Advanced Settings` in the dashboard, you can add or remove tags directly using the Subscription ID in the dashboard. 

These changes will automatically sync with the SDK when `syncSubscription` occurs. By default, auto-sync happens every **3 days**. To update the tags immediately in the SDK, you can manually (force) call the `subscribe()` method.

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
CleverPush.getInstance(this).removeSubscriptionTag("TAG_ID");

CleverPush.getInstance(this).removeSubscriptionTag("TAG_ID", new CompletionFailureListener() {
  @Override
  public void onComplete() {
    System.out.println("Subscription tag removed successfully");
  }

  @Override
  public void onFailure(Exception exception) {
    System.out.println("Error while removing subscription tag: " + exception.getLocalizedMessage());
  }
});

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

<!--Kotlin-->

```kotlin
CleverPush.getInstance(this).trackPageView("https://example.com/sports/article-123123")
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

<!--Kotlin-->

```kotlin
CleverPush.getInstance(this).trackPageView("https://example.com/anything", hashMapOf(
  "category" to "sports"
))
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
new WebViewClient() {
    @Override
    public void doUpdateVisitedHistory(WebView view, String url, boolean isReload) {
        cleverPush.autoTrackWebViewPages(url);
        super.doUpdateVisitedHistory(view, url, isReload);
    }
}

```

<!--Kotlin-->

```kotlin
object : WebViewClient() {
    override fun doUpdateVisitedHistory(view: WebView, url: String, isReload: Boolean) {
        CleverPush.getInstance(view.context).autoTrackWebViewPages(url)
        super.doUpdateVisitedHistory(view, url, isReload)
    }
}
```

<!--END_DOCUSAURUS_CODE_TABS-->


**setWebViewClientListener**

You can set a `setWebViewClientListener` it will do Automatic View Tracking and you will get all the callback of WebViewClient in Listener : 

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).setWebViewClientListner(webView, new WebViewClientListener() {
   // ...
}
```

<!--Kotlin-->

```kotlin
CleverPush.getInstance(this).setWebViewClientListener(webView, object : WebViewClientListener {
    // ...
})
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

Object attributeValue = CleverPush.getInstance(this).getSubscriptionAttribute("user_id");

// You can set string values like this
CleverPush.getInstance(this).setSubscriptionAttribute("user_id", "1");

// Please provide dates in the following format: YYYY-MM-DD
CleverPush.getInstance(this).setSubscriptionAttribute("birthdate", "YYYY-MM-DD");

// You can set array of string values like this
String[] array = {"1", "2", "3"}; 
CleverPush.getInstance(MainActivity.this).setSubscriptionAttribute("user_id", array);

// You can set multiple key-value pairs like this
Map<String, String> attributes = new HashMap<>();
attributes.put("user_id", "1");
attributes.put("zip", "20097");
CleverPush.getInstance(this).setSubscriptionAttributes(attributes);

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

<!--Kotlin-->

```kotlin
CleverPush.getInstance(this).setSubscriptionLanguage("en")
CleverPush.getInstance(this).setSubscriptionCountry("US")
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
// Get the locally stored notification.
Set<Notification> notificationList = CleverPush.getInstance(this).getNotifications();
```

<!--Kotlin-->

```kotlin
// Get the locally stored notifications
val notificationList = CleverPush.getInstance(this).notifications
```

<!--END_DOCUSAURUS_CODE_TABS-->

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
// Get remote notifications or local notifications based on the boolean argument.
// - Pass `true` to get the list of remote notifications.
// - Pass `false` to get the locally stored notifications.
CleverPush.getInstance(this).getNotifications(true, new NotificationsCallbackListener() {
    @Override
    public void ready(Set<Notification> notifications) {
      // handle notifications
    }
});
```

<!--Kotlin-->

```kotlin
// Get remote notifications or local notifications based on the boolean argument.
// - Pass `true` to get the list of remote notifications.
// - Pass `false` to get the locally stored notifications.
CleverPush.getInstance(this).getNotifications(true) { notifications ->
    // handle notifications
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Tracking Notification Clicks

(Available from version 1.35.5)

You can use the `trackInboxClicked()` method from the Notification class to manually track clicks on notifications retrieved either from local storage or remotely. 

This is especially useful if you're displaying a custom inbox UI.


<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
Set<Notification> notificationList = CleverPush.getInstance(this).getNotifications();

for (Notification notification : notificationList) {
    // Track an notification click
    notification.trackInboxClicked();
}

CleverPush.getInstance(this).getNotifications(true, new NotificationsCallbackListener() {
    @Override
    public void ready(Set<Notification> notifications) {
        for (Notification notification : notifications) {
            // Track an notification click
            notification.trackInboxClicked();
        }
    }
});
```

<!--Kotlin-->

```kotlin
val notificationList = CleverPush.getInstance(this).notifications

notificationList.forEach { notification ->
    notification.trackInboxClicked()
}

CleverPush.getInstance(this).getNotifications(true) { notifications ->
    notifications.forEach { notification ->
        notification.trackInboxClicked()
    }
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

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

<!--Kotlin-->

```kotlin
// Available Notification styles:
CleverPush.NotificationStyle.AUTO // default style
CleverPush.NotificationStyle.BIG_TEXT // big text style
CleverPush.NotificationStyle.BIG_PICTURE // big picture style
CleverPush.NotificationStyle.TEXT_WITH_IMAGE // custom style with big image and text in expanded view

CleverPush.getInstance(this).setNotificationStyle(CleverPush.NotificationStyle.AUTO)
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

(Available from version 1.34.36)


<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
// You can show one banner by its ID and listen when it is closed (we recommend app banner events for production usage)
CleverPush.getInstance(this).showAppBanner("BANNER_ID", new AppBannerClosedListener() {
    @Override
    public void closed() {
        System.out.println("App banner is closed.");
    }
});
```

<!--Kotlin-->

```kotlin
// You can show one banner by its ID and listen when it is closed (we recommend app banner events for production usage)
CleverPush.getInstance(this).showAppBanner("BANNER_ID", AppBannerClosedListener {
    println("App banner is closed.")
})
```

<!--END_DOCUSAURUS_CODE_TABS-->

Get banners by group ID

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).getAppBannersByGroup((Collection<Banner> banners) -> {
    for (Banner banner : banners) {
      System.out.println(banner.getId());
    }
},
groupId);
```

<!--Kotlin-->

```kotlin
CleverPush.getInstance(this).getAppBannersByGroup { banners ->
    for (banner in banners) {
        println(banner.id)
    }
}, groupId)
```

<!--END_DOCUSAURUS_CODE_TABS-->


### Custom activity

You can also set a custom activity, which will then be used to display the app banners:

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).setCustomActivity(activity);
```

<!--Kotlin-->

```kotlin
CleverPush.getInstance(this).setCustomActivity(activity)
```

<!--END_DOCUSAURUS_CODE_TABS-->


### Disabling banners

You can also disable app banners temporarily, e.g. during a splash screen. Banners are enabled by default.
If a banner would show during this time, it is added to an internal queue and shown when calling `enableAppBanners`.

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).disableAppBanners();
CleverPush.getInstance(this).enableAppBanners();
```

<!--Kotlin-->

```kotlin
CleverPush.getInstance(this).disableAppBanners()
CleverPush.getInstance(this).enableAppBanners()
```

<!--END_DOCUSAURUS_CODE_TABS-->


### Development mode

You can enable the development mode to disable caches for app banners, so you always see the most up to date version.

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).enableDevelopmentMode();
```

<!--Kotlin-->

```kotlin
CleverPush.getInstance(this).enableDevelopmentMode()
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
var attributeValue = CleverPush.getSubscriptionAttribute('attributeId');
CleverPush.addSubscriptionTag(tagId);
CleverPush.removeSubscriptionTag(tagId);
CleverPush.setSubscriptionTopics(topicIds);
CleverPush.addSubscriptionTopic(topicId);
CleverPush.removeSubscriptionTopic(topicId);
CleverPush.showTopicsDialog();
CleverPush.goToScreen('screenId');
CleverPush.nextScreen();
CleverPush.previousScreen();
CleverPush.copyToClipboard('text');
CleverPush.handleLinkBySystem('mailto:example@email.com'); // support multiple link types, including `mailto:`, `tel:`, `market/Play Store`, and standard `http/https` links.
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

// track an event with custom properties
CleverPush.getInstance(this).trackEvent("EVENT NAME", hashMapOf(
    "property_1" to "value"
))

// track a conversion with a specified amount
CleverPush.getInstance(this).trackEvent("EVENT NAME", 37.50f)
```

<!--END_DOCUSAURUS_CODE_TABS-->


## Follow up Events

*Deprecated: Use `trackEvent` instead to trigger Follow-ups via Events.*

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

<!--Kotlin-->

```kotlin
CleverPush.getInstance(this).setTrackingConsentRequired(true)
```

<!--END_DOCUSAURUS_CODE_TABS-->


Step 2: Call this when the user gave his consent (needs to be called on every launch):

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).setTrackingConsent(true);
```

<!--Kotlin-->

```kotlin
CleverPush.getInstance(this).setTrackingConsent(true)
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Subscribe Consent

You can optionally require user consent for subscription (e.g., obtained through a CMP). If you tell our SDK to wait for the subscribe consent, it will not call subscribe features until the consent is available. Calls will be queued and automatically executed once consent is granted.

Step 1: Call this before initializing the SDK:

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).setSubscribeConsentRequired(true);
```

<!--Kotlin-->

```kotlin
CleverPush.getInstance(this).setSubscribeConsentRequired(true)
```

<!--END_DOCUSAURUS_CODE_TABS-->


Step 2: Call this when the user gave his consent (needs to be called on every launch):

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).setSubscribeConsent(true);
```

<!--Kotlin-->

```kotlin
CleverPush.getInstance(this).setSubscribeConsent(true)
```

<!--END_DOCUSAURUS_CODE_TABS-->


## Geo Fencing

For using Geo Fencing you need to request the location permission from the user.

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).requestLocationPermission();
```

<!--Kotlin-->

```kotlin
CleverPush.getInstance(this).requestLocationPermission()
```

<!--END_DOCUSAURUS_CODE_TABS-->


You can also check at any time if the user has already granted the permission:

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
boolean hasPermission = CleverPush.getInstance(this).hasLocationPermission();
```

<!--Kotlin-->

```kotlin
val hasPermission: Boolean = CleverPush.getInstance(this).hasLocationPermission()
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Authorization Token

(Available from version 1.31.13)

You can set an authorization token that will be used in an API call.

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->
```java
CleverPush.getInstance(this).setAuthorizerToken("YOUR_AUTH_TOKEN_HERE");
```

<!--Kotlin-->
```kotlin
CleverPush.getInstance(this).setAuthorizerToken("YOUR_AUTH_TOKEN_HERE")
```

<!--END_DOCUSAURUS_CODE_TABS-->

## TCF2 CMP

(Available from version 1.32.0)

You can set IabTcfMode. Perform subscribe or tracking according to IabTcfMode if vendor consent is 1.

Call this before initializing the SDK

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->
```java
/** IabTcfModes are 
IabTcfMode.SUBSCRIBE_WAIT_FOR_CONSENT, 
IabTcfMode.TRACKING_WAIT_FOR_CONSENT, 
IabTcfMode.DISABLED 
*/
CleverPush.getInstance(this).setIabTcfMode(IabTcfMode.SUBSCRIBE_WAIT_FOR_CONSENT);
```

<!--Kotlin-->
```kotlin
/** IabTcfModes are 
IabTcfMode.SUBSCRIBE_WAIT_FOR_CONSENT, 
IabTcfMode.TRACKING_WAIT_FOR_CONSENT, 
IabTcfMode.DISABLED 
*/
CleverPush.getInstance(this).setIabTcfMode(IabTcfMode.SUBSCRIBE_WAIT_FOR_CONSENT)
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Auto Request Notification Permission

(Available from version 1.32.2)

You can diable the notification permission dialog while subscribe.

Default `autoRequestNotificationPermission` value is `true` so while subscribing it checks that if notification permission is not given then it will display the dialog. By seting `autoRequestNotificationPermission` value to `false` notification permission dialog will not display if permission is not given while subscribe. 

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->
```java
CleverPush.getInstance(this).setAutoRequestNotificationPermission(false);
```

<!--Kotlin-->
```kotlin
CleverPush.getInstance(this).setAutoRequestNotificationPermission(false)
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Auto Resubscribe

(Available from version 1.32.2)

You can perform auto resubscribe whenever app open if the user has given notification permission and subscriptionId is null.

Default `autoResubscribe` value is `false`. By seting `autoResubscribe` value to `true` whenever app open it checks that the user has given notification permission and subscriptionId is null then perform subscribe. 

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->
```java
CleverPush.getInstance(this).setAutoResubscribe(true);
```

<!--Kotlin-->
```kotlin
CleverPush.getInstance(this).setAutoResubscribe(true)
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Set Local Track Event Retention Days

(Available from version 1.33.0)

App Banners: Targeting by events from previous sessions

Added the `Add Event` feature in the `Targeting` section in the app banner. Where you can set the last x days event called and fulfil the specific condition then the banner will display.

E.g `in last 5 days between from 5 to 10 event TEST`. It will store the banner event data in a local database and check from the current date to till next five days. If the event called count for that particular banner is between 5 to 10 or not. If it's between those values then the banner will display otherwise not. After 5 days banner will not display. 

To delete the local database's table entry need to set `trackEventRetentionDays`. The default days are `90 days`. It will check each record's createdDateTime, if it's greater than trackEventRetentionDays then that data will be deleted from the table.

Call this before initializing the SDK

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->
```java
CleverPush.getInstance(this).setLocalTrackEventRetentionDays(20);
```

<!--Kotlin-->
```kotlin
CleverPush.getInstance(this).setLocalTrackEventRetentionDays(20)
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Set Custom Notification Activity Enabled

(Available from version 1.34.31)

The `setCustomNotificationActivityEnabled` method allows to enable launching a custom activity when a notification is opened. 

By default, the `customNotificationActivityEnabled` value is set to `false`. To enable this functionality, set the value to `true` and call it within the `NotificationOpenedListener`.

Call this in `NotificationOpenedListener`

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->
```java
CleverPush.getInstance(context).init(
    getString(R.string.channel_id),
    new NotificationReceivedListener() {
        @Override
        public void notificationReceived(NotificationOpenedResult result) {
            System.out.println("Received CleverPush Notification: " + result.getNotification().getTitle());
        }
    },
    new NotificationOpenedListener() {
        @Override
        public void notificationOpened(NotificationOpenedResult result) {
            if (result != null && result.getNotification().getUrl() != null) {
                String url = result.getNotification().getUrl();
                deepLinkUri = Uri.parse(url);
                try {
                    CleverPush.getInstance(MainActivity.this).setCustomNotificationActivityEnabled(true);

                    Intent intent = new Intent(getApplicationContext(), NotificationActivity.class);
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    intent.setAction(Intent.ACTION_VIEW);
                    intent.setData(deepLinkUri);
                    intent.addCategory(Intent.CATEGORY_APP_BROWSER);
                    intent.addCategory(Intent.CATEGORY_DEFAULT);
                    startActivity(intent);
                } catch (ActivityNotFoundException e) {
                    Logger.e("CleverPush", "createNotificationOpenedListener error: " + e, e);
                }
            } else {
                Logger.w("CleverPush", "initializeCleverPush Couldn't extract url from notification.");
            }
        }
    },
    new SubscribedListener() {
        @Override
        public void subscribed(String subscriptionId) {
            // Implement subscription logic here if needed
        }
    },
    autoRegister
);
```

<!--Kotlin-->
```kotlin
CleverPush.getInstance(this).setCustomNotificationActivityEnabled(true)
```

<!--END_DOCUSAURUS_CODE_TABS-->
