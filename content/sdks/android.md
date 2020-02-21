+++
description = ""
title = "Android SDK"
date = "2017-04-10T16:43:08+01:00"
draft = false
weight = 200
bref=""
toc = true
+++

### Setup

1. Add the needed libraries to your `app/build.gradle` config under `dependencies`

    {{< highlight groovy >}}dependencies {
    [...]
    implementation 'com.cleverpush:cleverpush:0.5.3'
}
{{< /highlight >}}

The latest stable Android SDK version is `0.5.3`

2. Add the following tags to your AndroidManifest.xml file

    {{< highlight xml >}}
     <application ...>

       <service
           android:name="com.cleverpush.service.CleverPushFcmListenerService">
           <intent-filter>
               <action android:name="com.google.firebase.MESSAGING_EVENT" />
           </intent-filter>
       </service>
       <service
           android:name="com.cleverpush.service.CleverPushInstanceIDListenerService">
           <intent-filter>
               <action android:name="com.google.firebase.INSTANCE_ID_EVENT" />
           </intent-filter>
       </service>
    
     </application>
    {{< /highlight >}}
   
    Alternatively, you can also leave this `<meta-data..` line out and specify the App's Package Name in the CleverPush channel settings.

3. In the `onCreate` method of your Main activity, call `CleverPush.getInstance(this).init();` with your CleverPush Channel ID.
    
    {{< highlight java >}}
    public class MainActivity extends Activity {
       public void onCreate(Bundle savedInstanceState) {
           CleverPush.getInstance(this).init("CLEVERPUSH_CHANNEL_ID");
       }
    }
    {{< /highlight >}}


### Troubleshooting

If you use ProGuard, you may need to add these exceptions:

{{< highlight java >}}
-keep class com.cleverpush.** { *; }
-keep interface com.cleverpush.** { *; }
{{< /highlight >}}

If you are not using Java 1.8 yet, please add this to your `app/build.gradle` if building fails with our SDK:

{{< highlight groovy >}}
android {
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}
{{< /highlight >}}



### Basic Usage

You can add a `NotificationReceivedListener` and a `NotificationOpenedListener` which fire when notifications have been received and/or opened:


{{< highlight java >}}
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
{{< /highlight >}}


You can add a `SubscribedListener` which fires when the user has successfully been subscribed:


{{< highlight java >}}
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
{{< /highlight >}}


Subscribe (or unsubscribe) later:

{{< highlight java >}}
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
{{< /highlight >}}


### Tags

{{< highlight java >}}
CleverPush.getInstance(this).getAvailableTags(tags -> {
    // returns Set<ChannelTag>
});

Set<String> subscribedTagIds = CleverPush.getInstance(this).getSubscriptionTags();

CleverPush.getInstance(this).addSubscriptionTag("tag_id");

CleverPush.getInstance(this).removeSubscriptionTag("tag_id");

boolean hasTag = CleverPush.getInstance(this).hasSubscriptionTag(channelTags.get(0).getId());
{{< /highlight >}}


### Attributes

{{< highlight java >}}
CleverPush.getInstance(this).getAvailableAttributes(attributes -> {
    // returns Set<CustomAttribute>
});

Map<String, String> subscriptionAttributes = CleverPush.getInstance(this).getSubscriptionAttributes();

String attributeValue = CleverPush.getInstance(this).getSubscriptionAttribute("user_id");

CleverPush.getInstance(this).setSubscriptionAttribute("user_id", "1");
{{< /highlight >}}


### Topics

{{< highlight java >}}
Set<String> subscribedTopicIds = CleverPush.getInstance(this).getSubscriptionTopics();

CleverPush.getInstance(this).setSubscriptionTopics(new String[]{"ID_1", "ID_2"});

// let the user choose his topics
CleverPush.getInstance(this).showTopicsDialog();
{{< /highlight >}}


### Received Notifications

{{< highlight java >}}
Set<Notification> = CleverPush.getInstance(this).getNotifications();
{{< /highlight >}}


### App Banners

{{< highlight java >}}
// usually call this after initializing
CleverPush.getInstance(this).showAppBanners();
{{< /highlight >}}


### Event Tracking

Events can be used to trigger follow-up campaigns or to track conversions.

{{< highlight java >}}
CleverPush.getInstance(this).trackEvent("EVENT NAME");

// track a conversion with a specified amount
CleverPush.getInstance(this).trackEvent("EVENT NAME", 37.50f);
{{< /highlight >}}


### Chat

Add the ChatView inside your Layout XML:

{{< highlight xml >}}
    <com.cleverpush.chat.ChatView
        android:layout_height="match_parent"
        android:layout_width="match_parent"
        />
{{< /highlight >}}
