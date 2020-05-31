---
id: setup
title: Setup
---

### Setup

1. Add the needed libraries to your `app/build.gradle` config under `dependencies`

    ```groovy
    dependencies {
        [...]
        implementation 'com.cleverpush:cleverpush:1.0.0'
    }
    ```

2. In the `onCreate` method of your Main activity, call `CleverPush.getInstance(this).init(...)` with your CleverPush Channel ID.
    
    ```java
    public class MainActivity extends Activity {
       public void onCreate(Bundle savedInstanceState) {
           CleverPush.getInstance(this).init("CLEVERPUSH_CHANNEL_ID");
       }
    }
    ```

### Upgrading

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

### Troubleshooting

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
