---
id: inbox
title: Inbox View
---

## CleverPush Inbox View

Add the InboxView inside your Layout XML:

```xml
<com.cleverpush.inbox.InboxView
  android:layout_height="match_parent"
  android:layout_width="match_parent"
  combine_with_api="true"
  read_color="#fff"
  unread_color="#ccc"
  notification_text_color="#000"
  notification_text_font_family="Open Sans"
  notification_text_size="17"
  date_text_color="#000"
  date_text_font_family="Open Sans"
  date_text_size="12"
  divider_colour="#000"
  />
```


Handle opened Notifications:

```java
inboxView.setNotificationClickListener(notification -> {
  // do something with the opened notification
});
```
