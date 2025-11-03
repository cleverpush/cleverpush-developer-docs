---
id: deeplinks
title: Deep Links
---

## CleverPush Deep Links

CleverPush supports **Dynamic Deeplinks** using Android App Links, which automatically detect whether the app is installed and route users accordingly. If the app is not installed, users are redirected to the Play Store.

### Dashboard Configuration

1. **Enable Deep Links in your Channel Settings:**
   - Navigate to your Channel → Deep Links section
   - Enable "Create Deep Links"
   - Enter a custom subdomain (e.g., `myapp` for `myapp.clpsh.com`)
   - Save the settings

2. **Create Deep Links:**
   - Click "Create Deep Link" to create new deep links
   - Deep links will be automatically generated with the format: `https://{subdomain}.clpsh.com/{path}`

### Android App Links Setup

Android App Links use HTTP/HTTPS URLs that open directly in your app, providing a seamless user experience without disambiguation dialogs.

#### Step 1: Configure App Links in AndroidManifest.xml

Add intent filters to your `MainActivity` (or the activity that should handle deep links) in `AndroidManifest.xml`:

```xml
<activity
    android:name=".MainActivity"
    android:exported="true">
    
    <!-- Other intent filters -->
    
    <!-- CleverPush Dynamic Deeplink - App Links -->
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        
        <!-- Replace {subdomain} with your configured subdomain -->
        <data
            android:scheme="https"
            android:host="{subdomain}.clpsh.com" />
        
        <!-- Include tracking subdomain if configured -->
        <data
            android:scheme="https"
            android:host="go.{subdomain}.clpsh.com" />
    </intent-filter>
    
</activity>
```

**Example:**
If your subdomain is `myapp`, use:
```xml
<data
    android:scheme="https"
    android:host="myapp.clpsh.com" />

<data
    android:scheme="https"
    android:host="go.myapp.clpsh.com" />
```

> **Important:** Make sure to replace `{subdomain}` with your actual subdomain configured in the CleverPush dashboard.

#### Step 2: Handle Deep Links in Your Activity

In your `MainActivity.java` (or Kotlin equivalent), handle the incoming deep link:

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import androidx.appcompat.app.AppCompatActivity;
import com.cleverpush.CleverPush;

public class MainActivity extends AppCompatActivity {
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        // Initialize CleverPush
        CleverPush.getInstance(this).init("YOUR_CHANNEL_ID");
        
        // Handle deep link from intent
        handleDeepLink(getIntent());
    }
    
    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        handleDeepLink(intent);
    }
    
    private void handleDeepLink(Intent intent) {
        Uri data = intent.getData();
        if (data != null) {
            // Process the deep link URL
            String scheme = data.getScheme();
            String host = data.getHost();
            String path = data.getPath();
            String query = data.getQuery();
            
            Log.d("DeepLink", "Scheme: " + scheme);
            Log.d("DeepLink", "Host: " + host);
            Log.d("DeepLink", "Path: " + path);
            Log.d("DeepLink", "Query: " + query);
            
            // Add your custom navigation/routing logic here
            // Example: Navigate to a specific screen based on the URL path
            
            // Example: Extract path segments
            List<String> pathSegments = data.getPathSegments();
            if (pathSegments != null && !pathSegments.isEmpty()) {
                String firstSegment = pathSegments.get(0);
                // Navigate based on the path segment
            }
        }
    }
}
```

<!--Kotlin-->

```kotlin
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.cleverpush.CleverPush

class MainActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        // Initialize CleverPush
        CleverPush.getInstance(this).init("YOUR_CHANNEL_ID")
        
        // Handle deep link from intent
        handleDeepLink(intent)
    }
    
    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        setIntent(intent)
        handleDeepLink(intent)
    }
    
    private fun handleDeepLink(intent: Intent) {
        val data: Uri? = intent.data
        if (data != null) {
            // Process the deep link URL
            val scheme = data.scheme
            val host = data.host
            val path = data.path
            val query = data.query
            
            Log.d("DeepLink", "Scheme: $scheme")
            Log.d("DeepLink", "Host: $host")
            Log.d("DeepLink", "Path: $path")
            Log.d("DeepLink", "Query: $query")
            
            // Add your custom navigation/routing logic here
            // Example: Navigate to a specific screen based on the URL path
            
            // Example: Extract path segments
            val pathSegments = data.pathSegments
            if (!pathSegments.isNullOrEmpty()) {
                val firstSegment = pathSegments[0]
                // Navigate based on the path segment
            }
        }
    }
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

#### Step 3: Digital Asset Links Verification

Android requires verification that your app is authorized to handle links for your domain. CleverPush automatically handles this verification by serving the required `assetlinks.json` file.

The verification happens automatically when:
- Your app is installed
- Your app receives a deep link intent

You can manually verify the asset links are working by:
1. Using the Android Debug Bridge: `adb shell pm verify-app-links --re-verify <package-name>`
2. Checking in Android Settings → Apps → Your App → Open by default → Verified links

#### Step 4: Handle Deep Links from Push Notifications

When `autoHandleDeepLink` is enabled in your CleverPush channel settings, the SDK automatically handles deep links from push notifications. You can enable this in:
- Channel Settings → Android → Deep Links → "Automatically handle deep link via system"

If you need custom handling for notification deep links, use the `NotificationOpenedListener`:

<!--DOCUSAURUS_CODE_TABS-->

<!--Java-->

```java
CleverPush.getInstance(this).init(
    "YOUR_CHANNEL_ID",
    null, // NotificationReceivedListener (optional)
    new NotificationOpenedListener() {
        @Override
        public void notificationOpened(NotificationOpenedResult result) {
            if (result != null && result.getNotification() != null) {
                String url = result.getNotification().getUrl();
                if (url != null) {
                    // Handle the deep link URL from notification
                    Uri deepLinkUri = Uri.parse(url);
                    handleDeepLinkUrl(deepLinkUri);
                }
            }
        }
    },
    null  // SubscribedListener (optional)
);
```

<!--Kotlin-->

```kotlin
CleverPush.getInstance(this).init(
    "YOUR_CHANNEL_ID",
    null, // NotificationReceivedListener (optional)
    NotificationOpenedListener { result ->
        if (result?.notification?.url != null) {
            val url = result.notification.url
            // Handle the deep link URL from notification
            val deepLinkUri = Uri.parse(url)
            handleDeepLinkUrl(deepLinkUri)
        }
    },
    null  // SubscribedListener (optional)
)
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Legacy Custom URL Schemes (Deprecated)

> **Note:** Custom URL schemes are deprecated in favor of App Links. We recommend using Dynamic Deeplinks with App Links for better compatibility.

If you still need to use custom URL schemes for legacy reasons, you can add them alongside App Links:

```xml
<activity
    android:name=".MainActivity"
    android:exported="true">
    
    <!-- App Links (recommended) -->
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data
            android:scheme="https"
            android:host="{subdomain}.clpsh.com" />
    </intent-filter>
    
    <!-- Legacy custom URL scheme (deprecated) -->
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data
            android:scheme="myapp"
            android:host="*" />
    </intent-filter>
    
</activity>
```

### Testing Deep Links

1. **Test App Links using ADB:**
   ```bash
   adb shell am start -a android.intent.action.VIEW -d "https://{subdomain}.clpsh.com/{path}"
   ```

2. **Test from Browser:**
   - Create a simple HTML page with a link: `<a href="https://{subdomain}.clpsh.com/{path}">Open App</a>`
   - Open the page in Chrome on your Android device
   - Tapping the link should open your app directly

3. **Verify App Links:**
   ```bash
   adb shell pm get-app-links <your-package-name>
   ```

4. **Debug App Links:**
   ```bash
   adb shell pm set-app-links --package <your-package-name> 0 all
   ```

### Troubleshooting

- **Links open in browser instead of app:**
  - Verify `android:autoVerify="true"` is set in your intent-filter
  - Check that your app's package name matches what's configured in CleverPush
  - Ensure the Digital Asset Links verification passed

- **Verification failed:**
  - Check that CleverPush is serving the assetlinks.json correctly
  - Verify your subdomain matches exactly (case-sensitive)
  - Clear app data and reinstall the app

- **Multiple apps handling the same link:**
  - Ensure only your app has the correct intent-filter configured
  - Use App Links (with autoVerify) instead of custom URL schemes to avoid disambiguation dialogs
