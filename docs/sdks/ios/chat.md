---
id: chat
title: Chat
---

## CleverPush Chat View

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
import CleverPush

let chatView = CPChatView(frame: CGRect(x: 0, y: 0, width: self.view.frame.size.width, height: self.view.frame.size.height))
self.view.addSubview(chatView)
```

<!--Objective-C-->

```objective-c
#import <CleverPush/CPChatView.h>

CPChatView *chatView = [[CPChatView alloc] initWithFrame:CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height)];
[self.view addSubview:chatView];
```

<!--END_DOCUSAURUS_CODE_TABS-->


Handle opened URLs:

<!--DOCUSAURUS_CODE_TABS-->

<!--Objective-C-->

```objective-c
[[CPChatView alloc] initWithFrame:CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height) urlOpenedCallback:^(NSURL *url) {
  // do something with the opened URL
} subscribeCallback:^() {
  // user has subscribed via Chat
}];
```

<!--END_DOCUSAURUS_CODE_TABS-->
