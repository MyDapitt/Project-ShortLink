const mongoose = require('mongoose');
const shortid = require('shortid');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const UrlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String
});

const UrlModel = mongoose.model('Url', UrlSchema);

exports.handler = async function(event, context) {
  try {
    const { originalUrl } = JSON.parse(event.body);
    const shortUrl = shortid.generate();

    const url = new UrlModel({
      originalUrl,
      shortUrl
    });

    await url.save();

    return {
      statusCode: 200,
      body: JSON.stringify({ shortUrl })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};