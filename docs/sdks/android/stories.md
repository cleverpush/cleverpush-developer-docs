---
id: stories
title: Stories
---

## CleverPush Story Widget

You can also implement CleverPush Stories into your application. For this, please set up a Story Widget in your CleverPush account. You can access stories via generated Widget Id and by following usage guide.

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
  app:story_icon_space="0dp"
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

Note: Set `story_view_width` to match_parent or a specific dp value. The `restrict_to_items` attribute will not work with wrap_content.

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
  app:restrict_to_items="3"
  app:widget_id="WIDGET_ID" />
```

6. For Displaying the Unread Count and Only 3 Items in the Story Widget According to Screen Width

Note: Set `story_view_width` to match_parent or a specific dp value. The `restrict_to_items` attribute will not work with wrap_content.

Add the following XML to your layout:

```xml
<com.cleverpush.stories.StoryView
  android:id="@+id/storyView"
  android:layout_width="match_parent"
  android:layout_height="wrap_content"
  android:layout_margin="10dp"
  android:elevation="0dp"
  app:background_color="#cde6e2"
  app:background_color_dark_mode="#cde6e2"
  app:border_color="#A2A4A5"
  app:border_color_dark_mode="#FFC107"
  app:border_color_loading="#B66C54"
  app:border_color_loading_dark_mode="#4CAF50"
  app:border_margin="4dp"
  app:border_visibility="visible"
  app:border_width="5dp"
  app:close_button_position="right"
  app:fontFamily="CabinSketch-Bold"
  app:restrict_to_items="3"
  app:story_icon_corner_radius="10dp"
  app:story_icon_height="90dp"
  app:story_icon_height_percentage="75"
  app:story_icon_shadow="false"
  app:story_icon_space="0dp"
  app:story_icon_width="85dp"
  app:story_view_width="match_parent"
  app:sub_story_unread_count_background_color="@android:color/holo_red_dark"
  app:sub_story_unread_count_background_color_dark_mode="#000000"
  app:sub_story_unread_count_badge_height="30dp"
  app:sub_story_unread_count_badge_width="30dp"
  app:sub_story_unread_count_text_color="#FFFFFF"
  app:sub_story_unread_count_text_color_dark_mode="#FFFFFF"
  app:sub_story_unread_count_visibility="visible"
  app:text_color="#000000"
  app:text_color_dark_mode="#FFFFFF"
  app:title_max_text_size="18sp"
  app:title_min_text_size="14sp"
  app:title_position="position_inside_bottom"
  app:title_text_size="15sp"
  app:title_visibility="visible"
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
val storyView = findViewById<StoryView>(R.id.storyView)
storyView.widgetId = "WIDGET_ID"
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Handling Dark Mode

The `setDarkModeEnabled` method allows you to adjust the appearance of the `StoryView` based on the system's dark mode settings. This method will automatically apply dark mode or light mode attributes depending on the system configuration.

* If dark mode is enabled, the `setDarkModeEnabled(true)` method will apply the colors and images from the dark mode attribute values.

* If dark mode is disabled, calling `setDarkModeEnabled(false)` will apply the default light mode colors and images instead.

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->
```java
StoryView storyView = findViewById(R.id.storyView);
storyView.setDarkModeEnabled(true);
```

<!--Kotlin-->
```kotlin
val storyView = findViewById<StoryView>(R.id.storyView)
storyView.setDarkModeEnabled(true)
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
- `border_color_dark_mode`: Specifies the border color in dark mode.
- `border_color_loading`: Specifies the color of the border during loading deatil screen.
- `border_color_loading_dark_mode`: Specifies the border color during loading deatil screen in dark mode.
- `border_visibility`: Controls the visibility of the border around the story.
- `border_margin`: Sets the margin between the border and the story icon in dp.
- `border_width`: Defines the width of the border around the story in dp.
- `background_color`: Sets the background color of the story view.
- `background_color_dark_mode`: Specifies the background color in dark mode.
- `text_color`: Specifies the color of the story title in the story view.
- `text_color_dark_mode`: Specifies the text color in dark mode.
- `font_family`: Sets the font family for the story title.
- `title_visibility`: Controls the visibility of the story title (visible, invisible, or gone).
- `title_text_size`: Sets the size of the story title text.
- `title_max_text_size`: Specifies the maximum text size for the story title. This allows text to grow only up to the defined size.
- `title_min_text_size`: Specifies the minimum text size for the story title. This allows text to shrink to a specified size on smaller screens.
- `title_position`: Defines the position of the title, with options like position_default, position_inside_bottom, or position_inside_top.
- `story_icon_height`: Defines the height of the story icon in dp.
- `story_icon_height_percentage`: Calculates the height of the story icon based on its width, setting the height as a percentage of the width (integer).
- `story_icon_width`: Defines the width of the story icon in dp.
- `story_icon_corner_radius`: Sets the corner radius of the story icon in dp.
- `story_icon_space`: Specifies the space between individual stories in dp.
- `story_icon_shadow`: Enables or disables a shadow around the story icon (boolean).
- `sub_story_unread_count_visibility`: Controls the visibility of the unread count for sub-stories (visible, invisible, or gone).
- `sub_story_unread_count_badge_height`: Sets the height of the unread count badge.
- `sub_story_unread_count_badge_width`: Sets the width of the unread count badge.
- `sub_story_unread_count_background_color`: Sets the background color of the sub-story unread count badge.
- `sub_story_unread_count_background_color_dark_mode`: Specifies the background color of the unread count badge in dark mode.
- `sub_story_unread_count_text_color`: Specifies the text color of the sub-story unread count badge.
- `sub_story_unread_count_text_color_dark_mode`: Specifies the text color of the unread count badge in dark mode.
- `restrict_to_items`: Sets the number of widgets to display on the screen (integer).
- `close_button_position`: Sets the position of the close button, either left or right.
- `sort_to_last_index`: Determines whether seen stories are moved to the end of the list (position_end) or remain in their default position (position_default).
