var admin = require("firebase-admin");

var serviceAccount = require("./service_account.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://wastemanagement-1540370241908.firebaseio.com"
});

// Get a database reference to our posts
var db = admin.database();
var ref = db.ref();

// Attach an asynchronous callback to read the data at our posts reference
ref.on("child_added", function(snapshot) {
    var bin_data=snapshot.val();
  console.log(bin_data['metadata']);
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});



