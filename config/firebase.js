const firebaseAdmin = require('firebase-admin');

var serviceAccount = require("../pensil-teaching-app-firebase-adminsdk.json");

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://pensil-teaching-app.firebaseio.com"
});

module.exports = firebaseAdmin;