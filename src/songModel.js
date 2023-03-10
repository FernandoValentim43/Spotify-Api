const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  artist: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  addedAt: {
    type: Date,
    required: true,
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
  }
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
