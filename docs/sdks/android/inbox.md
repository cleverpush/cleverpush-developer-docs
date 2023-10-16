---
id: inbox
title: Inbox View
---

## CleverPush Inbox View

Add the InboxView inside your Layout XML:

```xml
<com.cleverpush.inbox.InboxView
  android:id="@+id/inboxView"
  android:layout_height="match_parent"
  android:layout_width="match_parent"
  app:combine_with_api="true"
  app:read_color="#fff"
  app:unread_color="#ccc"
  app:notification_text_color="#000"
  app:notification_text_font_family="Open Sans"
  app:notification_text_size="17sp"
  app:date_text_color="#000"
  app:date_text_font_family="Open Sans"
  app:date_text_size="12sp"
  app:divider_colour="#000"
/>
```


Handle opened Notifications:

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
inboxView.setNotificationClickListener(notification -> {
  // do something with the opened notification
});
```

<!--END_DOCUSAURUS_CODE_TABS-->
