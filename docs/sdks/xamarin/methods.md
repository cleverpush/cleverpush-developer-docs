---
id: methods
title: Methods
---

### Usage

```csharp
using Com.CleverPush;

public App()
{
  [...]

  CleverPush.Current.StartInit("CLEVERPUSH_CHANNEL_ID_HERE")
  			.HandleNotificationOpened((result) =>
              {
                 Debug.WriteLine("CleverPush HandleNotificationOpened: {0}", result.notification.title);
              })
             .HandleNotificationReceived((result) =>
             {
                Debug.WriteLine("CleverPush HandleNotificationReceived: {0}", result.notification.title);
             })
  		   .HandleSubscribed((subscriptionId) =>
  		   {
  			   Debug.WriteLine("CleverPush HandleSubscribed: {0}", subscriptionId);
  		   })
             .EndInit();
}
```


Basic features:

```csharp
CleverPush.Current.Subscribe();
CleverPush.Current.Unsubscribe();
```
