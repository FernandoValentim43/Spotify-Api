// !!!! FIRST SET-UP YOUR API KEY AT setSpotifyAuth.js !!!!!

const fs = require("fs");
const getSavedSongs = require("./getSavedSongs");
const searchVideo = require("./ytbApi");

async function main() {
  // Get all saved songs
  const tracks = await getSavedSongs();

  // Convert the array to a JSON string
  const data = JSON.stringify(tracks, null, 2);

  // Write the JSON string to a file
  if (fs.existsSync("tracks.json")) {
    console.log("File already exists");
  } else {
    fs.writeFile(`tracks.json`, data, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  }

  //calls the ytb api and search for the videos
  const firstThreeTracks = tracks.slice(0, 2);

  for (let i = 0; i < firstThreeTracks.length; i++) {
    const track = firstThreeTracks[i];
    await searchVideo(track.artist, track.name);
  }
}

main();
