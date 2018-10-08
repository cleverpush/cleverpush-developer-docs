+++
description = ""
title = "React Native SDK"
date = "2017-04-10T16:43:08+01:00"
draft = false
weight = 200
bref=""
toc = true
+++

### Installation

1. Install via npm or yarn
    ```
    npm i https://github.com/cleverpush/cleverpush-react-native-sdk -S
    ```
    
2. Link + install native Dependencies for iOS
    ```
    react-native link
    cd ios
    pod install
    ```

### Setup iOS

1. Enable the required capabilities

   1.1. Go to your root project and switch to the tab "Capabilities"
   
   1.2. Enable "Push Notifications"
   
   1.3. Enable "Background Modes" and check "Remote notifications"
   

2. Create your iOS push certificate

   * Open Keychain Access on your Mac. (Application > Utilities > Keychain Access).
   * Select Keychain Access > Certificate Assistant > Request a Certificate From a Certificate Authority...
   * Select the "Save to disk" option and enter any information in the required fields
   * Go to the [Apple developer portal](https://developer.apple.com/account/ios/identifier/bundle), select your app and press "Edit"
   * Enable "Push notifications" and press "Done"
   * Go to the [Create new certificate page](https://developer.apple.com/account/ios/certificate/create), select "Apple Push Notification service SSL" and press "Continue"
   * Select your Application Bundle ID and press "Continue"
   * Press "Choose File...", select the previously generated "certSigningRequest" file and then press "Generate"
   * Press "Download" and save your certificate
   * Click on the downloaded .cer file, Keychain Access should open
   * Select Login > My Certificates then right click on your key and click "Export (Apple Production iOS Push Services: com.your.bundle)..."
   * Give the file a unique name and press save, be sure to leave the password field blank!
   * Upload your certificate in the CleverPush channel settings under the iOS tab

