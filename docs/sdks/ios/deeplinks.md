---
id: deeplinks
title: Deep Links
---

## CleverPush Deep Links

CleverPush supports **Dynamic Deeplinks** using Universal Links, which automatically detect whether the app is installed and route users accordingly. If the app is not installed, users are redirected to the App Store.

### Dashboard Configuration

1. **Enable Deep Links in your Channel Settings:**
   - Navigate to your Channel → Deep Links section
   - Enable "Create Deep Links"
   - Enter a custom subdomain (e.g., `myapp` for `myapp.clpsh.com`)
   - Save the settings

2. **Create Deep Links:**
   - Click "Create Deep Link" to create new deep links
   - Deep links will be automatically generated with the format: `https://{subdomain}.clpsh.com/{path}`

### iOS Universal Links Setup

Universal Links allow your app to handle web links directly, providing a seamless user experience. CleverPush automatically generates the `apple-app-site-association` file for your subdomain.

#### Step 1: Configure Universal Links in Xcode

1. Open your project in Xcode
2. Select your app's main target
3. Go to the **Signing & Capabilities** tab
4. Click **+ Capability** and add **Associated Domains**
5. Add your CleverPush deeplink domain:
   - For production: `applinks:{subdomain}.clpsh.com`
   - For tracking domains: `applinks:go.{subdomain}.clpsh.com` (if configured)
   - Replace `{subdomain}` with your configured subdomain from the CleverPush dashboard

**Example:**
If your subdomain is `myapp`, add:
```
applinks:myapp.clpsh.com
applinks:go.myapp.clpsh.com
```

#### Step 2: Handle Universal Links in Your App

The CleverPush SDK can automatically handle deep links if enabled in your channel settings (`autoHandleDeepLink`). 

However, if you need custom handling, implement the following in your `AppDelegate.swift`:

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
import UIKit

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    
    func application(_ application: UIApplication,
                     continue userActivity: NSUserActivity,
                     restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        // Handle Universal Links
        guard userActivity.activityType == NSUserActivityTypeBrowsingWeb,
              let url = userActivity.webpageURL else {
            return false
        }
        
        // Process the deep link URL
        print("Received Universal Link: \(url)")
        
        // Add your custom navigation/routing logic here
        // Example: Navigate to a specific screen based on the URL path
        
        return true
    }
}
```

<!--Objective-C-->

```objective-c
#import <UIKit/UIKit.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application
continueUserActivity:(NSUserActivity *)userActivity
 restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler {
    // Handle Universal Links
    if (![userActivity.activityType isEqualToString:NSUserActivityTypeBrowsingWeb] || !userActivity.webpageURL) {
        return NO;
    }
    
    NSURL *url = userActivity.webpageURL;
    NSLog(@"Received Universal Link: %@", url);
    
    // Add your custom navigation/routing logic here
    // Example: Navigate to a specific screen based on the URL path
    
    return YES;
}

@end
```

<!--END_DOCUSAURUS_CODE_TABS-->

#### Step 3: Handle Universal Links with SceneDelegate (iOS 13+)

If you're using SceneDelegate, implement the following:

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
import UIKit

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    
    func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
        // Handle Universal Links
        guard userActivity.activityType == NSUserActivityTypeBrowsingWeb,
              let url = userActivity.webpageURL else {
            return
        }
        
        // Process the deep link URL
        print("Received Universal Link: \(url)")
        
        // Add your custom navigation/routing logic here
    }
}
```

<!--Objective-C-->

```objective-c
#import <UIKit/UIKit.h>

@implementation SceneDelegate

- (void)scene:(UIScene *)scene continueUserActivity:(NSUserActivity *)userActivity {
    // Handle Universal Links
    if (![userActivity.activityType isEqualToString:NSUserActivityTypeBrowsingWeb] || !userActivity.webpageURL) {
        return;
    }
    
    NSURL *url = userActivity.webpageURL;
    NSLog(@"Received Universal Link: %@", url);
    
    // Add your custom navigation/routing logic here
}

@end
```

<!--END_DOCUSAURUS_CODE_TABS-->

#### Step 4: Configure SDK for Universal Links (Optional)

If you need to handle Universal Links differently or for legacy compatibility, you can configure which domains should be handled as Universal Links:

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
import CleverPush

// In your AppDelegate didFinishLaunchingWithOptions:
let domains = ["myapp.clpsh.com", "go.myapp.clpsh.com"]
CleverPush.setHandleUniversalLinksInApp(forDomains: domains)
```

<!--Objective-C-->

```objective-c
#import <CleverPush/CleverPush.h>

// In your AppDelegate didFinishLaunchingWithOptions:
NSArray<NSString *> *domains = @[@"myapp.clpsh.com", @"go.myapp.clpsh.com"];
[CleverPush setHandleUniversalLinksInAppForDomains:domains];
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Automatic Deep Link Handling

When `autoHandleDeepLink` is enabled in your CleverPush channel settings, the SDK automatically handles deep links from push notifications. This setting applies to both Universal Links and custom URL schemes.

You can enable this in:
- Channel Settings → iOS → Deep Links → "Automatically handle deep link via system"

### Legacy Custom URL Schemes (Deprecated)

> **Note:** Custom URL schemes are deprecated in favor of Universal Links. We recommend using Dynamic Deeplinks with Universal Links for better compatibility and to fix Safari popup issues.

If you still need to use custom URL schemes for legacy reasons:

1. Configure URL Types in Xcode:
   - Select your project's main target
   - Go to the **Info** tab
   - Under **URL Types**, add a new URL Type
   - Enter your URL scheme (e.g., `myapp`)

2. Handle custom URL scheme in AppDelegate:

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    // Handle custom URL scheme
    if url.scheme == "myapp" {
        // Process the deep link
        print("Received custom URL scheme: \(url)")
        // Add your navigation logic here
        return true
    }
    return false
}
```

<!--Objective-C-->

```objective-c
- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
    // Handle custom URL scheme
    if ([url.scheme isEqualToString:@"myapp"]) {
        // Process the deep link
        NSLog(@"Received custom URL scheme: %@", url);
        // Add your navigation logic here
        return YES;
    }
    return NO;
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Testing Deep Links

1. **Test Universal Links:**
   - Use the Long Press context menu on a link (on device)
   - Or use the Notes app to create a link and tap it
   - Universal Links work best when tested on a real device

2. **Verify Configuration:**
   - Check that your Associated Domains are correctly configured in Xcode
   - Ensure your subdomain matches the one configured in CleverPush dashboard
   - The `apple-app-site-association` file is automatically generated by CleverPush at:
    `https://{subdomain}.clpsh.com/.well-known/apple-app-site-association`
