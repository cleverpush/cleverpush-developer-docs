---
id: stories
title: Stories
---

## CleverPush Story Widget

You can also implement CleverPush Stories into your application. For this, please set up a Story Widget in your CleverPush account. You can access stories via generated Widget Id and by following usage guide.

### Story View

![Screenshot_1626271406](https://user-images.githubusercontent.com/42137835/125639839-95583410-5d4d-4c39-a1ef-7f3c02833a04.png)

### Story Player

![Screenshot_1626271443](https://user-images.githubusercontent.com/42137835/125640072-5c155112-5a66-4bd9-9c93-055d9b3159f5.png)

### How to use

Add xml to your layout

```xml
<com.cleverpush.stories.StoryView
  android:id="@+id/storyView"
  android:layout_width="match_parent"
  android:layout_height="wrap_content"
  app:background_color="#000"
  app:border_color="#cA4000"
  app:fontFamily="CabinSketch-Bold"
  app:story_view_height="500dp"
  app:story_view_width="700dp"
  app:text_color="#fff"
  app:title_visibility="gone"
  app:title_text_size="12sp"
  app:story_icon_height="100dp"
  app:story_icon_width="100dp"
  app:widget_id="o76hjaysdgohltyil" />
```

- Stories will be load using `widget_id`. Story Widget ID can be set using widget_id attribute in xml or it can be set through instance of `StoryView` like, 
  ```xml
  StoryView storyView = findViewById(R.id.storyView);
  storyView.setWidgetId("o76hjaysdgohltyil");
  ```

Handle opened URLs:

<!--DOCUSAURUS_CODE_TABS-->
<!--Java-->
```java
binding.storyView.setOpenedListener ((url) -> {
  // do something with the opened URL
});
```

<!--Kotlin-->
```kotlin
binding.storyView.setOpenedListener { url -> 
  // do something with the opened URL
}
CleverPush.getInstance(this).setChatUrlOpenedListener { url ->
  // do something with the opened URL
}
```
<!--END_DOCUSAURUS_CODE_TABS-->
### Customizations

You can customize the experience of `StoryView` using these attributes:

- `story_view_height` story view height in dp
- `story_view_width` story view width in dp
- `border_color` border color
- `background_color` story view background color
- `text_color` text color
- `font_family` text font family
- `title_visibility` title visibility
- `title_text_size` title text size 
- `story_icon_height` story icon height in dp
- `story_icon_width` story icon width in dp
