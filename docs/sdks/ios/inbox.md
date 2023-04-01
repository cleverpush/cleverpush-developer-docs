---
id: inbox
title: Inbox View
---

## CleverPush Inbox View

You can also implement CleverPush InboxView into your application. Inbox View will come up with the package of the all the notification you have recieved with the CleverPush. To use the InboxView you will need to use the sample code as described below.

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
import CleverPush

let inboxView = CPInboxView(frame: CGRect(x: 0.0, y: 0, width: self.view.frame.size.width, height: self.view.frame.height ),
                            combine_with_api: true,
                            read_color: UIColor.white,
                            unread_color: UIColor.lightGray,
                            notification_text_color: UIColor.black,
                            notification_text_font_family: "AppleSDGothicNeo-Reguler",
                            notification_text_size: 17,
                            date_text_color: UIColor.black,
                            date_text_font_family: "AppleSDGothicNeo-Bold",
                            date_text_size: 12,
                            divider_colour: UIColor.black)

self.view.addSubview(inboxView!)
```

<!--Objective-C-->

```objective-c
#import <CleverPush/CPInboxView.h>

CPInboxView *inboxView = [[CPInboxView alloc] initWithFrame:CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height)
                                              combine_with_api:YES
                                                    read_color:UIColor.whiteColor
                                                  unread_color:UIColor.lightGrayColor
                                       notification_text_color:UIColor.blackColor
                                 notification_text_font_family:@"AppleSDGothicNeo-Reguler"
                                        notification_text_size:17
                                               date_text_color:UIColor.blackColor
                                         date_text_font_family:@"AppleSDGothicNeo-Reguler"
                                                date_text_size:12
                                                divider_colour:UIColor.blackColor];
    [self.view addSubview:inboxView];
```

<!--END_DOCUSAURUS_CODE_TABS-->


You can then get the callback events when you tapped on the any of the index from the list.

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
inboxView?.notificationClickCallback({ result in
    print(result as Any)
})
```

<!--Objective-C-->

```objective-c
[inboxView notificationClickCallback:^(CPNotification *result) {
    NSLog(@"%@", result);
}];
```

<!--END_DOCUSAURUS_CODE_TABS-->


Here is how the InboxView will looks.

![SS](https://user-images.githubusercontent.com/44965555/146535126-f41e22b2-a1aa-4466-a546-3b4157bd13f9.png)
