
const fs = require("fs");
const path = require('path');

const jsonPath = path.join(__dirname, 'data', 'saved-songs.json')

function checkLength() {
    if (fs.existsSync(jsonPath)) {
        return Object.keys(JSON.parse(fs.readFileSync(jsonPath))).length;
    } else {
        return 0
    }
      
}


module.exports = checkLength;