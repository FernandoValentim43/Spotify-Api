const Song = require('./models/Song');

async function saveSongsDB() {
  try {
    // load the JSON file with the songs
    const songs = require('./data/saved-songs.json');

    // create an array to store the Song documents
    const songDocuments = [];

    for (const songData of songs) {
      const song = new Song({
        artist: songData.artist,
        name: songData.name,
        addedAt: new Date(songData.addedAt),
        spotifyId: songData.spotifyId
      });
      songDocuments.push(song);
    }

    // save the Song documents to the database
    const result = await Song.insertMany(songDocuments);

    return result.length;
  } catch (err) {
    console.error(err);
  }
}


module.exports = saveSongsDB;
