/* require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Song = require("./models/Song")
//express
const app = express();
app.use(express.json());
app.use(cors());

//mongoose connection
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Mongo connected");
});

//app setup
app.listen(3939, () =>
  console.log(`Server running on port 3939 - http://localhost:3939`)
);


app.get("/songs", async (req, res) => {
  const songs = await Song.find();

  res.json(songs);
});

app.post("/song/new", (req, res) => {
  const song = new Song({
    artist: req.body.artist,
    name: req.body.name,
    addedAt: req.body.addedAt
  });

  song.save();
  res.json(song);
});
 */