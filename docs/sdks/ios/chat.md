---
id: chat
title: Chat
---

## Chat
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
