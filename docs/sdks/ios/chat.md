---
id: chat
title: Chat
---

## CleverPush Chat View

Objective-C:
1. Import "CleverPush/CPChatView.h":
2. Add the Chat View:

```objective-c
#import <CleverPush/CPChatView.h>

CPChatView *chatView = [[CPChatView alloc] initWithFrame:CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height)];
[self.view addSubview:chatView];
```
Swift:
1. Import CleverPush
2. Add the Chat View:

```swift
import CleverPush

let chatView = CPChatView(frame: CGRect(x: 0, y: 0, width: self.view.frame.size.width, height: self.view.frame.size.height))
self.view.addSubview(chatView)
```


Handle opened URLs:

```objective-c
[[CPChatView alloc] initWithFrame:CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height) urlOpenedCallback:^(NSURL *url) {
  // do something with the opened URL
} subscribeCallback:^() {
  // user has subscribed via Chat
}];
```