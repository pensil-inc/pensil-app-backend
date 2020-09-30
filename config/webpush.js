const webpush = require('web-push');

// Generate Vapid keys before using this
webpush.setVapidDetails('mailto:chaharshubhamsingh@gmail.com', process.env.VAPID_PUBLICKEY || '', process.env.VAPID_PRIVATEKEY || '');

module.exports = webpush;