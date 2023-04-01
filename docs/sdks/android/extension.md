---
id: extension
title: Notification Extender Service
---

On Android you can modify the notification and optionally silence it with a Notification Extender Service. Here is how to set it up:

Minimum Android SDK Version: 1.5.0

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

<!--END_DOCUSAURUS_CODE_TABS-->
