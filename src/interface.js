const readline = require("readline");
const saveSongsDB = require("./saveSongsDB");
const saveSongsJSON = require("./saveSongsJSON");
const getSavedSongs = require("./getSavedSongs");

function getUserInput() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "\n=============================\nWhat do you want to do?\n[1]. Fetch new songs.\n[2]. Save new songs to the database.\n[3]. Quit.\n=============================\n",
    async (answer) => {
      if (answer === "1") {
        //const savedSongs = await getSavedSongs();
        //saveSongsJSON(savedSongs);
        console.log("\n*New songs fetched from Spotify!*\n");
        rl.close();
        getUserInput();
      } else if (answer === "2") {
        saveSongsDB().then((numSongs) => {
          console.log(`\n*Added ${numSongs} songs to the database!*\n`);
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
