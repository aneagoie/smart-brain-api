const Clarifai = require('clarifai');
require('dotenv').config();

const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_KEY,
});
//Sometimes Clarifai.FACE_DETECT_MODEL doesn't work use this apikey in replace
//  apiKey: 'c0c0ac362b03416da06ab3fa36fb58e3',
const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with api'));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'));
};

module.exports = {
  handleImage,
  handleApiCall,
};
