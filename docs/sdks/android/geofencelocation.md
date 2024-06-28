---
id: geofencelocation
title: Geo Fence Location Permission
---

For geofencing, ACCESS_BACKGROUND_LOCATION permission is needed starting from Android 10 (API level 29).

This is because geofencing is a feature that typically requires app to receive location updates even when it is not in the foreground, which qualifies as background location access.

Add ACCESS_BACKGROUND_LOCATION to your AndroidManifest.xml:

```xml
<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
```

You can request location permission: 

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
import com.cleverpush.CleverPush;

public class MainActivity extends Activity {
    public void onCreate(Bundle savedInstanceState) {
        CleverPush.getInstance(this).requestLocationPermission();
    }
}
```

<!--Kotlin-->

```kotlin
import com.cleverpush.CleverPush;

class MainActivity:Activity() {
    fun onCreate(savedInstanceState:Bundle) {
        CleverPush.getInstance(this).requestLocationPermission()
    }
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

If device's API level is equal or above 29 than after giving location permission dialog will open. On click `Go to Settings` button app's setting screen will open and perform `Permission -> Location -> Allow all the time` for geo fence. 
