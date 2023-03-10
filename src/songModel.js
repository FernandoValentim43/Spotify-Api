const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  artist: {
    type: String,
    required: false,
    default: false
  },
  name: {
    type: String,
    required: false,
    default: false

  },
  addedAt: {
    type: Date,
    required: false,
    default: false

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
