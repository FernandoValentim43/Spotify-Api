// !!!! FIRST SET-UP YOUR API KEY AT setSpotifyAuth.js !!!!!

const fs = require("fs");
const readline = require('readline');
const path = require('path');
const getSavedSongs = require("./getSavedSongs");
const searchVideo = require("./ytbApi");
const downloadAudio = require("./downloadUrl");



async function main() {
  //fetch the songs
 const savedSongs = await getSavedSongs()
 
 //save the songs in a file
 const dataFolderPath = path.join(__dirname, 'data');
 if (!fs.existsSync(dataFolderPath)) {
   fs.mkdirSync(dataFolderPath);
 }
 fs.writeFileSync(path.join(dataFolderPath, 'saved-songs.json'), JSON.stringify(savedSongs));
}


main() 