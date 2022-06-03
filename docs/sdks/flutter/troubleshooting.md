---
id: troubleshooting
title: Troubleshooting
---

## The style on this component requires your app theme to be Theme.AppCompat (or a descendant).

Please use a parent theme which starts with "Theme.AppCompat.XXX" in your main theme (e.g. LaunchTheme).
Example:

<style name="LaunchTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <!-- Show a splash screen on the activity. Automatically removed when
             Flutter draws its first frame -->
        <item name="android:windowBackground">@drawable/launch_background</item>
</style>