const client = require('drip-nodejs')({ token: "YOUR_API_KEY", accountId: "YOUR_ACCOUNT_ID" });  //connect to drip by your id 

module.exports = function dripApiCall(payload){
    client.createUpdateSubscriber(payload, ()=>{console.log("subscriber listed")});                  //make an api call
  };

 
