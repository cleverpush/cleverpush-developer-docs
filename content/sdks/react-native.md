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
    {{< highlight bash >}}npm i cleverpush-react-native -S{{< /highlight >}}
    
2. Link + install native Dependencies for iOS
    {{< highlight bash >}}react-native link{{< /highlight >}}
    
3. Install Pods for iOS (may be not needed)
 
    {{< highlight bash >}}cd ios
pod install
{{< /highlight >}}


### Setup iOS

1. Enable the required capabilities

   1. Go to your root project and switch to the tab "Capabilities"
   
   2. Enable "Push Notifications"
   
   3. Enable "Background Modes" and check "Remote notifications"
   
2. Create your iOS push certificate

   1. Open Keychain Access on your Mac. (Application > Utilities > Keychain Access).
   2. Select Keychain Access > Certificate Assistant > Request a Certificate From a Certificate Authority...
   3. Select the "Save to disk" option and enter any information in the required fields
   4. Go to the [Apple developer portal](https://developer.apple.com/account/ios/identifier/bundle), select your app and press "Edit"
   5. Enable "Push notifications" and press "Done"
   6. Go to the [Create new certificate page](https://developer.apple.com/account/ios/certificate/create), select "Apple Push Notification service SSL" and press "Continue"
   7. Select your Application Bundle ID and press "Continue"
   8. Press "Choose File...", select the previously generated "certSigningRequest" file and then press "Generate"
   9. Press "Download" and save your certificate
   10. Click on the downloaded .cer file, Keychain Access should open
   11. Select Login > My Certificates then right click on your key and click "Export (Apple Production iOS Push Services: com.your.bundle)..."
   12. Give the file a unique name and press save, be sure to leave the password field blank!
   13. Upload your certificate in the CleverPush channel settings


### Setup Android

1. Add `compileOptions` to the `android` section in the `android/app/build.gradle` file:

  {{< highlight groovy >}}
  android {
    compileSdkVersion 27
    buildToolsVersion '27.0.3'
  
    compileOptions {
      sourceCompatibility JavaVersion.VERSION_1_8
      targetCompatibility JavaVersion.VERSION_1_8
    }
    
    ...
  {{< /highlight >}}


### Usage

{{< highlight react >}}
import React from 'react';
import { Text, View } from 'react-native';
import CleverPush from 'cleverpush-react-native';

export default class App extends React.Component {
  constructor() {
    super();

    this.onOpened = this.onOpened.bind(this);
    this.onSubscribed = this.onSubscribed.bind(this);
  }
  
  componentWillMount() {
    CleverPush.init('YOUR_CHANNEL_ID_HERE');

    CleverPush.addEventListener('opened', this.onOpened);
    CleverPush.addEventListener('subscribed', this.onSubscribed);
  }

  componentWillUnmount() {
    CleverPush.removeEventListener('opened', this.onOpened);
    CleverPush.removeEventListener('subscribed', this.onSubscribed);
  }

  onOpened(openResult) {
    console.log('Notification opened:', openResult);
  }

  onSubscribed(subscriptionId) {
    console.log('Subscribed with ID:', subscriptionId);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}
{{< /highlight >}}


Tagging and Attributes:

{{< highlight javascript >}}
CleverPush.getAvailableTags((err, channelTags) => {
  console.log(channelTags); // [{ id: "tag1", name: "Tag 1" }]
});
CleverPush.getAvailableAttributes((err, customAttributes) => {
  console.log(customAttributes); // [{ id: "attribute1", name: "Attribute 1" }]
});

CleverPush.getSubscriptionTags((err, tagIds) => {
  console.log(tagIds); // ["tag_id_1", "tag_id_2"]
});
CleverPush.getSubscriptionAttributes((err, attributes) => {
  console.log(attributes); // { attribute1: "value1", attribute2: "value2" }
});

CleverPush.addSubscriptionTag("tag_id");
CleverPush.removeSubscriptionTag("tag_id");
CleverPush.setSubscriptionAttribute("user_id", "1");

CleverPush.hasSubscriptionTag("tag_id", (err, hasTag) => {
  console.log(hasTag); // false
});
CleverPush.getSubscriptionAttribute("user_id", (err, attributeValue) => {
  console.log(attributeValue); // "value"
});
CleverPush.setSubscriptionAttribute("user_id", "1");

CleverPush.isSubscribed((err, isSubscribed) => {
  console.log(isSubscribed); // true
});
CleverPush.subscribe();
CleverPush.unsubscribe();
{{< /highlight >}}
