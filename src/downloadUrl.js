const fs = require('fs');
const ytdl = require("ytdl-core");

async function downloadAudio(url) {
    try {
        const info = await ytdl.getInfo(url);
        const videoTitle = info.videoDetails.title;

        if (!fs.existsSync('./src/downloads')) {
            fs.mkdirSync('./src/downloads');
        }
        const writableStream = fs.createWriteStream(`./src/downloads/${videoTitle}.mp3`);

        ytdl(url, { filter: 'audioonly' })
        .pipe(writableStream);

        console.log(`Downloading audio of "${videoTitle}" to downloads folder`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = downloadAudio;