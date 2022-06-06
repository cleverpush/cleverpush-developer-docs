---
id: stories
title: Stories
---

## CleverPush Story Widget

You can also implement CleverPush Stories into your application. For this, please set up a Story Widget in your CleverPush account. You can access stories via generated Widget Id and by following usage guide

Here is how the Stories will looks like:

![StoryBanner](https://user-images.githubusercontent.com/44965555/125643070-36a7fa6c-959f-4c6e-93e1-c73e9ac17886.png)
![StoryDetails](https://user-images.githubusercontent.com/44965555/125647371-a6d557e4-490e-4111-9276-7bd221e11cad.png)

Objective-C:
1. Import "CleverPush/CPStoryView.h":
2. Add the Story View:

```objective-c
#import <CleverPush/CPStoryView.h>

CPStoryView *storyView = [[CPStoryView alloc] 
initWithFrame:CGRectMake(0.0, 83.0, self.view.frame.size.width, 125.0)
                            backgroundColor:[UIColor greenColor]
                            textColor:[UIColor blackColor]
                            fontFamily:@"AppleSDGothicNeo-Bold"
                            borderColor:[UIColor redColor]
                            storyWidgetId:@"STORY_WIDGET_ID"];

[self.view addSubview:storyView];
```
Swift:
1. Import CleverPush
2. Add the Story View:

```swift
import CleverPush

let storyView = CPStoryView(frame: CGRect(x: 0.0, y: 83.0, width: self.view.frame.size.width, height: 125.0 ),
            backgroundColor: UIColor.green,
            textColor: UIColor.black,
            fontFamily: "AppleSDGothicNeo-Bold",
            borderColor: UIColor.red,
            storyWidgetId: "STORY_WIDGET_ID")!

self.view.addSubview(storyView)
```