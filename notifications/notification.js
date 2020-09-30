const webpush = require("../config/webpush");

class Payload {
  constructor(
    title = "Notification",
    body = "Notification body",
    icon = "assets/icons/icon-512x512.png"
  ) {
    this.notification = {
      title: title,
      body: body,
      icon: icon,
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: []
    };
  }
}

class Notification {
  constructor(subscription, payload = new Payload()) {
      this.payload = payload;
      this.subscription = subscription;
  }

  send() {
    return webpush.sendNotification(this.subscription, JSON.stringify(this.payload)).catch(_ => {
      console.error(_);
    });
  }
}


module.exports = {
    Payload: Payload,
    Notification: Notification
}
