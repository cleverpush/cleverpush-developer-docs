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

1. For a Round-Shaped Story Widget

Add the following XML to your layout:

```xml
<com.cleverpush.stories.StoryView
  android:id="@+id/storyView"
  android:layout_width="match_parent"
  android:layout_height="wrap_content"
  app:story_view_width="match_parent"
  app:background_color="#cde6e2"
  app:border_color="#FFEB3B"
  app:fontFamily="CabinSketch-Bold"
  app:text_color="#000"
  app:title_visibility="visible"
  app:title_text_size="12sp"
  app:story_icon_height="75dp"
  app:story_icon_width="75dp"
  app:border_visibility="visible"
  app:border_margin="4dp"
  app:widget_id="WIDGET_ID" />
```

2. For a Rectangular-Shaped Story Widget

Add the following XML to your layout:

```xml
<com.cleverpush.stories.StoryView
  android:id="@+id/storyView"
  android:layout_width="match_parent"
  android:layout_height="wrap_content"
  app:border_color="#cA4000"
  app:background_color="#cde6e2"
  app:fontFamily="CabinSketch-Bold"
  app:text_color="#000"
  app:title_text_size="12sp"
  app:story_icon_height="100dp"
  app:story_icon_width="120dp"
  app:story_icon_corner_radius="20dp"
  app:story_icon_space="5dp"
  app:border_visibility="gone"
  app:widget_id="WIDGET_ID" />
```

3. For a Rectangular-Shaped Story Widget with Shadow

Add the following XML to your layout:

```xml  
<com.cleverpush.stories.StoryView
  android:id="@+id/storyView"
  android:layout_width="match_parent"
  android:layout_height="wrap_content"
  app:border_color="#cA4000"
  app:background_color="#cde6e2"
  app:fontFamily="CabinSketch-Bold"
  app:text_color="#000"
  app:title_text_size="12sp"
  app:story_icon_height="100dp"
  app:story_icon_width="120dp"
  app:story_icon_corner_radius="20dp"
  app:story_icon_space="5dp"
  app:story_icon_shadow="true"
  app:border_visibility="gone"
  app:widget_id="WIDGET_ID" />
```

4. For Displaying the Unread Count in the Story Widget

Add the following XML to your layout:

```xml
<com.cleverpush.stories.StoryView
  android:id="@+id/storyView"
  android:layout_width="match_parent"
  android:layout_height="wrap_content"
  app:story_view_width="match_parent"
  app:background_color="#cde6e2"
  app:border_color="#FFEB3B"
  app:text_color="#000"
  app:title_visibility="visible"
  app:title_text_size="12sp"
  app:story_icon_height="85dp"
  app:story_icon_width="100dp"
  app:story_icon_corner_radius="10dp"
  app:story_icon_shadow="false"
  app:border_visibility="visible"
  app:border_margin="4dp"
  app:border_width="4dp"
  app:close_button_position="right"
  app:title_position="position_default"
  app:sub_story_unread_count_visibility="visible"
  app:sub_story_unread_count_background_color="@android:color/holo_red_dark"
  app:sub_story_unread_count_text_color="@color/white"
  app:widget_id="WIDGET_ID" />
```

5. For Displaying Only 3 Items in the Story Widget According to Screen Width

Note: Set `story_view_width` to match_parent or a specific dp value. The `restrict_to_three_items` attribute will not work with wrap_content.

Add the following XML to your layout:

```xml
<com.cleverpush.stories.StoryView
  android:id="@+id/storyView"
  android:layout_width="match_parent"
  android:layout_height="wrap_content"
  app:story_view_width="match_parent"
  app:background_color="#cde6e2"
  app:border_color="#FFEB3B"
  app:text_color="#000"
  app:title_visibility="visible"
  app:title_text_size="12sp"
  app:story_icon_height="85dp"
  app:story_icon_corner_radius="10dp"
  app:story_icon_shadow="false"
  app:border_visibility="visible"
  app:border_margin="4dp"
  app:border_width="4dp"
  app:close_button_position="right"
  app:restrict_to_three_items="true"
  app:widget_id="WIDGET_ID" />
```

6. For Displaying the Unread Count and Only 3 Items in the Story Widget According to Screen Width

Note: Set `story_view_width` to match_parent or a specific dp value. The `restrict_to_three_items` attribute will not work with wrap_content.

Add the following XML to your layout:

```xml
<com.cleverpush.stories.StoryView
  android:id="@+id/storyView"
  android:layout_width="match_parent"
  android:layout_height="wrap_content"
  app:story_view_width="match_parent"
  app:background_color="#cde6e2"
  app:border_color="#FFEB3B"
  app:text_color="#000"
  app:title_visibility="visible"
  app:title_text_size="12sp"
  app:story_icon_height="85dp"
  app:story_icon_corner_radius="10dp"
  app:story_icon_shadow="false"
  app:border_visibility="visible"
  app:border_margin="4dp"
  app:border_width="4dp"
  app:close_button_position="right"
  app:restrict_to_three_items="true"
  app:title_position="position_inside_bottom"
  app:sub_story_unread_count_visibility="visible"
  app:sub_story_unread_count_background_color="@android:color/holo_red_dark"
  app:sub_story_unread_count_text_color="@color/white"
  app:widget_id="WIDGET_ID" />
```

### Loading Story

Stories will be loaded using the `widget_id` attribute specified in the XML layout.

The Story Widget ID can either be set using the `widget_id` attribute in the XML layout or programmatically using the `setWidgetId` method on an instance of StoryView, as shown below:

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->
```java
StoryView storyView = findViewById(R.id.storyView);
storyView.setWidgetId("WIDGET_ID");
```


<!--Kotlin-->
```kotlin
StoryView storyView = findViewById(R.id.storyView);
storyView.setWidgetId("WIDGET_ID");
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Handling Opened URLs in Stories

Handle opened URLs in stories:

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->
```java
storyView.setOpenedListener((url) -> {
  // do something with the opened URL
});
```

<!--Kotlin-->
```kotlin
storyView.setOpenedListener { url -> 
  // do something with the opened URL
}
```

<!--END_DOCUSAURUS_CODE_TABS-->


### Customizing StoryView

You can customize the experience of `StoryView` using these attributes:

- `story_view_height`: Sets the height of the story view, which can be match_parent, wrap_content, or a specific value in dp.
- `story_view_width`: Sets the width of the story view, which can be match_parent, wrap_content, or a specific value in dp.
- `widget_id`: Specifies the ID of the story widget.
- `border_color`: Defines the color of the border around the story.
- `border_visibility`: Controls the visibility of the border around the story.
- `border_margin`: Sets the margin between border and story icon in dp.
- `border_width`: Defines the width of the border around the story in dp.
- `background_color`: Sets the background color of the story view.
- `text_color`: Specifies the color of the story title of story view.
- `font_family`: Sets the font family for the story title.
- `title_visibility`: Controls the visibility of the story title.
- `title_text_size`: Sets the size of the story title text.
- `title_position`: Defines the position of the title, with options like position_default, position_inside_bottom, or position_inside_top.
- `story_icon_height`: Defines the height of the story icon in dp.
- `story_icon_width`: Defines the width of the story icon in dp.
- `story_icon_corner_radius`: Sets the corner radius of the story icon in dp.
- `story_icon_space`: Specifies the space between individual stories in dp.
- `story_icon_shadow`: Enables or disables a shadow around the story icon (boolean).
- `sub_story_unread_count_visibility`: Controls the visibility of the unread count for sub-stories.
- `sub_story_unread_count_background_color`: Sets the background color of the sub-story unread count badge.
- `sub_story_unread_count_text_color`: Specifies the text color of the sub-story unread count badge.
- `restrict_to_three_items`: Restricts the story view to display only three items (boolean).
- `close_button_position`: Sets the position of the close button, either left or right.
- `sort_to_last_index`: Determines whether seen stories are moved to the end of the list (position_end) or remain in their default position (position_default).
