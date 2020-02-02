const fs = require("fs");
const path = require("path");
const folder = "../scrapping";

module.exports.getPlatform = (newTracker) => {
    let file = ''
    //regular Expretion
    const platform = newTracker.url.split('.')
    console.log(platform[1]);

    //write to the matching file
    fs.writeFile(`${folder}/${file}`, newTracker.url, 'utf8', (err) => {
        
    })
}