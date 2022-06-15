## Install

```bash
yarn add @eaprules/easy-notification
```

create a file called 'firebase-messaging-sw.js; in the built folder (ex: public folder)
and put the following code inside

```javascript
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");
importScripts("https://cdn.jsdelivr.net/npm/idb@5.0.4/build/iife/index-min.js");

// Initialize the Firebase app in the service worker by passing the generated config
firebase.initializeApp({
  apiKey: *,
  authDomain: *,
  databaseURL: *,
  projectId: *,
  storageBucket: *,
  messagingSenderId: *,
  appId: *,
});

async function storeNotif(payload) {
  const dbName = "admin";
  const storeName = "notifications";
  const limit = 250;

  const adminDB = await idb.openDB(dbName, 2, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
      }
    },
  });

  adminDB.put(storeName, payload);

  const count = await adminDB.count(storeName);

  if (count > limit) {
    const list = await adminDB.getAll(storeName);

    for (const item of list.reverse().slice(limit)) {
      adminDB.delete(storeName, item.id);
    }
  }

  adminDB.close();
}

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  storeNotif({
    moment: payload.data.moment,
    organization: payload.data.organization,
    type: payload.data.type,
    message: payload.data.body,
  });

  return self.registration.showNotification(payload.data.title, {
    body: payload.data.body,
    icon: payload.data.icon,
    data: {
      click_action: payload.data.click_action,
    },
  });
});

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    self.clients.openWindow(event.notification.data.click_action)
  );
});
```


## How to use it?
import useNotification from '@eaprules/easy-notification';

```javascript
useNotification(firebaseConfig: firebaseConfig, vapidKey: string): {
    suscribe: () => Promise<string>;
    unsuscribe: () => Promise<boolean>;
    onMessageListener: () => Unsubscribe;
}
```

#Input
```javascript
useNotification(firebaseConfig: firebaseConfig, vapidKey: string)
```
#Output
```javascript
{
    suscribe: () => Promise<string>;
    unsuscribe: () => Promise<boolean>;
    onMessageListener: () => Unsubscribe;
}
```