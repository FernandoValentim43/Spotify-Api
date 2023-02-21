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

  const playlist = (await spotifyApi.getMySavedTracks()).body;

  let allTracks = playlist.items; // Add the first batch of tracks to the array

  if (playlist.total > playlist.limit) {
    // Divide the total number of track by the limit to get the number of API calls
    for (let i = 1; i < Math.ceil(playlist.total / playlist.limit); i++) {
      const trackToAdd = (await spotifyApi.getMySavedTracks({
        offset: playlist.limit * i // Offset each call by the limit * the call's index
      })).body.items

     allTracks.push(...trackToAdd)

     console.log(`Downloaded ${allTracks.length} songs out of ${playlist.total}`);
    }
  }

  // Map the track data to an array of objects with "name" and "artist" fields
  const trackObjects = allTracks.map(track => {
    return {
      name: track.track.name,
      artist: track.track.artists[0].name,
    };
  });

  return trackObjects; // Return the array of track objects
}

// Example usage
getAllSongs().then(trackObjects => {
  console.log('Got all tracks:', trackObjects);
}).catch(error => {
  // Handle errors here
  console.error(error);
});

