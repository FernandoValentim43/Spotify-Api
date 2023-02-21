// !!!! FIRST SET-UP YOUR API KEY AT setSpotifyAuth.js !!!!!

const fs = require("fs");
const getSavedSongs = require("./getSavedSongs");
const searchVideo = require("./ytbApi");
const downloadAudio = require("./downloadUrl");


/* async function main() {
  // Get all saved songs
  const tracks = await getSavedSongs();

  // Convert the array to a JSON string
  const data = JSON.stringify(tracks, null, 2);

  // Write the JSON string to a file
  const filePath = "./tracks.json"; // File path relative to the current directory
  if (fs.existsSync(filePath)) {
    console.log(`File ${filePath} already exists`);
  } else {
    fs.writeFile(filePath, data, (err) => {
      if (err) throw err;
      console.log(`The file ${filePath} has been saved!`);
    });
  }

  // Calls the YouTube API and search for the videos
  const firstThreeTracks = tracks.slice(0, 2); // Get the first 2 tracks
  const urls = []; // Array to store the URLs of the videos

  for (let i = 0; i < firstThreeTracks.length; i++) {
    const track = firstThreeTracks[i];
    const url = await searchVideo(track.artist, track.name); // Call the searchVideo function and get the URL
    urls.push(url); // Add the URL to the array
  }

  // Convert the URLs array to a JSON string
  const urlsData = JSON.stringify(urls, null, 2);

  // Write the JSON string to a file
  const urlsFilePath = "./urls.json"; 
  fs.writeFile(urlsFilePath, urlsData, { flag: 'w' }, (err) => {
    if (err) throw err;
    console.log(`The file ${urlsFilePath} has been saved!`);
  });

  for (let i = 0; i < urls.length; i++) {
    await downloadAudio(urls[i]);
  }

}

main(); */


let urls = [
  "https://www.youtube.com/watch?v=wpqm-05R2Jk",
  "https://www.youtube.com/watch?v=gaA7RAy5rYg",
  "https://www.youtube.com/watch?v=XpdpW0z9xnQ",
  "https://www.youtube.com/watch?v=GkzRyKWChjY",
  "https://www.youtube.com/watch?v=5rAOyh7YmEc",
  "https://www.youtube.com/watch?v=db5OQmod0JU",
  "https://www.youtube.com/watch?v=db5OQmod0JU",
  "https://www.youtube.com/watch?v=u6EuhylVHaw",
  "https://www.youtube.com/watch?v=omwXLXeTR4w",
  "https://www.youtube.com/watch?v=DJq6BgrEivY",
];
  
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
       downloadAudio(url);
    } catch (error) {
      console.log(`Error downloading audio for URL ${url}: ${error.message}`);
      continue; // Skip to the next URL
    }
  }