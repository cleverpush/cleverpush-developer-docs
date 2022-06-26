---
id: chat
title: Chat
---

## CleverPush Chat View

1. Import the Chat View:

```dart
import 'package:cleverpush_flutter/cleverpush_chat_view.dart';
```

2. Add the Chat View:

```dart
return new Scaffold(
  appBar: AppBar(
    title: const Text('Chat View'),
  ),
  body: new Container(
    child: CleverPushChatView(
      
    ),
  ),
);
```

Handle opened URLs in the chat:

```dart
CleverPush.shared.setChatUrlOpenedHandler((url) {
  Widget continueButton = TextButton(
    child: Text("Ok"),
    onPressed: () => Navigator.pop(context, 'Ok'),
  );
  showDialog<String>(
    context: context,
    builder: (BuildContext context) => AlertDialog(
      title: const Text('Chat URL opened'),
      content: Text(url),
      actions: <Widget>[
        continueButton,
      ],
    ),
  );
});
```

Change the primary branding color:

```dart
CleverPush.shared.setBrandingColor("#ff0000")
```
