---
id: upgrading
title: Upgrading
---
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
