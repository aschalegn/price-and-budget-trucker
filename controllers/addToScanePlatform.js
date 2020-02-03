const fs = require("fs");
const folder = "scrapping";

module.exports.addToScanePlatform = (newTracker, platform) => {
    //write to the matching file
    fs.writeFile(`${folder}/${platform}.txt`, "," + newTracker.url + "\n", 'utf8', (err) => {
        if (err) { console.log("Error while writing to file: *", err) }
    });
}
