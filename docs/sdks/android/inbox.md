---
id: inbox
title: Inbox View
---

## CleverPush Inbox View

You can integrate the CleverPush `InboxView` into your application to display notifications received on the device.


### Adding the InboxView to Your Layout

Include the following XML snippet in your layout file to add the `InboxView`:

```xml
<com.cleverpush.inbox.InboxView
  android:id="@+id/inboxView"
  android:layout_height="match_parent"
  android:layout_width="match_parent"
  app:combine_with_api="true"
  app:read_color="#fff"
  app:unread_color="#ccc"
  app:notification_text_color="#000"
  app:notification_text_font_family="@font/open_sans"
  app:notification_text_size="17sp"
  app:date_text_color="#000"
  app:date_text_font_family="@font/open_sans"
  app:date_text_size="12sp"
  app:divider_colour="#000"
/>
```


### Handling opened Notifications

You can handle notification clicks using the `setNotificationClickListener()` method:

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
inboxView.setNotificationClickListener(notification -> {
  // Handle the opened notification
});
```

<!--Kotlin-->

```kotlin
inboxView.setNotificationClickListener { notification ->
  // Handle the opened notification
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Mark Notification as Read

When a push notification is received in the notification center (status bar) and the user taps on it to open the app, that notification will automatically be marked as read in the `InboxView`.

You need to manually mark a notification as read, you can call `setRead(true)` on the `Notification` object when it is clicked.

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).init(
    "CHANNEL_ID",
    (NotificationReceivedListener) result -> 
        System.out.println("Received CleverPush Notification: " + result.getNotification().getTitle()),
    (NotificationOpenedListener) result -> {
        result.getNotification().setRead(true);
    },
    subscriptionId -> 
        System.out.println("CleverPush Subscription ID: " + subscriptionId)
);
```

<!--Kotlin-->

```kotlin
CleverPush.getInstance(this).init(
    "CHANNEL_ID",
    NotificationReceivedListener { result ->
        println("Received CleverPush Notification: ${result.notification.title}")
    },
    NotificationOpenedListener { result ->
        result.notification.setRead(true)
    },
    { subscriptionId ->
        println("CleverPush Subscription ID: $subscriptionId")
    }
)
```

<!--END_DOCUSAURUS_CODE_TABS-->


### Customizing InboxView

You can customize the appearance and behavior of the `InboxView` using the following XML attributes:

- `combine_with_api`: Boolean that determines whether to display locally stored notifications or remote (API-fetched) notifications. Pass `true` to retrieve notifications from the server. Pass `false` to retrieve only locally stored notifications. Default value: false
- `read_color`: Specifies the background color for read notifications.
- `unread_color`: Specifies the background color for unread notifications.
- `notification_text_color`: Sets the text color of the notification message.
- `notification_text_font_family`:  Defines the font family used for the notification text. Use `@font/your_font_name` to reference a custom font in the `res/font` directory.
- `notification_text_size`: Sets the size of the notification text.
- `date_text_color`: Specifies the color of the timestamp text.
- `date_text_font_family`: Defines the font family for the timestamp text. Use `@font/your_font_name` to apply a custom font.
- `date_text_size`: Sets the size of the timestamp text.
- `divider_colour`: Defines the color of the divider line between notifications.


💡 **Tip:** Place your custom fonts in the `res/font/` directory (e.g., `res/font/open_sans.ttf`) and reference them using `@font/open_sans`.


