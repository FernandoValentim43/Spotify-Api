require("dotenv").config();
const fs = require('fs');
const SpotifyWebApi = require("spotify-web-api-node");
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(process.env.TOKEN);


/*
let allTracks = []
async function getAllSongs() {
  
  const playlist = (await spotifyApi.getMySavedTracks()).body;

  if (playlist.total > playlist.limit) {
    // Divide the total number of track by the limit to get the number of API calls
    for (let i = 1; i < Math.ceil(playlist.total / playlist.limit); i++) {
      const trackToAdd = (await spotifyApi.getMySavedTracks({
        offset: playlist.limit * i // Offset each call by the limit * the call's index
      })).body.items

     allTracks.push(...trackToAdd)
    }
  }

 
}


getAllSongs()


 */


async function getAllSongs() {
  const allTracks = [];

  const playlist = (await spotifyApi.getMySavedTracks()).body;

  if (playlist.total > playlist.limit) {
    // Divide the total number of track by the limit to get the number of API calls
    for (let i = 1; i < Math.ceil(playlist.total / playlist.limit); i++) {
      const trackToAdd = (await spotifyApi.getMySavedTracks({
        offset: playlist.limit * i // Offset each call by the limit * the call's index
      })).body.items;

      allTracks.push(...trackToAdd);
      console.log(`Downloaded ${allTracks.length} songs out of ${playlist.total}`);
    }
  } else {
    allTracks.push(...playlist.items);
  }

  const trackObjects = allTracks.map((track) => {
    const { name, artists } = track.track;
    const artist = artists[0].name;
    return { artist, name };
  });

  const data = JSON.stringify(trackObjects, null, 2);

  fs.writeFile('tracks.json', data, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}

getAllSongs();