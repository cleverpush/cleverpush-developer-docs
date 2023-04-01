---
id: chat
title: Chat
---

## CleverPush Chat View

Add the ChatView inside your Layout XML:

```xml
<com.cleverpush.chat.ChatView
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

<!--END_DOCUSAURUS_CODE_TABS-->
