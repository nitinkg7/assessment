const express = require('express');
const app = express();
var admin = require("firebase-admin");
var serviceAccount = require("./assets/service_account_key.json");
const dripApiCall = require("./dripApi");

//authentication with firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


const port = 3001;                                                    
app.get('/', (req, res) => {
    res.send('SmartCookie.App');
});

// route to hit to get emailing done
app.get('/email', async(req, res) => {

    let db = admin.firestore();                                         //accessing the firestore database
    const usersRef = db.collection('users');                            //choosing users collection
    const snapshot = await usersRef.get();                              //getting data from firestore's users collection
    if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      } 

      let payload =[];                                                  // drip payload
      snapshot.forEach(doc => {
        console.log("user's email id", doc.data().email);
        payload.push({
            email: doc.data().email,                                    //configuring the drip payload with users email id
            action: 'Reminder'
          });
        
      });      
      
      dripApiCall(payload);
      res.send('See your console for result');
    
});
app.listen(port, () => console.log(`App listening on port ${port}!`));      //listening on port 3001