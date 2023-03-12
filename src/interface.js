const readline = require("readline");
const fs = require("fs");
const path = require('path');
const saveSongsDB = require("./saveSongsDB");
const saveSongsJSON = require("./saveSongsJSON");
const getSavedSongs = require("./getSavedSongs");


let numSavedSongs = 0;
const jsonPath = path.join(__dirname, 'data', 'saved-songs.json')
if (fs.existsSync(jsonPath)) {
  numSavedSongs = Object.keys(JSON.parse(fs.readFileSync(jsonPath))).length;
} 

function getUserInput() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    `\n=============================\n[${numSavedSongs} Songs Saved] What do you want to do?\n[1] Fetch new songs\n[2] Save new songs to the database\n[3] Quit\n=============================\n`,
    async (answer) => {
      if (answer === "1") {
        //const savedSongs = await getSavedSongs();
        //saveSongsJSON(savedSongs);
        console.log("\n*New songs fetched from Spotify!*\n");
        rl.close();
        getUserInput();
      } else if (answer === "2") {
        saveSongsDB().then((numSongs) => {
          numSavedSongs += numSongs;
          console.log(`\n[${numSavedSongs} Songs Saved] *Added ${numSongs} songs to the database!*\n`);
          rl.close();
          getUserInput();
        });
      } else if (answer === "3") {
        rl.close();
        process.exit(0);
      } else {
        console.log("Invalid option. Please try again.");
        rl.close();
        getUserInput();
      }
    }
  );
}

module.exports = getUserInput;
