// !!!! FIRST SET-UP YOUR API KEY AT setSpotifyAuth.js !!!!!

const path = require("path");
require("dotenv").config({ path: __dirname + "/./../../.env" });
const getUserInput = require("./interface");

const getSavedSongs = require("./getSavedSongs");
const addSavedSongsToDatabase = require("./saveSongsDB");
const saveSongs = require("./saveSongsJSON");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//express
const app = express();
app.use(express.json());
app.use(cors());


//app setup

async function main() {
  await new Promise((resolve, reject) => {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URL, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log("Mongo connected");
        resolve();
      }
    });
  });

  app.listen(4000, () => {
    console.log(`Server running on port 4000 - http://localhost:4000`);

    getUserInput();
  });
}

main();
