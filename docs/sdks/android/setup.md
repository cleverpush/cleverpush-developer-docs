---
id: setup
title: Setup
---

## Installation

**Prerequisite**

1. Add Firebase to your Android project. [official docs](https://firebase.google.com/docs/android/setup) 
2. Get your [FCM Sender ID & FCM Server API Key](https://developer.clevertap.com/docs/find-your-fcm-sender-id-fcm-server-api-key).
3. [Login/Register](https://cleverpush.com/en/) on CleverPush
4. Your CleverPush Channel ID, available in `Channels` > `App Push` > `Implementation` > `Channel ID`  in the CleverPush Developer console.

**SDK Setup**

You can find the newest sdk version number here [Android SDK](https://github.com/cleverpush/cleverpush-android-sdk/tags)

1. Add the dependency to your app-level `app/build.gradle` file

  ```groovy
  dependencies {
      // ...
      implementation 'com.cleverpush:cleverpush:1.35.16'
  }
  ```

2. In the `onCreate` method of your Main activity or Application, call `CleverPush.getInstance(this).init(...)` with your CleverPush Channel ID.

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
import com.cleverpush.CleverPush;

public class MainActivity extends Activity {
    public void onCreate(Bundle savedInstanceState) {
        CleverPush.getInstance(this).init("CLEVERPUSH_CHANNEL_ID");
    }
}
```

<!--Kotlin-->

```kotlin
import com.cleverpush.CleverPush;

class MainActivity:Activity() {
    fun onCreate(savedInstanceState:Bundle) {
        CleverPush.getInstance(this).init("CLEVERPUSH_CHANNEL_ID")
    }
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

3. If you didnt already do this while adding firebase to your project or you have some error logs then do/check following points

4. Put your google-services.json from firebase into the project e.g. in the app folder

5. To your project gradle add following dependency


```java
buildscript {
    dependencies {
        classpath 'com.google.gms:google-services:4.3.3'
    }
}
```

6. And add this at the end of your app gradle file

```java
apply plugin: 'com.google.gms.google-services'
googleServices { disableVersionCheck = true }
```


Please note that `autoRegister` is turned to `true` in the above example. It means that the CleverPush SDK will automatically try to subscribe the user on the first launch of the app. If you call `unsubscribe()` the SDK will not automatically try to subscribe again.

## Setup HMS (Huawei Mobile Services)

These additional steps are recommended if you want to support the newest Huawei devices. Please note that you need at least CleverPush Android SDK version 1.1.0.

Important: we highly recommend to set up different build flavors/variants for Huawei and Firebase, because Google will not allow any apps in the Play Store with the Huawei SDK. You can then upload the Huawei build to the Huawei AppGallery and the Firebase build to the Google Play Store.

1. Create a free Huawei Developer Account and get it verified:
https://developer.huawei.com/consumer/en/console

2. Create your app inside Huwei AppGallery Connect:
https://developer.huawei.com/consumer/en/doc/distribution/app/agc-create_app

3. Enable the PushKit API:
https://developer.huawei.com/consumer/en/doc/distribution/app/agc-enable_service

4. Add the following to your project level build.gradle:

    ```groovy
    buildscript {
        repositories {
            // ...
            maven { url 'http://developer.huawei.com/repo/' }
        }

        dependencies {
            // ...
            classpath 'com.huawei.agconnect:agcp:1.2.1.301'
        }
    }

    allprojects {
        repositories {
            // ...
            maven { url 'http://developer.huawei.com/repo/' }
        }
    }
    ```

5. Add the following to your app level build.gradle:

    ```groovy
    dependencies {
        // ...
        implementation 'com.huawei.hms:push:4.0.3.301'
    }

    // at the bottom
    apply plugin: "com.huawei.agconnect"
    ```

6. If your App has a minSdkVersion lower than 17, please set your minSdkVersion to at least 17.

7. Copy the agconnect-services.json file from the Huawei Developer Console inside your project's app directory.

![](https://developer.huawei.com/consumer/en/codelab/HMSPushKit/img/e3ba1922aeb8774c.png)

![](https://developer.huawei.com/consumer/en/codelab/HMSPushKit/img/1c8d1d055360d1a7.PNG)

8. Enter the App ID + App Secret in the CleverPush Channel settings.

![](https://cleverpush.zendesk.com/hc/article_attachments/360013127159/Bildschirmfoto_2020-06-13_um_13.21.40.png)


## Proguard

```java
-keep class com.cleverpush.** { *; }
-keep interface com.cleverpush.** { *; }
-keep class com.firebase.** { *; }
-keep class com.google.firebase.** { *; }
-keep class com.google.gson.internal.LinkedTreeMap { *; }
```

## Custom sounds

Android supports `mp3`, `wav` and `ogg` audio files.

1. Add the sound file(s) to the `res/raw` directory.
2. When sending a notification you can enter the filename (with extension) in the field "Sound" in the advanced settings.
3. If you send notifications via the API you can use the parameter "soundFilename".

![](https://i.ibb.co/nssvMNk/Screenshot-2021-04-02-at-12-40-24-PM.png)

## Badge icon

You can place your custom badge icon with the correct sizes in this folders, then the SDK will automatically use it:

```
/drawable-[SIZE]/cleverpush_notification_icon.png
```

## Notification open behaviour

You can add the following meta-data option to your AndroidManifest.xml file to prevent our SDK from launching any activity when a notification is opened.

When the app is in the background or killed state, clicking the notification will not open the application. It will neither call the SDK's launcher activity nor any custom launcher activity.

This meta-data option is used to prevent the app from opening when a notification is clicked.

If you want to open a custom activity when a notification is clicked, do not use this meta-data option. Instead, refer to: [Set Custom Notification Activity](https://developers.cleverpush.com/docs/sdks/android/methods#set-custom-notification-activity-enabled).

To prevent our SDK from launching the default launcher activity when a notification is opened, add the following to your AndroidManifest.xml file:

```
<meta-data android:name="com.cleverpush.notification_open_activity_disabled" android:value="true" />
```

This can be used in combination with the NotificationOpenedCallbackListener, allowing you to decide when to finish the NotificationOpenedActivity.

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
public void notificationOpenedCallback(NotificationOpenedResult result, Activity notificationOpenedActivity) {
    System.out.println("Opened CleverPush Notification: " + result.getNotification().getTitle());
    // Add your custom code here and afterwards call:
    notificationOpenedActivity.finish();
}
```

<!--Kotlin-->

```kotlin
fun notificationOpenedCallback(result: NotificationOpenedResult, notificationOpenedActivity: Activity) {
  println("Opened CleverPush Notification: ${result.notification.title}")
  // Add your custom code here and afterwards call:
  notificationOpenedActivity.finish()
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Notification appearance customization

You can add the following meta-data options to your AndroidManifest.xml file to customize the default appearance of notifications sent through the CleverPush SDK.

These meta-data options allow you to set a default notification icon and a custom notification color.

If you want to customize how your notifications look, you can use the following meta-data entries:

### Set Custom Notification Icon

You can define a custom notification icon that will be used by the CleverPush SDK for all push notifications.

#### File-based

The image must be named: ```cleverpush_notification_icon```

The SDK will automatically use this icon if it's found with the correct name.

Place your custom icon image in the appropriate drawable resource folders:

 ```bash
/res/drawable-[dpi]/cleverpush_notification_icon.png
```

Examples:

```bash
/res/drawable-mdpi/cleverpush_notification_icon.png
/res/drawable-hdpi/cleverpush_notification_icon.png
/res/drawable-xhdpi/cleverpush_notification_icon.png
/res/drawable-xxhdpi/cleverpush_notification_icon.png
/res/drawable-xxxhdpi/cleverpush_notification_icon.png
``` 

#### Meta-data Based

This meta-data option allows you to set a default icon for all notifications.

Add the following inside the <application> tag in your AndroidManifest.xml file:

```
<meta-data
  android:name="com.cleverpush.default_notification_icon"
  android:resource="@drawable/push_icon" />
```

Replace @drawable/push_icon with your custom icon.

### Set Custom Notification Color

This meta-data option allows you to set a custom color for your notifications.

Add the following inside the <application> tag in your AndroidManifest.xml file:

```
<meta-data
  android:name="com.cleverpush.default_notification_color"
  android:resource="@color/notification_color" />
```

## Notification Icon

Android provides several options for setting up icons which this guide details in full.

Android provides two types of notification icons: Small and Large. The CleverPush SDK supports customization of both to match your app style.

Android supports both Small and Large Notification Icons.

 ![](https://raw.githubusercontent.com/cleverpush/cleverpush-developer-docs/refs/heads/master/static/img/sdks/android_push_icon.png)

### Small notification icons

The small icon is shown in the status bar and next to the notification content. By default, CleverPush uses a bell icon.

You can customize the small icon using either of the following methods:

**File-based**

Place an icon file named ```cleverpush_notification_icon``` into the appropriate drawable folders:

```bash
/res/drawable-[dpi]/cleverpush_notification_icon.png
```

**Meta-data Based**

Alternatively, you can specify a custom icon using a meta-data entry in your AndroidManifest.xml:

```
<meta-data
  android:name="com.cleverpush.default_notification_icon"
  android:resource="@drawable/push_icon" />
```  

### Large notification icons

The large notification icon will show up to the left of the notification text on Android 4.0.3 - 6.0 devices and to the right for Android 7.0+ devices. 

You can set large icon from Create new -> Icon.

If you do not set a large icon, channel icon from dashborad will be used instead, if there is no channel icon set in CleverPush dashboard then it will not display large icon.

## Notification Category (Channel)

By default, if you send a push notification without selecting a category, it will be delivered via the SDK's default channel, using IMPORTANCE_DEFAULT and the device's default notification sound.

Using notification categories, you can create custom notification channels with personalized settings—such as importance level, sound, and vibration behavior, etc.

### Send Notifications with Pop-up, Sound & Vibration, or Silent Mode

If you want to send notifications as a pop-up, with sound and vibration, or silently with vibration only, you can set a category when creating a push notification.

By default, if you create a push notification without selecting a category, it will be displayed in the status bar with sound.

You can also set a default category in the `General Settings` to avoid selecting a category manually every time you create a push notification.

![Default_Category](https://static.cleverpush.com/notification/icon/WiiWotRb7NgB9S4tK.png)

To customize the notification behavior, you can create a category and set the Importance level as follows:

`Urgent/High` – Displays a high-priority pop-up notification with sound and vibration.

`Medium` – Displays the notification with sound and vibration, but without a pop-up.

`Low` – Displays the notification without sound.

![Category](https://static.cleverpush.com/notification/icon/Muzg6n6n7ZDWAbh3i.png)

### Enable or Disable Notification Badges

You can control whether a notification displays a badge by assigning a category when creating the push notification.

When setting up a notification category, you can choose to Enable or Disable badge display. This determines whether the app icon badge count or dot will be shown for notifications in that category.

By default, if you create a push notification without selecting a category, the badge will be displayed.

![Badge](https://static-mobile.cleverpush.com/app-banner/icon/rF7qzLg4EAi9RQgCD.png)

### Set Custom Sound for Notification

To send a notification with a **custom sound**, you need to configure it through a **notification category**.

1. **Select** a category when creating your push notification.
2. In notification category, in the **Sound** dropdown, choose **Custom**.
3. In the **Sound Name** field, enter the name of your custom sound file (without the file extension).

> **Example**: If your file is named `custom_notification.mp3`, enter `custom_notification` in the Sound Name field.

4. Place the sound file in your app’s `res/raw` directory.

> 📁 `app/src/main/res/raw/custom_notification.mp3`

Once configured, any push notification sent using this category will play the custom sound.

![Res_Raw](https://static-mobile.cleverpush.com/app-banner/icon/fBHPJdZohDXJ54Gt3.png)

![Push_Category_Sound](https://static-mobile.cleverpush.com/app-banner/icon/P5FG6nQcAPGGFRsc2.png)

## Badges

Unlike iOS, Android does not provide a native API to manually set or update the badge count on the app icon.

The badge count is typically updated only when the device receives a notification. Without a notification, the badge count will not change.

Some Android devices (e.g., Samsung, Xiaomi, Oppo) support numeric badge counts, while others (e.g., Google Pixel) show only a notification dot. The behavior varies based on the OEM (Original Equipment Manufacturer).

You can't update the badge count without sending a notification. However, you can send a silent notification (without sound/vibration) to update the count.

A silent notification is a type of notification that:
* Does not play a sound
* Does not vibrate the device
* Does not show a heads-up notification (popup on the screen)
* But still appears in the status bar and notification shade

## Badge Counts

Disable automatic clearing of badge count when opening a notification. Enabled by default.

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).setAutoClearBadge(false);
```

<!--Kotlin-->

```kotlin
CleverPush.getInstance(this).setAutoClearBadge(false)
```

<!--END_DOCUSAURUS_CODE_TABS-->


Enable automatic incrementation of badge count. Disabled by default.

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).setIncrementBadge(true);
```

<!--Kotlin-->

```kotlin
CleverPush.getInstance(this).setIncrementBadge(true)
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Notification permission

By default, the SDK automatically unsubscribes users who have revoked their notification permission in the Android settings.
Sometimes it still makes sense to subscribe those users (e.g. for silent notifications). You can disable this behaviour with this method call (before init).

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).setIgnoreDisabledNotificationPermission(true);
```

<!--Kotlin-->

```kotlin
CleverPush.getInstance(this).setIgnoreDisabledNotificationPermission(true)
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Using CleverPush together with other FirebaseMessagingServices

As it is only possible to have one FirebaseMessagingService registered at the same time, we recommend the following code. The CleverPush FCM Service will only process CleverPush notifications and ignore all other messages.

Create the `FirebaseMessagingServiceProxy` class:

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
import androidx.annotation.NonNull;

import com.cleverpush.service.CleverPushFcmListenerService;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class FirebaseMessagingServiceProxy extends FirebaseMessagingService {
    private final List<FirebaseMessagingService> messagingServices = new ArrayList<>(2);

    public FirebaseMessagingServiceProxy() {
        messagingServices.add(new CleverPushFcmListenerService());
        // Add any other FirebaseMessagingServices here
        messagingServices.add(new CustomFirebaseMessagingService());
    }

    @Override
    public void onNewToken(@NonNull String token) {
        delegate(service -> {
            injectContext(service);
            service.onNewToken(token);
        });
    }

    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
        delegate(service -> {
            injectContext(service);
            service.onMessageReceived(remoteMessage);
        });
    }

    private void delegate(CPAction<FirebaseMessagingService> action) {
        for (FirebaseMessagingService service : messagingServices) {
            action.run(service);
        }
    }

    private void injectContext(FirebaseMessagingService service) {
        setField(service, "mBase", this);
    }

    private boolean setField(Object targetObject, String fieldName, Object fieldValue) {
        Field field;
        try {
            field = targetObject.getClass().getDeclaredField(fieldName);
        } catch (NoSuchFieldException e) {
            field = null;
        }
        Class superClass = targetObject.getClass().getSuperclass();
        while (field == null && superClass != null) {
            try {
                field = superClass.getDeclaredField(fieldName);
            } catch (NoSuchFieldException e) {
                superClass = superClass.getSuperclass();
            }
        }
        if (field == null) {
            return false;
        }
        field.setAccessible(true);
        try {
            field.set(targetObject, fieldValue);
            return true;
        } catch (IllegalAccessException e) {
            return false;
        }
    }

    interface CPAction<T> {
        void run(T t);
    }
}
```

<!--Kotlin-->

```kotlin
import androidx.annotation.NonNull
import com.cleverpush.service.CleverPushFcmListenerService
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import java.lang.reflect.Field

class FirebaseMessagingServiceProxy : FirebaseMessagingService() {
    private val messagingServices = listOf<CleverPushFcmListenerService>(
        CleverPushFcmListenerService(),
        // Add any other FirebaseMessagingServices here
        CustomFirebaseMessagingService()
    )

    override fun onNewToken(@NonNull token: String) {
        delegate { service ->
            injectContext(service)
            service.onNewToken(token)
        }
    }

    override fun onMessageReceived(@NonNull remoteMessage: RemoteMessage) {
        delegate { service ->
            injectContext(service)
            service.onMessageReceived(remoteMessage)
        }
    }

    private fun delegate(action: (FirebaseMessagingService) -> Unit) {
        messagingServices.forEach(action)
    }

    private fun injectContext(service: FirebaseMessagingService) {
        setField(service, "mBase", this)
    }

    private fun setField(targetObject: Any, fieldName: String, fieldValue: Any): Boolean {
        var field: Field? = null
        try {
            field = targetObject.javaClass.getDeclaredField(fieldName)
        } catch (e: NoSuchFieldException) {
            var superClass: Class<*>? = targetObject.javaClass.superclass
            while (field == null && superClass != null) {
                try {
                    field = superClass.getDeclaredField(fieldName)
                } catch (e: NoSuchFieldException) {
                    superClass = superClass.superclass
                }
            }
        }
        if (field == null) {
            return false
        }
        field.isAccessible = true
        try {
            field.set(targetObject, fieldValue)
            return true
        } catch (e: IllegalAccessException) {
            return false
        }
    }
}
```

<!--END_DOCUSAURUS_CODE_TABS-->


Add this to your AndroidManifest.xml inside the `<application>` tag:

```xml
<service
    android:name=".FirebaseMessagingServiceProxy"
    android:exported="false">
    <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT" />
    </intent-filter>
</service>
```

If you're only looking to customize the incoming CleverPush notifications, please look at the "Notification Service Extension" in the left menu.
