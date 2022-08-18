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

1. Add the dependency to your app-level `app/build.gradle` file

    ```groovy
    dependencies {
        // ...
        implementation 'com.cleverpush:cleverpush:1.24.0'
    }
    ```

2. In the `onCreate` method of your Main activity or Application, call `CleverPush.getInstance(this).init(...)` with your CleverPush Channel ID.

	**JAVA**
	```java
		public class MainActivity extends Activity {
		   public void onCreate(Bundle savedInstanceState) {
			   CleverPush.getInstance(this).init("CLEVERPUSH_CHANNEL_ID");
		   }
		}
	```
	**KOTLIN**
	```kotlin
	   class MainActivity:Activity() {
		 fun onCreate(savedInstanceState:Bundle) {
			CleverPush.getInstance(this).init("CLEVERPUSH_CHANNEL_ID")
	  }
	}	```

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

You can place this meta data option in your AndroidManifest.xml file to prevent our SDK from starting your launcher activity when a notification is opened:

```
<meta-data android:name="com.cleverpush.notification_open_activity_disabled" android:value="true" />
```

## Badge Counts

Disable automatic clearing of badge count when opening a notification. Enabled by default.

**JAVA**
```java
CleverPush.getInstance(this).setAutoClearBadge(false);
```

**KOTLIN**
```kotlin
CleverPush.getInstance(this).setAutoClearBadge(false)
```

Enable automatic incrementation of badge count. Disabled by default.

**JAVA**
```java
CleverPush.getInstance(this).setIncrementBadge(false);
```

**KOTLIN**
```kotlin
CleverPush.getInstance(this).setIncrementBadge(false)
```

## Notification permission

By default, the SDK automatically unsubscribes users who have revoked their notification permission in the Android settings.
Sometimes it still makes sense to subscribe those users (e.g. for silent notifications). You can disable this behaviour with this method call (before init).

```java
CleverPush.getInstance(this).setIgnoreDisabledNotificationPermission(true);
```


## Using CleverPush together with other FirebaseMessagingServices

As it is only possible to have one FirebaseMessagingService registered at the same time, we recommend the following code. The CleverPush FCM Service will only process CleverPush notifications and ignore all other messages.

Create the FirebaseMessagingServiceProxy class:

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

If you're only looking to customize the incoming CleverPush notifications, please look at the "Notification Extender Service" in the left menu.
