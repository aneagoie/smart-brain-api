const Clarifai = require('clarifai');

//OLD WAY: 
// const app = new Clarifai.App({
//  apiKey: 'YOUR API KEY HERE' 
// });

const returnClarifaiRequestOptions = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in Clarifai's Account Security section
  const PAT = 'YOUR_PAT_HERE';
  // You can keep the 'clarifai'/'main' without changing it to your own unless you want to. 
  // This will use the public Clarifai model so you dont need to create an app:
  const USER_ID = 'clarifai';       
  const APP_ID = 'main';

  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });

  return {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };
}

const handleApiCall = (req, res) => {
  //OLD WAY:
  // app.models.predict('face-detection', req.body.input)
  //NEW WAY:
  fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiRequestOptions(req.body.input))
    .then(response => response.json())
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    // If you are using knex.js version 1.0.0 or higher this now returns an array of objects. Therefore, the code goes from:
    // entries[0] --> this used to return the entries
    // TO
    // entries[0].entries --> this now returns the entries
    res.json(entries[0].entries);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}