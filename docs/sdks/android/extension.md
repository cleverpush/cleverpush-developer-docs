---
id: extension
title: Notification Service Extension
---

On Android you can modify the notification and optionally silence it with a Notification Service Extension. Here is how to set it up:

Minimum CleverPush Android SDK Version: 1.5.0

For displaying notifications, we previously used `NotificationExtenderService`, which is now deprecated. Please use `NotificationServiceExtension` instead.

**Deprecation Notice:**

`NotificationExtenderService` is deprecated from the android sdk version 1.33.7. It is recommended to migrate to `NotificationServiceExtension`. Remove any references to `NotificationExtenderService` in your code and replace them with `NotificationServiceExtension`.

Create the `MyNotificationServiceExtension` class:

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
import android.util.Log;
import androidx.core.app.NotificationCompat;
import com.cleverpush.NotificationReceivedEvent;
import com.cleverpush.NotificationServiceExtension;
import java.math.BigInteger;

public class MyNotificationServiceExtension implements NotificationServiceExtension {
    @Override
    public void onNotificationReceived(NotificationReceivedEvent event) {
        Log.d("CleverPush", "CleverPush MyNotificationServiceExtension onNotificationReceived");

        // call `event.preventDefault()` to not display notification
        // event.preventDefault();

        // to prevent the `default` notification channel creation, use `event.getNotification().setNotificationChannel()`
        /*if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            NotificationChannel channel;
            String channelId = "channel_id"; // replace with your desired channel id
            CharSequence channelName = "Channel_Name"; // replace with your desired channel name
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            channel = new NotificationChannel(channelId, channelName, importance);
            event.getNotification().setNotificationChannel(channel);
        }*/

        // modify notification
        event.getNotification().setExtender(new NotificationCompat.Extender() {
            @Override
            public NotificationCompat.Builder extend(NotificationCompat.Builder builder) {
                builder.setColor(new BigInteger("FF00FF00", 16).intValue()); // Set notification color to green
                return builder;
            }
        });
    }
}
```

<!--Kotlin-->

```kotlin
import android.util.Log
import androidx.core.app.NotificationCompat
import com.cleverpush.NotificationReceivedEvent
import com.cleverpush.NotificationServiceExtension
import java.math.BigInteger

class MyNotificationServiceExtension : NotificationServiceExtension {
    override fun onNotificationReceived(event: NotificationReceivedEvent) {
        Log.d("CleverPush", "CleverPush MyNotificationServiceExtension onNotificationReceived")

        // call `event.preventDefault()` to not display notification
        // event.preventDefault()

        // To prevent the `default` notification channel creation, use `event.notification.setNotificationChannel()`
        /*if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channelId = "channel_id" // replace with your desired channel id
            val channelName = "Channel_Name" // replace with your desired channel name
            val importance = NotificationManager.IMPORTANCE_DEFAULT
            val channel = NotificationChannel(channelId, channelName, importance)
            event.notification.setNotificationChannel(channel)
        }*/

        // modify notification
        event.notification?.setExtender(object : NotificationCompat.Extender {
            override fun extend(builder: NotificationCompat.Builder): NotificationCompat.Builder {
                builder.setColor(BigInteger("FF00FF00", 16).intValue()) // Set notification color to green
                return builder
            }
        })
    }
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

Add this to your AndroidManifest.xml inside the `<application>` tag:

```xml
 <meta-data android:name="com.cleverpush.NotificationServiceExtension"
            android:value="com.cleverpush.cleverpush_example_android.MyNotificationServiceExtension" />
```

## Prevent Displaying Notification

It can be used to prevent displaying of notification. (`event.preventDefault();`)

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java

public class MyNotificationServiceExtension implements NotificationServiceExtension {
    @Override
    public void onNotificationReceived(NotificationReceivedEvent event) {
        // call `event.preventDefault()` to not display notification
        event.preventDefault();
        ...
    }
}

```

<!--Kotlin-->

```kotlin

class MyNotificationServiceExtension : NotificationServiceExtension {
    override fun onNotificationReceived(event: NotificationReceivedEvent) {
        // call `event.preventDefault()` to not display notification
        event.preventDefault()
        ...
    }
}

```

<!--END_DOCUSAURUS_CODE_TABS-->

## Prevent Default Notification Channel Creation

It can be used to prevent the `Default` notification channel creation, use `event.getNotification().setNotificationChannel()`

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java

public class MyNotificationServiceExtension implements NotificationServiceExtension {
    @Override
    public void onNotificationReceived(NotificationReceivedEvent event) {
        // to prevent the `default` notification channel creation, use `event.getNotification().setNotificationChannel()`
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            NotificationChannel channel;
            String channelId = "channel_id"; // replace with your desired channel id
            CharSequence channelName = "Channel_Name"; // replace with your desired channel name
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            channel = new NotificationChannel(channelId, channelName, importance);
            event.getNotification().setNotificationChannel(channel);
        }
        ...
    }
}

```

<!--Kotlin-->

```kotlin

class MyNotificationServiceExtension : NotificationServiceExtension {
    override fun onNotificationReceived(event: NotificationReceivedEvent) {
        // To prevent the `default` notification channel creation, use `event.notification.setNotificationChannel()`
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channelId = "channel_id" // replace with your desired channel id
            val channelName = "Channel_Name" // replace with your desired channel name
            val importance = NotificationManager.IMPORTANCE_DEFAULT
            val channel = NotificationChannel(channelId, channelName, importance)
            event.notification.setNotificationChannel(channel)
        }
        ...
    }
}

```

<!--END_DOCUSAURUS_CODE_TABS-->

**NotificationExtenderService Deprecated Code**

1. Create a new Class which extends `com.cleverpush.service.NotificationExtenderService`

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
import androidx.core.app.NotificationCompat;
import com.cleverpush.Notification;
import com.cleverpush.service.NotificationExtenderService;

import java.math.BigInteger;

public class MyNotificationExtenderService extends NotificationExtenderService {
	@Override
	protected boolean onNotificationProcessing(Notification notification) {
		// modify notification
		notification.setExtender(new NotificationCompat.Extender() {
			@Override
			public NotificationCompat.Builder extend(NotificationCompat.Builder builder) {
				builder.setColor(new BigInteger("FF00FF00", 16).intValue()); // Set notification color to green
				return builder;
			}
		});

		// return true to not display notification
		return false;
	}
}

```

<!--Kotlin-->

```kotlin
import androidx.core.app.NotificationCompat
import com.cleverpush.Notification
import com.cleverpush.service.NotificationExtenderService
import java.math.BigInteger

class MyNotificationExtenderService:NotificationExtenderService() {
  protected fun onNotificationProcessing(notification:Notification):Boolean {
    // modify notification
    notification.setExtender(object:NotificationCompat.Extender() {
      fun extend(builder:NotificationCompat.Builder):NotificationCompat.Builder {
        builder.setColor(BigInteger("FF00FF00", 16).toInt()) // Set notification color to green
        return builder
      }
    })
    // return true to not display notification
    return false
  }
}

```

<!--END_DOCUSAURUS_CODE_TABS-->

You can now modify the Notification with a custom [NotificationCompat.Extender](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Extender).
Also, if you return `true` the notification will not be displayed and remains silent.

2. Lastly you will need to reference your new service in the `AndroidManifest.xml` under the `application` tag

```xml
<service
    android:name=".MyNotificationExtenderService"
    android:permission="android.permission.BIND_JOB_SERVICE"
    android:exported="false">
    <intent-filter>
        <action android:name="com.cleverpush.service.NotificationExtender" />
    </intent-filter>
</service>
```

3. When you decide to not let the SDK display the notification and instead display it yourself, you will need to call this method when a Notification has been opened. Otherwise clicks will not be tracked anymore:

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).trackNotificationClicked(notification.getId());
```

<!--Kotlin-->

```kotlin
CleverPush.getInstance(this).trackNotificationClicked(notification.id)
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Send Notifications with Pop-up, Sound & Vibration, or Silent Mode

If you want to send notifications as a pop-up, with sound and vibration, or silently with vibration only, you can set a category when creating a push notification.

By default, if you create a push notification without selecting a category, it will be displayed in the status bar with sound.

You can also set a default category in the `General Settings` to avoid selecting a category manually every time you create a push notification.

![Default_Category](https://static.cleverpush.com/notification/icon/WiiWotRb7NgB9S4tK.png)

To customize the notification behavior, you can create a category and set the Importance level as follows:

`Urgent/High` – Displays a high-priority pop-up notification with sound and vibration.

`Medium` – Displays the notification with sound and vibration, but without a pop-up.

`Low` – Displays the notification without sound.

![Category](https://static.cleverpush.com/notification/icon/Muzg6n6n7ZDWAbh3i.png)

## Enable or Disable Notification Badges

You can control whether a notification displays a badge by assigning a category when creating the push notification.

When setting up a notification category, you can choose to Enable or Disable badge display. This determines whether the app icon badge count or dot will be shown for notifications in that category.

By default, if you create a push notification without selecting a category, the badge will be displayed.

![Badge](https://static-mobile.cleverpush.com/app-banner/icon/rF7qzLg4EAi9RQgCD.png)
