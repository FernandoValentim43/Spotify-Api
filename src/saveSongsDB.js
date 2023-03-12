const Song = require('./models/Song');

async function saveSongsDB() {
  try {
    // load the JSON file with the songs
    const songs = require('./data/saved-songs.json');

    // create an array to store the Song documents
    const songDocuments = [];

    for (let i = 0; i < songs.length; i++) {
      const songData = songs[i];

      // check if the song already exists in the database
      const existingSong = await Song.findOne({ spotifyId: songData.spotifyId });
      if (existingSong) {
        console.log(`Song ${i + 1} of ${songs.length} already exists in the database`);
        continue;
      }

      // create a new Song document for the song
      const song = new Song({
        artist: songData.artist,
        name: songData.name,
        addedAt: new Date(songData.addedAt),
        spotifyId: songData.spotifyId
      });
      songDocuments.push(song);

      console.log(`Saved song ${i + 1} of ${songs.length} to be added to the database`);
    }

    // save the Song documents to the database
    if (songDocuments.length > 0) {
      const result = await Song.insertMany(songDocuments);
      console.log(`Saved ${result.length} new songs to the database`);
      return result.length;
    } else {
      console.log('No new songs to save to the database');
      return 0;
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = saveSongsDB;
