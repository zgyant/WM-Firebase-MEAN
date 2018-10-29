var admin = require("firebase-admin");
var _ = require('underscore');

var serviceAccount = require("./service_account.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://wastemanagement-1540370241908.firebaseio.com"
});

// Get a database reference to our posts
var db = admin.database();
var ref = db.ref();





