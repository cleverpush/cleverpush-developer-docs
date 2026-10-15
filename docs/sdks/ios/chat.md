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
CPChatView *chatView = [[CPChatView alloc] initWithFrame:CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height) urlOpenedCallback:^(NSURL *url) {
  // do something with the opened URL
} subscribeCallback:^() {
  // user has subscribed via Chat
}];

// Colors can be modified:
chatView.chatInputContainerBackgroundColor = [UIColor redColor];
chatView.chatInputBackgroundColor = [UIColor redColor];
chatView.chatInputTextColor = [UIColor redColor];
chatView.chatSenderBubbleTextColor = [UIColor redColor];
chatView.chatReceiverBubbleBackgroundColor = [UIColor redColor];
chatView.chatReceiverBubbleTextColor = [UIColor redColor];
chatView.chatSendButtonBackgroundColor = [UIColor redColor];
chatView.chatTimestampTextColor = [UIColor redColor];

```

<!--END_DOCUSAURUS_CODE_TABS-->

You can also load or lock the chat, pass custom header HTML, and register the view with the SDK.

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
let chatView = CPChatView(
    frame: CGRect(x: 0, y: 0, width: self.view.frame.size.width, height: self.view.frame.size.height),
    urlOpenedCallback: { url in
        print(url as Any)
    },
    subscribeCallback: {
        print("User subscribed via Chat")
    },
    headerCodes: "<style></style>"
)

CleverPush.addChatView(chatView)
chatView.loadChat()
chatView.loadChat(withSubscriptionId: "SUBSCRIPTION_ID")
chatView.lockChat()
```

<!--Objective-C-->

```objective-c
CPChatView *chatView = [[CPChatView alloc] initWithFrame:CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height)
                                        urlOpenedCallback:^(NSURL *url) {
    NSLog(@"%@", url);
} subscribeCallback:^{
    NSLog(@"User subscribed via Chat");
} headerCodes:@"<style></style>"];

[CleverPush addChatView:chatView];
[chatView loadChat];
[chatView loadChatWithSubscriptionId:@"SUBSCRIPTION_ID"];
[chatView lockChat];
```

<!--END_DOCUSAURUS_CODE_TABS-->
