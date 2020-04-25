
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '631562211191'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {

  var obj=JSON.parse(payload.data.notification);

  const notificationTitle = obj.title;
  const notificationOptions = {
    body: obj.body,
    icon: obj.icon
  };


  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

