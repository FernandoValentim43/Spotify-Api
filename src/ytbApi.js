require("dotenv").config();
const { google } = require('googleapis');

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YTB // Replace with your own API key
});

async function searchAndPlay() {
    const searchResult = await youtube.search.list({
      part: 'id',
      q: 'banana',
      type: 'video'
    });
  
    const videoId = searchResult.data.items[0].id.videoId;
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    console.log(url);
  }
  
  searchAndPlay();