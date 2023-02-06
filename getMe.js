const fs = require("fs");
require("dotenv").config();

const SpotifyWebApi = require("spotify-web-api-node");
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(process.env.TOKEN);

function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    getUserPlaylists();
  })().catch((e) => {
    console.error(e);
  });
}

async function getUserPlaylists() {
  const data = (await spotifyApi.getMySavedTracks({limit : 50})).body

  console.log(data)


 /*  for (let i = 0; i < data.body.items.length; i++) {
    console.log(
      "SONG NAME: " +
        data.body.items[i].track.name +
        " ----- ARTIST: " +
        data.body.items[i].track.artists[0].name
    );
  } */
}

getMyData()



  
