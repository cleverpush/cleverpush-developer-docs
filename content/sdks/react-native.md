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

2. Add Notification Service Extension

    This is required for correctly tracking notification deliveries and for displaying big images or videos in notifications.

    1. Select `File` > `New` > `Target` in Xcode
    2. Choose `Notification Service Extension` and press `Next`
    3. Enter `CleverPushNotificationServiceExtension` as Product Name, choose `Objective-C` as language and press `Finish`
    4. Press `Activate` on the next prompt
    5. Add the following at the bottom of your Podfile

        {{< highlight bash >}}target 'CleverPushNotificationServiceExtension' do

  pod 'CleverPush'

end
{{< /highlight >}}
    6. Run `pod install`
    7. Open `NotificationService.m` and replace the whole content with the following:

        {{< highlight objective-c >}}
#import <CleverPush/CleverPush.h>

#import "NotificationService.h"

@interface NotificationService ()

@property (nonatomic, strong) void (^contentHandler)(UNNotificationContent *contentToDeliver);
@property (nonatomic, strong) UNNotificationRequest *receivedRequest;
@property (nonatomic, strong) UNMutableNotificationContent *bestAttemptContent;

@end

@implementation NotificationService

- (void)didReceiveNotificationRequest:(UNNotificationRequest *)request withContentHandler:(void (^)(UNNotificationContent * _Nonnull))contentHandler {
    self.receivedRequest = request;
    self.contentHandler = contentHandler;
    self.bestAttemptContent = [request.content mutableCopy];

    [CleverPush didReceiveNotificationExtensionRequest:self.receivedRequest withMutableNotificationContent:self.bestAttemptContent];

    self.contentHandler(self.bestAttemptContent);
}

- (void)serviceExtensionTimeWillExpire {
    [CleverPush serviceExtensionTimeWillExpireRequest:self.receivedRequest withMutableNotificationContent:self.bestAttemptContent];

    self.contentHandler(self.bestAttemptContent);
}

@end
{{< /highlight >}}

3. Create your iOS push certificate

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
   

4. Add AppGroup (optional)

    This is required for getting the received notifications via the `getNotifications` method

    1. Select your main application Target in Xcode
    2. Go to `Capabilities` and activate `App Groups`
    3. Create a new App Group with the following Scheme: `group.YOUR.BUNDLE.ID.cleverpush` (replace `YOUR.BUNDLE.ID` with your application's bundle identifier).
    4. Enable the created App Group by checking the checkbox next to it
    5. Select The `CleverPushNotificationExtension` target and also enable the created App Group under `Capabilities`



### Setup Android

1. Add `compileOptions` to the `android` section in the `android/app/build.gradle` file:

    {{< highlight groovy >}}android {
   compileSdkVersion 27
   buildToolsVersion '27.0.3'
    
   compileOptions {
     sourceCompatibility JavaVersion.VERSION_1_8
     targetCompatibility JavaVersion.VERSION_1_8
   }
    
   ...{{< /highlight >}}
  
2. Uncomment or remove Expo's FCM listener from `android/app/src/AndroidManifest.xml`:
   {{< highlight xml >}}<!-- FCM -->
<service
  android:name=".fcm.ExpoFcmMessagingService">
  <intent-filter>
    <action android:name="com.google.firebase.MESSAGING_EVENT"/>
  </intent-filter>
</service>{{< /highlight >}}

3. Add our FCM listeners to `android/app/src/AndroidManifest.xml`:
   {{< highlight xml >}}<application ...>
    
   <service
       android:name="com.cleverpush.service.CleverPushFcmListenerService">
       <intent-filter>
           <action android:name="com.google.firebase.MESSAGING_EVENT" />
       </intent-filter>
   </service>
   <service
       android:name="com.cleverpush.service.CleverPushInstanceIDListenerService">
       <intent-filter>
           <action android:name="com.google.firebase.INSTANCE_ID_EVENT" />
       </intent-filter>
   </service>

 </application>
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

CleverPush.setSubscriptionLanguage("de"); // iso language code
CleverPush.setSubscriptionCountry("DE"); // iso country code

CleverPush.isSubscribed((err, isSubscribed) => {
  console.log(isSubscribed); // true
});
CleverPush.subscribe();
CleverPush.unsubscribe();


Get received notifications:

{{< highlight javascript >}}
var notifications = CleverPush.getNotifications();
{{< /highlight >}}
