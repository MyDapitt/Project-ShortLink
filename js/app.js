const express = require('express');
const mongoose = require('mongoose');
const validUrl = require('valid-url');
const nanoid = require('nanoid');
const Url = require('./models/url');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/api/shorten', async (req, res) => {
  const longUrl = req.body.url;
  const baseUrl = process.env.BASE_URL;

  if (!validUrl.isUri(longUrl)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    let url = await Url.findOne({ longUrl });

    if (url) {
      res.json(url);
    } else {
      const shortUrl = baseUrl + '/' + nanoid(6);
      url = new Url({ longUrl, shortUrl });
      await url.save();
      res.json(url);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));