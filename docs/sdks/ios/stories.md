---
id: stories
title: Stories
---

## CleverPush Story Widget

You can also implement CleverPush Stories into your application. For this, please set up a Story Widget in your CleverPush account. You can access stories via generated Widget Id and by following usage guide

### Story View

1. For a Round-Shaped Story Widget

![Round_Shaped](https://static.cleverpush.com/notification/icon/6Bphsyhtq47GyJKQw.png)

2. For a Rectangular-Shaped Story Widget

![Rectangular_Shaped](https://static.cleverpush.com/notification/icon/SfGMjEsRHNjSRwiyN.png)

3. For a Rectangular-Shaped Story Widget with Shadow

![Rectangular_Shaped_Shadow](https://static.cleverpush.com/notification/icon/JvE9zjCou3Tyrt4ug.png)

4. For Displaying the Unread Count in the Story Widget

![Unread_count](https://static.cleverpush.com/notification/icon/GMoAf5o4qwnqRpjPa.png)

5. For Displaying Only 3 Items in the Story Widget According to Screen Width

![three_item](https://static.cleverpush.com/notification/icon/RoWJTwRsKtrCDEtWT.png)

6. For Displaying the Unread Count and Only 3 Items in the Story Widget According to Screen Width

![Unread_count_three_item](https://static.cleverpush.com/notification/icon/AWQqEQ2ucSrWPag9s.png)

### Story Player

![Screenshot_1626271443](https://user-images.githubusercontent.com/42137835/125640072-5c155112-5a66-4bd9-9c93-055d9b3159f5.png)

### How to use

1. For a Round-Shaped Story Widget

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
//Using a CPStoryView with frame
import CleverPush

let storyView = CPStoryView(
            frame: CGRect(x: 15, y: 0, width: self.view.frame.size.width - 30, height: 100),
            backgroundColor: .clear,
            textColor: .black,
            fontFamily: "AppleSDGothicNeo-Bold",
            borderColor: .yellow,
            titleVisibility: true,
            titleTextSize: 10,
            storyIconHeight: 70,
            storyIconWidth: 70,
            storyIconCornerRadius: 35,
            storyIconSpacing: 0,
            storyIconBorderVisibility: true,
            storyIconBorderMargin: 0,
            storyIconBorderWidth: 2,
            storyIconShadow: false,
            storyRestrictToItems: 3,
            unreadStoryCountVisibility: false,
            unreadStoryCountBackgroundColor: .red,
            unreadStoryCountTextColor: .white,
            storyViewCloseButtonPosition: .leftSide,
            storyViewTextPosition: .insideBottom,
            storyWidgetShareButtonVisibility: false,
            sortToLastIndex: true,
            allowAutoRotation: true,
            widgetId: "CyELm3daayQGuSGTD"
        )

        self.view.addSubview(storyView!)

//Using a CPStoryView with autolayout
storyView.configure(
            withFrame:storyView.frame,
            backgroundColor: .clear,
            textColor: .black,
            fontFamily: "AppleSDGothicNeo-Bold",
            borderColor: .yellow,
            titleVisibility: true,
            titleTextSize: 10,
            storyIconHeight: 70,
            storyIconWidth: 70,
            storyIconCornerRadius: 35,
            storyIconSpacing: 0,
            storyIconBorderVisibility: true,
            storyIconBorderMargin: 0,
            storyIconBorderWidth: 2,
            storyIconShadow: false,
            storyRestrictToItems: 3,
            unreadStoryCountVisibility: false,
            unreadStoryCountBackgroundColor: .red,
            unreadStoryCountTextColor: .white,
            storyViewCloseButtonPosition: .leftSide,
            storyViewTextPosition: .insideBottom,
            storyWidgetShareButtonVisibility: false,
            sortToLastIndex: true,
            allowAutoRotation: true,
            widgetId: "CyELm3daayQGuSGTD"
        )
```

<!--Objective-C-->

```objective-c
//Using a CPStoryView with frame
#import <CleverPush/CPStoryView.h>

CPStoryView *storyView = [[CPStoryView alloc] 
        initWithFrame:CGRectMake(15, 0, self.viewBG.frame.size.width - 30, 100) 
        backgroundColor:[UIColor clearColor] 
        textColor:[UIColor blackColor] 
        fontFamily:@"AppleSDGothicNeo-Bold" 
        borderColor:[UIColor yellowColor] 
        titleVisibility:YES 
        titleTextSize:10 
        storyIconHeight:70 
        storyIconWidth:70 
        storyIconCornerRadius:35 
        storyIconSpacing:0 
        storyIconBorderVisibility:YES 
        storyIconBorderMargin:0 
        storyIconBorderWidth:2.5 
        storyIconShadow:NO 
        storyRestrictToItems:3 
        unreadStoryCountVisibility:NO 
        unreadStoryCountBackgroundColor:[UIColor redColor] 
        unreadStoryCountTextColor:[UIColor whiteColor] 
        storyViewCloseButtonPosition:CPStoryWidgetCloseButtonPositionLeftSide 
        storyViewTextPosition:CPStoryWidgetTextPositionInsideBottom 
        storyWidgetShareButtonVisibility:NO 
        sortToLastIndex:YES
        allowAutoRotation:YES
        widgetId:@"CyELm3daayQGuSGTD"];

[self.view addSubview:storyView];

//Using a CPStoryView with autolayout
[self.storyView configureWithFrame:self.storyView.frame
        backgroundColor:[UIColor clearColor] 
        textColor:[UIColor blackColor] 
        fontFamily:@"AppleSDGothicNeo-Bold" 
        borderColor:[UIColor yellowColor] 
        titleVisibility:YES 
        titleTextSize:10 
        storyIconHeight:70 
        storyIconWidth:70 
        storyIconCornerRadius:35 
        storyIconSpacing:0 
        storyIconBorderVisibility:YES 
        storyIconBorderMargin:0 
        storyIconBorderWidth:2.5 
        storyIconShadow:NO 
        storyRestrictToItems:3 
        unreadStoryCountVisibility:NO 
        unreadStoryCountBackgroundColor:[UIColor redColor] 
        unreadStoryCountTextColor:[UIColor whiteColor] 
        storyViewCloseButtonPosition:CPStoryWidgetCloseButtonPositionLeftSide 
        storyViewTextPosition:CPStoryWidgetTextPositionInsideBottom 
        storyWidgetShareButtonVisibility:NO 
        sortToLastIndex:YES
        allowAutoRotation:YES
        widgetId:@"CyELm3daayQGuSGTD"];
```

<!--END_DOCUSAURUS_CODE_TABS-->

2. For a Rectangular-Shaped Story Widget

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
//Using a CPStoryView with frame
import CleverPush

let storyView = CPStoryView(
            frame: CGRect(x: 15, y: 0, width: self.view.frame.size.width - 30, height: 100),
            backgroundColor: .clear,
            textColor: .black,
            fontFamily: "AppleSDGothicNeo-Bold",
            borderColor: .yellow,
            titleVisibility: true,
            titleTextSize: 10,
            storyIconHeight: 70,
            storyIconWidth: 70,
            storyIconCornerRadius: 10,
            storyIconSpacing: 0,
            storyIconBorderVisibility: true,
            storyIconBorderMargin: 0,
            storyIconBorderWidth: 2,
            storyIconShadow: false,
            storyRestrictToItems: 3,
            unreadStoryCountVisibility: false,
            unreadStoryCountBackgroundColor: .red,
            unreadStoryCountTextColor: .white,
            storyViewCloseButtonPosition: .leftSide,
            storyViewTextPosition: .insideBottom,
            storyWidgetShareButtonVisibility: false,
            sortToLastIndex: true,
            allowAutoRotation: true,
            widgetId: "CyELm3daayQGuSGTD"
        )

        self.view.addSubview(storyView!)

//Using a CPStoryView with autolayout
storyView.configure(
            withFrame:storyView.frame,
            backgroundColor: .clear,
            textColor: .black,
            fontFamily: "AppleSDGothicNeo-Bold",
            borderColor: .yellow,
            titleVisibility: true,
            titleTextSize: 10,
            storyIconHeight: 70,
            storyIconWidth: 70,
            storyIconCornerRadius: 10,
            storyIconSpacing: 0,
            storyIconBorderVisibility: true,
            storyIconBorderMargin: 0,
            storyIconBorderWidth: 2,
            storyIconShadow: false,
            storyRestrictToItems: 3,
            unreadStoryCountVisibility: false,
            unreadStoryCountBackgroundColor: .red,
            unreadStoryCountTextColor: .white,
            storyViewCloseButtonPosition: .leftSide,
            storyViewTextPosition: .insideBottom,
            storyWidgetShareButtonVisibility: false,
            sortToLastIndex: true,
            allowAutoRotation: true,
            widgetId: "CyELm3daayQGuSGTD"
        )
```

<!--Objective-C-->

```objective-c
//Using a CPStoryView with frame
#import <CleverPush/CPStoryView.h>

CPStoryView *storyView = [[CPStoryView alloc] 
        initWithFrame:CGRectMake(15, 0, self.viewBG.frame.size.width - 30, 100) 
        backgroundColor:[UIColor clearColor] 
        textColor:[UIColor blackColor] 
        fontFamily:@"AppleSDGothicNeo-Bold" 
        borderColor:[UIColor yellowColor] 
        titleVisibility:YES 
        titleTextSize:10 
        storyIconHeight:70 
        storyIconWidth:70 
        storyIconCornerRadius:10 
        storyIconSpacing:0 
        storyIconBorderVisibility:YES 
        storyIconBorderMargin:0 
        storyIconBorderWidth:2.5 
        storyIconShadow:NO 
        storyRestrictToItems:3 
        unreadStoryCountVisibility:NO 
        unreadStoryCountBackgroundColor:[UIColor redColor] 
        unreadStoryCountTextColor:[UIColor whiteColor] 
        storyViewCloseButtonPosition:CPStoryWidgetCloseButtonPositionLeftSide 
        storyViewTextPosition:CPStoryWidgetTextPositionInsideBottom 
        storyWidgetShareButtonVisibility:NO 
        sortToLastIndex:YES
        allowAutoRotation:YES
        widgetId:@"CyELm3daayQGuSGTD"];

[self.view addSubview:storyView];

//Using a CPStoryView with autolayout
[self.storyView configureWithFrame:self.storyView.frame
        backgroundColor:[UIColor clearColor] 
        textColor:[UIColor blackColor] 
        fontFamily:@"AppleSDGothicNeo-Bold" 
        borderColor:[UIColor yellowColor] 
        titleVisibility:YES 
        titleTextSize:10 
        storyIconHeight:70 
        storyIconWidth:70 
        storyIconCornerRadius:10 
        storyIconSpacing:0 
        storyIconBorderVisibility:YES 
        storyIconBorderMargin:0 
        storyIconBorderWidth:2.5 
        storyIconShadow:NO 
        storyRestrictToItems:3 
        unreadStoryCountVisibility:NO 
        unreadStoryCountBackgroundColor:[UIColor redColor] 
        unreadStoryCountTextColor:[UIColor whiteColor] 
        storyViewCloseButtonPosition:CPStoryWidgetCloseButtonPositionLeftSide 
        storyViewTextPosition:CPStoryWidgetTextPositionInsideBottom 
        storyWidgetShareButtonVisibility:NO 
        sortToLastIndex:YES
        allowAutoRotation:YES
        widgetId:@"CyELm3daayQGuSGTD"];
```

<!--END_DOCUSAURUS_CODE_TABS-->

3. For a Rectangular-Shaped Story Widget with Shadow

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
//Using a CPStoryView with frame
import CleverPush

let storyView = CPStoryView(
            frame: CGRect(x: 15, y: 0, width: self.view.frame.size.width - 30, height: 100),
            backgroundColor: .clear,
            textColor: .black,
            fontFamily: "AppleSDGothicNeo-Bold",
            borderColor: .yellow,
            titleVisibility: true,
            titleTextSize: 10,
            storyIconHeight: 70,
            storyIconWidth: 70,
            storyIconCornerRadius: 10,
            storyIconSpacing: 0,
            storyIconBorderVisibility: true,
            storyIconBorderMargin: 0,
            storyIconBorderWidth: 2,
            storyIconShadow: true,
            storyRestrictToItems: 3,
            unreadStoryCountVisibility: false,
            unreadStoryCountBackgroundColor: .red,
            unreadStoryCountTextColor: .white,
            storyViewCloseButtonPosition: .leftSide,
            storyViewTextPosition: .insideBottom,
            storyWidgetShareButtonVisibility: false,
            sortToLastIndex: true,
            allowAutoRotation: true,
            widgetId: "CyELm3daayQGuSGTD"
        )

        self.view.addSubview(storyView!)

//Using a CPStoryView with autolayout
storyView.configure(
            withFrame:storyView.frame,
            backgroundColor: .clear,
            textColor: .black,
            fontFamily: "AppleSDGothicNeo-Bold",
            borderColor: .yellow,
            titleVisibility: true,
            titleTextSize: 10,
            storyIconHeight: 70,
            storyIconWidth: 70,
            storyIconCornerRadius: 10,
            storyIconSpacing: 0,
            storyIconBorderVisibility: true,
            storyIconBorderMargin: 0,
            storyIconBorderWidth: 2,
            storyIconShadow: true,
            storyRestrictToItems: 3,
            unreadStoryCountVisibility: false,
            unreadStoryCountBackgroundColor: .red,
            unreadStoryCountTextColor: .white,
            storyViewCloseButtonPosition: .leftSide,
            storyViewTextPosition: .insideBottom,
            storyWidgetShareButtonVisibility: false,
            sortToLastIndex: true,
            allowAutoRotation: true,
            widgetId: "CyELm3daayQGuSGTD"
        )
```

<!--Objective-C-->

```objective-c
//Using a CPStoryView with frame
#import <CleverPush/CPStoryView.h>

CPStoryView *storyView = [[CPStoryView alloc] 
        initWithFrame:CGRectMake(15, 0, self.viewBG.frame.size.width - 30, 100) 
        backgroundColor:[UIColor clearColor] 
        textColor:[UIColor blackColor] 
        fontFamily:@"AppleSDGothicNeo-Bold" 
        borderColor:[UIColor yellowColor] 
        titleVisibility:YES 
        titleTextSize:10 
        storyIconHeight:70 
        storyIconWidth:70 
        storyIconCornerRadius:10 
        storyIconSpacing:0 
        storyIconBorderVisibility:YES 
        storyIconBorderMargin:0 
        storyIconBorderWidth:2.5 
        storyIconShadow:true 
        storyRestrictToItems:3 
        unreadStoryCountVisibility:NO 
        unreadStoryCountBackgroundColor:[UIColor redColor] 
        unreadStoryCountTextColor:[UIColor whiteColor] 
        storyViewCloseButtonPosition:CPStoryWidgetCloseButtonPositionLeftSide 
        storyViewTextPosition:CPStoryWidgetTextPositionInsideBottom 
        storyWidgetShareButtonVisibility:NO 
        sortToLastIndex:YES 
        allowAutoRotation:YES
        widgetId:@"CyELm3daayQGuSGTD"];

[self.view addSubview:storyView];

//Using a CPStoryView with autolayout
[self.storyView configureWithFrame:self.storyView.frame 
        backgroundColor:[UIColor clearColor] 
        textColor:[UIColor blackColor] 
        fontFamily:@"AppleSDGothicNeo-Bold" 
        borderColor:[UIColor yellowColor] 
        titleVisibility:YES 
        titleTextSize:10 
        storyIconHeight:70 
        storyIconWidth:70 
        storyIconCornerRadius:10 
        storyIconSpacing:0 
        storyIconBorderVisibility:YES 
        storyIconBorderMargin:0 
        storyIconBorderWidth:2.5 
        storyIconShadow:true 
        storyRestrictToItems:3 
        unreadStoryCountVisibility:NO 
        unreadStoryCountBackgroundColor:[UIColor redColor] 
        unreadStoryCountTextColor:[UIColor whiteColor] 
        storyViewCloseButtonPosition:CPStoryWidgetCloseButtonPositionLeftSide 
        storyViewTextPosition:CPStoryWidgetTextPositionInsideBottom 
        storyWidgetShareButtonVisibility:NO 
        sortToLastIndex:YES 
        allowAutoRotation:YES
        widgetId:@"CyELm3daayQGuSGTD"];
```

<!--END_DOCUSAURUS_CODE_TABS-->

4. For Displaying the Unread Count in the Story Widget

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
//Using a CPStoryView with frame
import CleverPush

let storyView = CPStoryView(
            frame: CGRect(x: 15, y: 0, width: self.view.frame.size.width - 30, height: 100),
            backgroundColor: .clear,
            textColor: .black,
            fontFamily: "AppleSDGothicNeo-Bold",
            borderColor: .yellow,
            titleVisibility: true,
            titleTextSize: 10,
            storyIconHeight: 70,
            storyIconWidth: 70,
            storyIconCornerRadius: 10,
            storyIconSpacing: 0,
            storyIconBorderVisibility: true,
            storyIconBorderMargin: 0,
            storyIconBorderWidth: 2,
            storyIconShadow: true,
            storyRestrictToItems: 3,
            unreadStoryCountVisibility: true,
            unreadStoryCountBackgroundColor: .red,
            unreadStoryCountTextColor: .white,
            storyViewCloseButtonPosition: .leftSide,
            storyViewTextPosition: .insideBottom,
            storyWidgetShareButtonVisibility: false,
            sortToLastIndex: true,
            allowAutoRotation: true,
            widgetId: "CyELm3daayQGuSGTD"
        )

        self.view.addSubview(storyView!)

//Using a CPStoryView with autolayout
storyView.configure(
            withFrame:storyView.frame,
            backgroundColor: .clear,
            textColor: .black,
            fontFamily: "AppleSDGothicNeo-Bold",
            borderColor: .yellow,
            titleVisibility: true,
            titleTextSize: 10,
            storyIconHeight: 70,
            storyIconWidth: 70,
            storyIconCornerRadius: 10,
            storyIconSpacing: 0,
            storyIconBorderVisibility: true,
            storyIconBorderMargin: 0,
            storyIconBorderWidth: 2,
            storyIconShadow: true,
            storyRestrictToItems: 3,
            unreadStoryCountVisibility: true,
            unreadStoryCountBackgroundColor: .red,
            unreadStoryCountTextColor: .white,
            storyViewCloseButtonPosition: .leftSide,
            storyViewTextPosition: .insideBottom,
            storyWidgetShareButtonVisibility: false,
            sortToLastIndex: true,
            allowAutoRotation: true,
            widgetId: "CyELm3daayQGuSGTD"
        )
```

<!--Objective-C-->

```objective-c
//Using a CPStoryView with frame
#import <CleverPush/CPStoryView.h>

CPStoryView *storyView = [[CPStoryView alloc] 
        initWithFrame:CGRectMake(15, 0, self.viewBG.frame.size.width - 30, 100) 
        backgroundColor:[UIColor clearColor] 
        textColor:[UIColor blackColor] 
        fontFamily:@"AppleSDGothicNeo-Bold" 
        borderColor:[UIColor yellowColor] 
        titleVisibility:YES 
        titleTextSize:10 
        storyIconHeight:70 
        storyIconWidth:70 
        storyIconCornerRadius:10 
        storyIconSpacing:0 
        storyIconBorderVisibility:YES 
        storyIconBorderMargin:0 
        storyIconBorderWidth:2.5 
        storyIconShadow:true 
        storyRestrictToItems:3 
        unreadStoryCountVisibility:YES 
        unreadStoryCountBackgroundColor:[UIColor redColor] 
        unreadStoryCountTextColor:[UIColor whiteColor] 
        storyViewCloseButtonPosition:CPStoryWidgetCloseButtonPositionLeftSide 
        storyViewTextPosition:CPStoryWidgetTextPositionInsideBottom 
        storyWidgetShareButtonVisibility:NO 
        sortToLastIndex:YES 
        allowAutoRotation:YES
        widgetId:@"CyELm3daayQGuSGTD"];

[self.view addSubview:storyView];

//Using a CPStoryView with autolayout
[self.storyView configureWithFrame:self.storyView.frame 
        backgroundColor:[UIColor clearColor] 
        textColor:[UIColor blackColor] 
        fontFamily:@"AppleSDGothicNeo-Bold" 
        borderColor:[UIColor yellowColor] 
        titleVisibility:YES 
        titleTextSize:10 
        storyIconHeight:70 
        storyIconWidth:70 
        storyIconCornerRadius:10 
        storyIconSpacing:0 
        storyIconBorderVisibility:YES 
        storyIconBorderMargin:0 
        storyIconBorderWidth:2.5 
        storyIconShadow:true 
        storyRestrictToItems:3 
        unreadStoryCountVisibility:YES 
        unreadStoryCountBackgroundColor:[UIColor redColor] 
        unreadStoryCountTextColor:[UIColor whiteColor] 
        storyViewCloseButtonPosition:CPStoryWidgetCloseButtonPositionLeftSide 
        storyViewTextPosition:CPStoryWidgetTextPositionInsideBottom 
        storyWidgetShareButtonVisibility:NO 
        sortToLastIndex:YES 
        allowAutoRotation:YES
        widgetId:@"CyELm3daayQGuSGTD"];
```

<!--END_DOCUSAURUS_CODE_TABS-->

5. For Displaying Only 3 Items in the Story Widget According to Screen Width

Note: Set `storyRestrictToItems` value in integer, and then the story view icon's width will be dynamic based on the device's width and number of stories will be displayed based on that integer value.

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
//Using a CPStoryView with frame
import CleverPush

let storyView = CPStoryView(
            frame: CGRect(x: 15, y: 0, width: self.view.frame.size.width - 30, height: 100),
            backgroundColor: .clear,
            textColor: .black,
            fontFamily: "AppleSDGothicNeo-Bold",
            borderColor: .yellow,
            titleVisibility: true,
            titleTextSize: 10,
            storyIconHeight: 70,
            storyIconWidth: 70,
            storyIconCornerRadius: 35,
            storyIconSpacing: 0,
            storyIconBorderVisibility: true,
            storyIconBorderMargin: 0,
            storyIconBorderWidth: 2,
            storyIconShadow: false,
            storyRestrictToItems: 3,
            unreadStoryCountVisibility: false,
            unreadStoryCountBackgroundColor: .red,
            unreadStoryCountTextColor: .white,
            storyViewCloseButtonPosition: .leftSide,
            storyViewTextPosition: .insideBottom,
            storyWidgetShareButtonVisibility: false,
            sortToLastIndex: true,
            allowAutoRotation: true,
            widgetId: "CyELm3daayQGuSGTD"
        )

        self.view.addSubview(storyView!)

//Using a CPStoryView with autolayout
storyView.configure(
            withFrame:storyView.frame,
            backgroundColor: .clear,
            textColor: .black,
            fontFamily: "AppleSDGothicNeo-Bold",
            borderColor: .yellow,
            titleVisibility: true,
            titleTextSize: 10,
            storyIconHeight: 70,
            storyIconWidth: 70,
            storyIconCornerRadius: 35,
            storyIconSpacing: 0,
            storyIconBorderVisibility: true,
            storyIconBorderMargin: 0,
            storyIconBorderWidth: 2,
            storyIconShadow: false,
            storyRestrictToItems: 3,
            unreadStoryCountVisibility: false,
            unreadStoryCountBackgroundColor: .red,
            unreadStoryCountTextColor: .white,
            storyViewCloseButtonPosition: .leftSide,
            storyViewTextPosition: .insideBottom,
            storyWidgetShareButtonVisibility: false,
            sortToLastIndex: true,
            allowAutoRotation: true,
            widgetId: "CyELm3daayQGuSGTD"
        )
```

<!--Objective-C-->

```objective-c
//Using a CPStoryView with frame
#import <CleverPush/CPStoryView.h>

CPStoryView *storyView = [[CPStoryView alloc] 
        initWithFrame:CGRectMake(15, 0, self.viewBG.frame.size.width - 30, 100) 
        backgroundColor:[UIColor clearColor] 
        textColor:[UIColor blackColor] 
        fontFamily:@"AppleSDGothicNeo-Bold" 
        borderColor:[UIColor yellowColor] 
        titleVisibility:YES 
        titleTextSize:10 
        storyIconHeight:70 
        storyIconWidth:70 
        storyIconCornerRadius:35 
        storyIconSpacing:0 
        storyIconBorderVisibility:YES 
        storyIconBorderMargin:0 
        storyIconBorderWidth:2.5 
        storyIconShadow:NO 
        storyRestrictToItems:3 
        unreadStoryCountVisibility:NO 
        unreadStoryCountBackgroundColor:[UIColor redColor] 
        unreadStoryCountTextColor:[UIColor whiteColor] 
        storyViewCloseButtonPosition:CPStoryWidgetCloseButtonPositionLeftSide 
        storyViewTextPosition:CPStoryWidgetTextPositionInsideBottom 
        storyWidgetShareButtonVisibility:NO 
        sortToLastIndex:YES 
        allowAutoRotation:YES
        widgetId:@"CyELm3daayQGuSGTD"];

[self.view addSubview:storyView];

//Using a CPStoryView with autolayout
[self.storyView configureWithFrame:self.storyView.frame 
        backgroundColor:[UIColor clearColor] 
        textColor:[UIColor blackColor] 
        fontFamily:@"AppleSDGothicNeo-Bold" 
        borderColor:[UIColor yellowColor] 
        titleVisibility:YES 
        titleTextSize:10 
        storyIconHeight:70 
        storyIconWidth:70 
        storyIconCornerRadius:35 
        storyIconSpacing:0 
        storyIconBorderVisibility:YES 
        storyIconBorderMargin:0 
        storyIconBorderWidth:2.5 
        storyIconShadow:NO 
        storyRestrictToItems:3 
        unreadStoryCountVisibility:NO 
        unreadStoryCountBackgroundColor:[UIColor redColor] 
        unreadStoryCountTextColor:[UIColor whiteColor] 
        storyViewCloseButtonPosition:CPStoryWidgetCloseButtonPositionLeftSide 
        storyViewTextPosition:CPStoryWidgetTextPositionInsideBottom 
        storyWidgetShareButtonVisibility:NO 
        sortToLastIndex:YES 
        allowAutoRotation:YES
        widgetId:@"CyELm3daayQGuSGTD"];
```

<!--END_DOCUSAURUS_CODE_TABS-->

6. For Displaying the Unread Count and Only 3 Items in the Story Widget According to Screen Width


Note: Set `storyRestrictToItems` value in integer, and then the story view icon's width will be dynamic based on the device's width and number of stories will be displayed based on that integer value.

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
//Using a CPStoryView with frame
import CleverPush

let storyView = CPStoryView(
            frame: CGRect(x: 15, y: 0, width: self.view.frame.size.width - 30, height: 100),
            backgroundColor: .clear,
            textColor: .black,
            fontFamily: "AppleSDGothicNeo-Bold",
            borderColor: .yellow,
            titleVisibility: true,
            titleTextSize: 10,
            storyIconHeight: 70,
            storyIconWidth: 70,
            storyIconCornerRadius: 35,
            storyIconSpacing: 0,
            storyIconBorderVisibility: true,
            storyIconBorderMargin: 0,
            storyIconBorderWidth: 2,
            storyIconShadow: false,
            storyRestrictToItems: 3,
            unreadStoryCountVisibility: true,
            unreadStoryCountBackgroundColor: .red,
            unreadStoryCountTextColor: .white,
            storyViewCloseButtonPosition: .leftSide,
            storyViewTextPosition: .insideBottom,
            storyWidgetShareButtonVisibility: false,
            sortToLastIndex: true,
            allowAutoRotation: true,
            widgetId: "CyELm3daayQGuSGTD"
        )

        self.view.addSubview(storyView!)

//Using a CPStoryView with autolayout
storyView.configure(
            withFrame:storyView.frame,
            backgroundColor: .clear,
            textColor: .black,
            fontFamily: "AppleSDGothicNeo-Bold",
            borderColor: .yellow,
            titleVisibility: true,
            titleTextSize: 10,
            storyIconHeight: 70,
            storyIconWidth: 70,
            storyIconCornerRadius: 35,
            storyIconSpacing: 0,
            storyIconBorderVisibility: true,
            storyIconBorderMargin: 0,
            storyIconBorderWidth: 2,
            storyIconShadow: false,
            storyRestrictToItems: 3,
            unreadStoryCountVisibility: true,
            unreadStoryCountBackgroundColor: .red,
            unreadStoryCountTextColor: .white,
            storyViewCloseButtonPosition: .leftSide,
            storyViewTextPosition: .insideBottom,
            storyWidgetShareButtonVisibility: false,
            sortToLastIndex: true,
            allowAutoRotation: true,
            widgetId: "CyELm3daayQGuSGTD"
        )
```

<!--Objective-C-->

```objective-c
//Using a CPStoryView with frame
#import <CleverPush/CPStoryView.h>

CPStoryView *storyView = [[CPStoryView alloc] 
        initWithFrame:CGRectMake(15, 0, self.viewBG.frame.size.width - 30, 100) 
        backgroundColor:[UIColor clearColor] 
        textColor:[UIColor blackColor] 
        fontFamily:@"AppleSDGothicNeo-Bold" 
        borderColor:[UIColor yellowColor] 
        titleVisibility:YES 
        titleTextSize:10 
        storyIconHeight:70 
        storyIconWidth:70 
        storyIconCornerRadius:35 
        storyIconSpacing:0 
        storyIconBorderVisibility:YES 
        storyIconBorderMargin:0 
        storyIconBorderWidth:2.5 
        storyIconShadow:NO 
        storyRestrictToItems: 3
        unreadStoryCountVisibility:YES 
        unreadStoryCountBackgroundColor:[UIColor redColor] 
        unreadStoryCountTextColor:[UIColor whiteColor] 
        storyViewCloseButtonPosition:CPStoryWidgetCloseButtonPositionLeftSide 
        storyViewTextPosition:CPStoryWidgetTextPositionInsideBottom 
        storyWidgetShareButtonVisibility:NO 
        sortToLastIndex:YES
        allowAutoRotation:YES
        widgetId:@"CyELm3daayQGuSGTD"];

[self.view addSubview:storyView];

//Using a CPStoryView with autolayout
[self.storyView configureWithFrame:self.storyView.frame 
        backgroundColor:[UIColor clearColor] 
        textColor:[UIColor blackColor] 
        fontFamily:@"AppleSDGothicNeo-Bold" 
        borderColor:[UIColor yellowColor] 
        titleVisibility:YES 
        titleTextSize:10 
        storyIconHeight:70 
        storyIconWidth:70 
        storyIconCornerRadius:35 
        storyIconSpacing:0 
        storyIconBorderVisibility:YES 
        storyIconBorderMargin:0 
        storyIconBorderWidth:2.5 
        storyIconShadow:NO 
        storyRestrictToItems: 3
        unreadStoryCountVisibility:YES 
        unreadStoryCountBackgroundColor:[UIColor redColor] 
        unreadStoryCountTextColor:[UIColor whiteColor] 
        storyViewCloseButtonPosition:CPStoryWidgetCloseButtonPositionLeftSide 
        storyViewTextPosition:CPStoryWidgetTextPositionInsideBottom 
        storyWidgetShareButtonVisibility:NO 
        sortToLastIndex:YES
        allowAutoRotation:YES
        widgetId:@"CyELm3daayQGuSGTD"];
```
<!--END_DOCUSAURUS_CODE_TABS-->


Handle opened URLs in stories:

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
 storyView?.setOpenedCallback({ url in
    print("URL OPENED = ", url)
})
```

<!--Objective-C-->

```objective-c
 [storyView setOpenedCallback:^(NSURL *url) {
    NSLog(@"URL OPENED = %@", url);
}];
```

<!--END_DOCUSAURUS_CODE_TABS-->


### Customizing StoryView

You can customize the experience of `StoryView` using these attributes:

- `widgetId`: Specifies the ID of the story widget.
- `borderColor`: Defines the color of the border around the story.
- `storyIconBorderVisibility`: Controls the visibility of the border around the story.
- `storyIconBorderMargin`: Sets the margin between border and story icon.
- `storyIconBorderWidth`: Defines the width of the border around the story.
- `backgroundColor`: Sets the background color of the story view.
- `textColor`: Specifies the color of the story title of story view.
- `fontFamily`: Sets the font family for the story title.
- `titleVisibility`: Controls the visibility of the story title.
- `titleTextSize`: Sets the size of the story title text.
- `storyViewTextPosition`: Defines the position of the title, with options like position_default, position_inside_bottom, or position_inside_top.
- `storyIconHeight`: Defines the height of the story icon.
- `storyIconWidth`: Defines the width of the story icon.
- `storyIconCornerRadius`: Sets the corner radius of the story icon.
- `storyIconSpacing`: Specifies the space between individual stories. (Minimum spacing is 2.5)
- `storyIconShadow`: Enables or disables a shadow around the story icon (boolean).
- `unreadStoryCountVisibility`: Controls the visibility of the unread count for sub-stories.
- `unreadStoryCountBackgroundColor`: Sets the background color of the sub-story unread count badge.
- `unreadStoryCountTextColor`: Specifies the text color of the sub-story unread count badge.
- `storyRestrictToItems`: Restricts the story view to display number of items (integer value).
- `storyViewCloseButtonPosition`: Sets the position of the close button, either left or right.
- `sortToLastIndex`: Determines whether seen stories are moved to the end of the list (position_end) or remain in their default position (position_default).
- `storyWidgetShareButtonVisibility`: Controls the visibility of the share button for sub-stories.
- `allowAutoRotation`: Controls the support of giving device orientation layout change support.
