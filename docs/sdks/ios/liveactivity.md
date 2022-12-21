---
id: liveactivity
title: Live Activities
---

# Introduction

- WWDC22 introduced a Live Activities API in iOS 16. With it, we can live to update a notification instead of sending multiple notifications.
- Live Activity is a new feature that helps users stay on top of things that are happening in real-time, such as a sports game, workout, ride-share, or food delivery order, right from the Lock Screen.
- Live Activities can be used in the below type of categories applications
    - **Sports** - Real-time scores, match, and player statistics
    - **News** - Breaking news
    - **Fitness** - Walk, run statistics during your workout or walk
    - **Deliveries** - Running delivery status, running order status
    - **Entertainment** - Live concert updates
    - **Travel** - Flight, booking updates


# Get started

## Step 1: Add a live activity widget extension to the ios project
> File > New > Target 

![Import activities](https://static.cleverpush.com/docs/Screenshot+2022-12-20+at+6.50.54+PM.png)

## Step 2: Select target as a widget extension
> Target > Widget Extension 

![Select extension type](https://static.cleverpush.com/docs/Screenshot+2022-12-20+at+6.51.06+PM.png)

## Step 3: Include live activity
- Enter the widget extension name, and also select the checkmark of **Include Live Activity** because without selecting that widget extension will not be added.

![Select extension type](https://static.cleverpush.com/docs/Screenshot-2022-12-21-at-5-16-40-PM.png)

## Step 4: Enable Supports Live Activities 
- Go to the info.plist in the project add the key **Supports Live Activities** and set it to Yes

![Select extension type](https://static.cleverpush.com/docs/Screenshot-2022-12-21-at-5-24-40-PM.png)

## Step 5: Displaying live data with Live Activities
- [Apple’s Guideline for creating live Activity](https://developer.apple.com/documentation/activitykit/displaying-live-data-with-live-activities)

## Step 6: Create your live Activity
- Import **CleverPush** and **ActivityKit** into your view controller

   ```sh
   import CleverPush
   import ActivityKit
   ```
   
## Step 7: Enter the below code to start a Live Activity and register your activity_id with Cleverpush.
- After registering live activity they will return the live Activity id and activity push token.
- We must have to pass the **activity.id** and **activity.token** to the **CleverPush.startLiveActivity** method for sending updates or ending the activity

```sh
import ActivityKit
import CleverPush

class ViewController: UIViewController {
   func startLiveActivity() {
     let attributes = CleverPushWidgetExtensionAttributes(title: "CleverPush")
            let contentState = CleverPushWidgetExtensionAttributes.LiveDeliveryData(message: "Live Activity Stared")
        do {
            let activity = try Activity<CleverPushWidgetExtensionAttributes>.request(
                    attributes: attributes,
                    contentState: contentState,
                    pushType: .token)
            Task {
                for await data in activity.pushTokenUpdates {
                    let myToken = data.map {String(format: "%02x", $0)}.joined()
                    [CleverPush startLiveActivity:activity.id pushToken:actvityToken];
                }
            }
        } catch (let error) {
            print(error.localizedDescription)
        }
    }
}
   ```

## Live Activity API reference
[How to send live activity updates](https://developers.cleverpush.com/docs/api/ios/liveactivity)

