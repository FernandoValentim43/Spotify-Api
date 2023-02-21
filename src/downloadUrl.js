const fs = require('fs');
const ytdl = require("ytdl-core");

async function downloadAudio(url) {
    try {
        const info = await ytdl.getInfo(url);
        const videoTitle = info.videoDetails.title;

        if (!fs.existsSync('./src/downloads')) {
            fs.mkdirSync('./src/downloads');
        }
        const writableStream = fs.createWriteStream(`./src/downloads/${videoTitle.replace(/[^a-zA-Z0-9 ]/g, '')
    }.mp3`);

        writableStream.on('error', (error) => {
            console.log(`Error writing audio file: ${error.message}`);
        });

        const audioStream = ytdl(url, { filter: 'audioonly' });

        audioStream.on('error', (error) => {
            console.log(`Error downloading audio stream: ${error.message}`);
        });

        audioStream.pipe(writableStream);

        console.log(`Downloading audio of "${videoTitle}" to downloads folder`);
    } catch (error) {
        console.log(`Error downloading audio for URL ${url}: ${error.message}`);
    }
}


downloadAudio("https://www.youtube.com/watch?v=GkzRyKWChjY")

module.exports = downloadAudio;