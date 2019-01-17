+++
description = ""
title = "Android SDK"
date = "2017-04-10T16:43:08+01:00"
draft = false
weight = 200
bref=""
toc = true
+++

### Installation

1. Add the needed libraries to your Gradle config

    {{< highlight groovy >}}
    implementation 'com.cleverpush:cleverpush:+'
    implementation 'com.android.support:support-v4:+'
    implementation 'com.google.firebase:firebase-messaging:+'
    implementation 'com.google.code.gson:gson:2.8.5'
    {{< /highlight >}}

2. Add the following tags to your AndroidManifest.xml file

    {{< highlight xml >}}
     <application ...>
    
       <meta-data android:name="CLEVERPUSH_CHANNEL_ID" android:value="[CLEVERPUSH.CHANNEL.ID]" />
    
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
   
    Be sure to insert your correct `[CLEVERPUSH.CHANNEL.ID]`, which can be found in the CleverPush settings and to replace `[YOUR.PACKAGE.NAME]` with your package name.

3. In the `onCreate` method of your Main activity, call `CleverPush.getInstance(this).init();`
    
    {{< highlight java >}}
    public class MainActivity extends Activity {
       public void onCreate(Bundle savedInstanceState) {
           CleverPush.getInstance(this).init();
       }
    }
    {{< /highlight >}}


If you use ProGuard, you may need to add these exceptions:

{{< highlight java >}}
-keep class com.cleverpush.** { *; }
-keep interface com.cleverpush.** { *; }
{{< /highlight >}}



### Usage

You can add a `NotificationOpenedListener`


{{< highlight java >}}
public class MainActivity extends Activity {
   public void onCreate(Bundle savedInstanceState) {
       CleverPush.getInstance(this).init(new NotificationOpenedListener() {
           notificationOpened(NotificationOpenedResult result) {
              System.out.println("Opened CleverPush Notification with URL: " + result.getNotification().getUrl());
          };
       });
   }
}
{{< /highlight >}}


And a `SubscribedListener`


{{< highlight java >}}
public class MainActivity extends Activity {
  public void onCreate(Bundle savedInstanceState) {
      CleverPush.getInstance(this).init(new NotificationOpenedListener() {
          notificationOpened(NotificationOpenedResult result) {
             System.out.println("Opened CleverPush Notification with URL: " + result.getNotification().getUrl());
         };
      }, new SubscribedListener() {
           subscribed(String subscriptionId) {
              System.out.println("CleverPush Subscription ID: " + subscriptionId);
          };
       });
  }
}
{{< /highlight >}}


Subscribe (or unsubscribe) later:

{{< highlight java >}}
public class MainActivity extends Activity {
  public void onCreate(Bundle savedInstanceState) {
      // last parameter (autoRegister) is false
      CleverPush.getInstance(this).init(new NotificationOpenedListener() {
          notificationOpened(NotificationOpenedResult result) {
             System.out.println("Opened CleverPush Notification with URL: " + result.getNotification().getUrl());
         };
      }, new SubscribedListener() {
           subscribed(String subscriptionId) {
              System.out.println("CleverPush Subscription ID: " + subscriptionId);
          };
      }, false);
      
      // subscribe
      CleverPush.getInstance(this).subscribe();
      
      // or unsubscribe
      CleverPush.getInstance(this).unsubscribe();
      
      // get subscription status (true or false)
      CleverPush.getInstance(this).isSubscribed();
  }
}
{{< /highlight >}}

Tagging and Attributes


{{< highlight java >}}
CleverPush.getInstance(this).getAvailableTags(tags -> {
    // returns Set<ChannelTag>
});
CleverPush.getInstance(this).getAvailableAttributes(attributes -> {
    // returns Set<CustomAttribute>
});

Set<String> subscribedTagIds = CleverPush.getInstance(this).getSubscriptionTags();
Map<String, String> subscriptionAttributes = CleverPush.getInstance(this).getSubscriptionAttributes();

CleverPush.getInstance(this).addSubscriptionTag("tag_id");
CleverPush.getInstance(this).removeSubscriptionTag("tag_id");
CleverPush.getInstance(this).setSubscriptionAttribute("user_id", "1");

boolean hasTag = CleverPush.getInstance(this).hasSubscriptionTag(channelTags.get(0).getId());
String attributeValue = CleverPush.getInstance(this).getSubscriptionAttribute("user_id");
CleverPush.getInstance(this).setSubscriptionAttribute("user_id", "1");
{{< /highlight >}}
