// !!!! FIRST SET-UP YOUR API KEY AT setSpotifyAuth.js !!!!!

const path = require("path")
require('dotenv').config({path:__dirname+'/./../../.env'})

const readline = require("readline");
const getSavedSongs = require("./getSavedSongs");
const addSavedSongsToDatabase = require("./addSavedSongsToDatabase");
const saveSongs = require("./saveSongsJSON");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//mongoose connection
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Mongo connected");
});

//express
const app = express();
app.use(express.json());
app.use(cors());
/* const searchVideo = require("./ytbApi");
const downloadAudio = require("./downloadUrl"); */

//app setup

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  app.listen(3939, () =>
    console.log(`Server running on port 3939 - http://localhost:3939`)
  );

  rl.question(
    "Do you want to fetch the songs again? (y/n): ",
    async (answer) => {
      if (answer === "y") {
        // fetch and save the songs
        const savedSongs = await getSavedSongs();
        saveSongs(savedSongs);

        // add the saved songs to the database
        addSavedSongsToDatabase();
      } else {
        // add the saved songs to the database
        addSavedSongsToDatabase();
        rl.close();
      }

      rl.close();
    }
  );
}

main();
