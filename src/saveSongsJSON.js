
const fs = require("fs");
const path = require("path");


const saveSongs = (savedSongs) => {
    const dataFolderPath = path.join(__dirname, "data");
        if (!fs.existsSync(dataFolderPath)) {
          fs.mkdirSync(dataFolderPath);
        }
        fs.writeFileSync(
          path.join(dataFolderPath, "saved-songs.json"),
          JSON.stringify(savedSongs)
        );
}


module.exports = saveSongs;
