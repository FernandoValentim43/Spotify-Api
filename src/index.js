// !!!! FIRST SET-UP YOUR API KEY AT setSpotifyAuth.js !!!!!

const fs = require("fs");
const readline = require('readline');
const getSavedSongs = require("./getSavedSongs");
const searchVideo = require("./ytbApi");
const downloadAudio = require("./downloadUrl");

async function main() {
  let tracks;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Do you want to fetch new data? (Y/N) ', async (answer) => {
    if (answer.toUpperCase() === 'Y') {
      tracks = await getSavedSongs();
    } else {
      try {
        const data = fs.readFileSync('./tracks.json');
        tracks = JSON.parse(data);
      } catch (err) {
        console.error(`Error reading file: ${err}`);
        return;
      }
    }

    rl.close();

    const data = JSON.stringify(tracks, null, 2);
    const filePath = './tracks.json';

    if (fs.existsSync(filePath)) {
      console.log(`File ${filePath} already exists`);
    } else {
      fs.writeFile(filePath, data, (err) => {
        if (err) throw err;
        console.log(`The file ${filePath} has been saved!`);
      });
    }
  });
}


main() 