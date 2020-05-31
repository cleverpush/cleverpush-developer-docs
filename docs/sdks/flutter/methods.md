---
id: methods
title: Methods
---

### Usage

```dart
import 'package:cleverpush_flutter/cleverpush_flutter.dart';

void main() => runApp(new MyApp());

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => new _MyAppState();
}

class _MyAppState extends State<MyApp> {
  String _debugLabelString = "";

  @override
  void initState() {
    super.initState();
    initPlatformState();
  }

  Future<void> initPlatformState() async {
    if (!mounted) return;

    CleverPush.shared.setNotificationReceivedHandler((CPNotificationReceivedResult result) {
      print("Notification received: \n${result.notification.jsonRepresentation()}");
    });

    CleverPush.shared.setNotificationOpenedHandler((CPNotificationOpenedResult result) {
      print("Notification opened: \n${result.notification.jsonRepresentation()}");
    });

    CleverPush.shared.setSubscribedHandler((subscriptionId) {
      print("Subscribed: ${subscriptionId}");
    });

    await CleverPush.shared.init("INSERT_CLEVERPUSH_CHANNEL_ID_HERE");

    CleverPush.shared.subscribe();
  }
  
  [...]
}
```


Basic features:

```dart
CleverPush.shared.isSubscribed().then((status) {
  console.log(status);
});
CleverPush.shared.subscribe();
CleverPush.shared.unsubscribe();
```
