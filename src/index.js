// !!!! FIRST SET-UP YOUR API KEY AT setSpotifyAuth.js !!!!!

const readline = require("readline");
const getSavedSongs = require("./getSavedSongs");

const saveSongs = require("./saveSongsJSON");
const searchVideo = require("./ytbApi");
const downloadAudio = require("./downloadUrl");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  rl.question(
    "Do you want to fetch the songs again? (y/n): ",
    async (answer) => {
      if (answer === "y") {
        //fetch and save the songs
        const savedSongs = await getSavedSongs();
        saveSongs(savedSongs)
      } else {
        //
      }

      rl.close();
    }
  );
}

main();
