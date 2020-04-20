const functions = require('firebase-functions');
var admin = require("firebase-admin");

var serviceAccount = require("./blood-alert-88693-firebase-adminsdk-kleri-e49d4d887d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://blood-alert-88693.firebaseio.com"
});

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.sayHello = functions.https.onCall((data, context) => {
  const payload = {
    notification: {
      title: 'New message from blood alert!',
      body: `someone needs you blood at ${data.hospitalName}`
    }
  }
  //get the token of this user
  const token = data.token
  //const token="c1U6lpyFtsY:APA91bGT2J7NuqA5m8Wk-mysdT3crw0kHBXIF6t4adx_vGtagh0SH8Z20gfzlo4ctyiK98h8jDOH7IMsp0qAY1EvLTzsWFnkMyx3FgArwBJV5VfxQKj5ZdKRi-2IkvYN00cKV3_WtGIF"
  return admin.messaging().sendToDevice(token, payload);
})
