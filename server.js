const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const shortid = require('shortid');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect('mongodb+srv://sazumiviki:sazumi2005@sazumiviki.hk7jpu9.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const UrlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String
});

const UrlModel = mongoose.model('Url', UrlSchema);

app.post('/api/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = shortid.generate();

  const url = new UrlModel({
    originalUrl,
    shortUrl
  });

  await url.save();

  res.json({ shortUrl });
});

app.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;

  const url = await UrlModel.findOne({ shortUrl });

  if (url) {
    res.redirect(url.originalUrl);
  } else {
    res.status(404).send('Not Found');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});