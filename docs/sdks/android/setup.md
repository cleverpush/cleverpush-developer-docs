---
id: setup
title: Setup
---

## Setup

1. Setup Firebase inside your Android App and register the Sender ID and the API Key inside the CleverPush Channel settings. Please refer to the official docs: https://firebase.google.com/docs/android/setup

2. Add the needed libraries to your `app/build.gradle` config under `dependencies`

    ```groovy
    dependencies {
        // ...
        implementation 'com.cleverpush:cleverpush:1.8.7'
    }
    ```

3. In the `onCreate` method of your Main activity, call `CleverPush.getInstance(this).init(...)` with your CleverPush Channel ID.
    
    ```java
    public class MainActivity extends Activity {
       public void onCreate(Bundle savedInstanceState) {
           CleverPush.getInstance(this).init("CLEVERPUSH_CHANNEL_ID");
       }
    }
    ```

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


## Upgrading

**1.0.0**

Breaking Changes

1. Migrated to AndroidX, see: https://developer.android.com/jetpack/androidx/migrate

2. Needed minSdkVersion in build.gradle: 16

3. You can remove the following lines from your AndroidManifest.xml file:
   ```xml
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
    ```

## Troubleshooting

File google-services.json is missing. The Google Services Plugin cannot function without it.

Please make sure to set up a project in the Firebase console, you can download this file there and place it inside your project: https://console.firebase.google.com/

If you use ProGuard, you may need to add these exceptions:

```java
-keep class com.cleverpush.** { *; }
-keep interface com.cleverpush.** { *; }
```

If you are not using Java 1.8 yet, please add this to your `app/build.gradle` if building fails with our SDK:

```groovy
android {
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}
```

In project 'app' a resolved Google Play services library dependency depends on another at an exact version (...):

Add the following line at the bottom of `app/build.gradle`:

```groovy
googleServices { disableVersionCheck = true }
```


Huawei Certificate Error:

https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/game-preparation-v4#certificate


## Custom sounds

Android supports `mp3`, `wav` and `ogg` audio files.

1. Add the sound file(s) to the `res/raw` directory.
2. When sending a notification you can enter the filename (with extension) in the field "Sound" in the advanced settings.
3. If you send notifications via the API you can use the parameter "soundFilename".


## Badge icon

You can place your custom badge icon with the correct sizes in this folders, then the SDK will automatically use it:

```
/drawable-[SIZE]/cleverpush_notification_icon.png
```
