require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
/* const Song = require("./songModel") */
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
app.listen(4040, () =>
  console.log(`Server running on port 4040 - http://localhost:4040`)
);

const songSchema = new mongoose.Schema({
 
  artist: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  addedAt: {
    type: String,
    default: Date.now(),
  },
  alreadyUrl: {
    type: Boolean,
    default: false,
  },
  alreadyDownloaded: {
    type: Boolean,
    default: false,
  },
  url: {
    type: String,
    default: null,
  },
});

const Song = mongoose.model("Song", songSchema);

app.get("/songs", async (req, res) => {
  const songs = await Song.find();

  res.json(songs);
});

app.post("/song/new", (req, res) => {
  const link = new Song({
    text: req.body.text,
    label: req.body.label,
    tags: req.body.tags,
  });

  link.save();
  res.json(link);
});
