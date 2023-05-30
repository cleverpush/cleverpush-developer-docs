---
id: chat
title: Chat
---

## CleverPush Chat View

Add the ChatView inside your Layout XML:

```xml
<com.cleverpush.chat.ChatView
  android:id="@+id/chatView"
  android:layout_height="match_parent"
  android:layout_width="match_parent"
  />
```

Handle opened URLs:

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).setChatUrlOpenedListener(url -> {
  // do something with the opened URL
});
```

<!--Kotlin-->

```kotlin
CleverPush.getInstance(this).setChatUrlOpenedListener { url ->
  // do something with the opened URL
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Customizations
Chat theme colors can be modified:

<!--DOCUSAURUS_CODE_TABS-->
<!--Java-->
```java
ChatView chatView = findViewById(R.id.chatView);

chatView.setChatBackgroundColor("#F4F6F6"); 
chatView.setChatSenderBubbleBackgroundColor("#05504F");
chatView.setChatSenderBubbleTextColor("#FFFFFF");
chatView.setChatReceiverBubbleBackgroundColor("#117864");
chatView.setChatReceiverBubbleTextColor("#FFFFFF");
chatView.setChatTimestampTextColor("#000000");
chatView.setChatSendButtonBackgroundColor("#95A5A6");
chatView.setChatInputTextColor("#05504F");
chatView.setChatInputBackgroundColor("#EAEDED");
chatView.setChatInputContainerBackgroundColor("#F4F6F6");

chatView.loadChat();
```
<!--END_DOCUSAURUS_CODE_TABS-->
