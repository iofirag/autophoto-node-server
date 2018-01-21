console.log('import firebase.config')
var admin = require("firebase-admin");

// Fetch the service account key JSON file contents
var serviceAccount = require('./autophoto-3e7d2-firebase-adminsdk-lr6z9-a35660f79b.json');

// Initialize the app with a custom auth variable, limiting the server's access
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://autophoto-3e7d2.firebaseio.com/'
})

// The app only has access as defined in the Security Rules
var db = admin.database();
exports.db = db