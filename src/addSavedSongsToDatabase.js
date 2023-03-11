const Song = require('./models/Song');

async function addSavedSongsToDatabase() {
  try {
    // load the JSON file with the songs
    const songs = require('./data/saved-songs.json');

    // get the first song from the array
    const firstSong = songs[0];

    // create a new Song document with the first song data
    const song = new Song({
      artist: firstSong.artist,
      name: firstSong.name,
      addedAt: new Date(firstSong.addedAt)
    });

    // save the Song document to the database
    await song.save();

    console.log(`Added song "${song.name}" by ${song.artist} to the database.`);
  } catch (err) {
    console.error(err);
  }
}

module.exports = addSavedSongsToDatabase;
