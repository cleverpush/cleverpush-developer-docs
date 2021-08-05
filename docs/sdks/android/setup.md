---
id: setup
title: Setup
---

## Installation

**Prerequisite**

1. Add Firebase to your Android project.[ official docs](https://firebase.google.com/docs/android/setup) 
2. Get your  [FCM Sender ID & FCM Server API Key](https://developer.clevertap.com/docs/find-your-fcm-sender-id-fcm-server-api-key).
3. [Login/Register](https://cleverpush.com/en/) on CleverPush
4. Your CleverPush Channel ID, available in `Channels` > `App Push` > `Advanced settings` > `Channel ID`  in the CleverPush Developer console.

**SDK Setup**

1. Add the dependency to your app-level `app/build.gradle` file

    ```groovy
    dependencies {
        // ...
        implementation 'com.cleverpush:cleverpush:1.16.0'
    }
    ```

2. In the `onCreate` method of your Main activity, call `CleverPush.getInstance(this).init(...)` with your CleverPush Channel ID.

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

## Setup HMS (Huawei Mobile Services)

These additional steps are recommended if you want to support the newest Huawei devices. Please note that you need at least CleverPush Android SDK version 1.1.0.

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

6. If your App has a minSdkVersion lower than 17, please set your minSdkVersion to at least 17

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
