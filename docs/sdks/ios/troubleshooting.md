---
id: troubleshooting
title: Troubleshooting
---

## Notification with images (Rich Medias) are not working

In the project navigator, select the top-level project directory and select the Open `CleverPushNotificationContentExtension` & `CleverPushNotificationServiceExtension` target in the project and targets list.

1. Once you start with the fresh Xcode project, it will select last OS support as a deployment target for e.g (if you have generated project via XCode 12.4 and its latest OS support is 14.4 so 14.4 will be default selection on Xcode.)

2. Unless you have a specific reason not to, you should set the Deployment Target to be iOS 10 which is the version of iOS that Apple released Rich Media for push. iOS versions under 10 will not be able to get Rich Media.

3. You will have to make sure all the deployment targets of the extensions must be the same.

4. An iOS device (iPhone, iPad, iPod Touch) to test on. The Xcode simulator doesn't support push notifications so you must test on a real device.


## When opening a Notification, all other Notifications get cleared

This is due to iOS automatically clearing all notifications when our SDK reset the badge count to zero. This behaviour can be changed.
Please refer to the **Badge Counts** section on the **Methods** page for further instructions.
