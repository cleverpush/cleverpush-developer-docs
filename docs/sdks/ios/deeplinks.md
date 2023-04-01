---
id: deeplinks
title: Deep Links
---

## CleverPush Deep Links

1. Open the Project in Xcode.
2. Select the project's main target.
3. Select the info tab.
4. Select the url type.
5. Select the url scheme and enter the url scheme (Example :- cleverpush)
6. Go to the button of any view controller from where we need to share the url to another user 

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
@IBAction func btnHandlerShareURL(_ sender: Any) {
    // From here user can share their own url to another user using the share activity (Example :- let path = "cleverpush://") 
    let path = "url://"
    let textToShare = [ path ]
    let activityViewController = UIActivityViewController(activityItems: textToShare, applicationActivities: nil)
    activityViewController.popoverPresentationController?.sourceView = self.view
    activityViewController.excludedActivityTypes = [ UIActivity.ActivityType.airDrop, UIActivity.ActivityType.postToFacebook ]
    self.present(activityViewController, animated: true, completion: nil)
    
}
```

<!--END_DOCUSAURUS_CODE_TABS-->


7. Add the following code in your AppDelegate.swift file

<!--DOCUSAURUS_CODE_TABS-->

<!--Swift-->

```swift
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    // From here we can check that url contains cleverpush or not?
    if url.scheme == "cleverpush" {
        let ab = UIStoryboard(name: "Main", bundle: nil)
        let vc = ab.instantiateViewController(withIdentifier: "ViewController") as! ViewController
        window?.rootViewController = vc
    }

    return true
}
```

<!--END_DOCUSAURUS_CODE_TABS-->
