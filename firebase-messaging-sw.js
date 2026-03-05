// firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB8bxgR6veYlGd21NOUq-is1iqaDFdMANA",
  authDomain: "abdu-all.firebaseapp.com",
  projectId: "abdu-all",
  storageBucket: "abdu-all.firebasestorage.app",
  messagingSenderId: "823333682925",
  appId: "1:823333682925:web:8ba6bdae41fefb1c6cd6e4"
});

const messaging = firebase.messaging();

// Background notification handler
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon-192.png' // replace with your icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
