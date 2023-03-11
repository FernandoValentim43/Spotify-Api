const Song = require('./models/Song');

async function addSavedSongsToDatabase() {
  try {
    // load the JSON file with the songs
    const songs = require('./data/saved-songs.json');

    // get the first 120 songs from the array
    const first120Songs = songs.slice(0, 120);

    // create an array to store the Song documents
    const songDocuments = [];

    // loop through the first 120 songs and create Song documents for each
    for (const songData of first120Songs) {
      const song = new Song({
        artist: songData.artist,
        name: songData.name,
        addedAt: new Date(songData.addedAt)
      });
      songDocuments.push(song);
    }

    // save the Song documents to the database
    await Song.insertMany(songDocuments);

    console.log(`Added ${songDocuments.length} songs to the database.`);
  } catch (err) {
    console.error(err);
  }
}

module.exports = addSavedSongsToDatabase;
