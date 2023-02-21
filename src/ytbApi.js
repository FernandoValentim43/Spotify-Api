require("dotenv").config();
const { google } = require('googleapis');

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YTB // Replace with your own API key
});

async function searchVideo(name, artist) {
  const query = `${name} ${artist} music video`;
  const searchResult = await youtube.search.list({
    part: 'id',
    q: query,
    type: 'video'
  });

  const videoId = searchResult.data.items[0].id.videoId;
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  return url;
}



module.exports = searchVideo;
