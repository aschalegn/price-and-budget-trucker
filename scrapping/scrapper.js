const puppeteer = require("puppeteer");
const fs = require("fs");
const Tracker = require("../models/tracker");
const Cronjob = require("cron").CronJob;

scrap = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.amazon.com/-/he/dp/B073WRF565/ref=sr_1_8?keywords=amazonbasics&pf_rd_p=58cf7918-bfa4-45ca-ace2-65721aa9499a&pf_rd_r=NFWZY8TWWT4WECR8YGA1&qid=1581402234&sr=8-8');
    await page.waitForSelector("span#productTitle");
    const result = await page.evaluate(() => {
        const title = document.querySelector("span#productTitle").innerText;
        const price = document.querySelector("span#priceblock_ourprice").innerText;
        const image = document.querySelector("#imgTagWrapperId img").src;
        return { title, price, image }
    });
    await browser.close();
    console.log(result);
};

const readWrite = (result) => {
    fs.readFile("scrapped.txt", "utf8", (err, data) => {
        if (err) return "The is Error reading the file";
        let array = JSON.parse(data);
        array.push(result);
        fs.writeFile("scrapped.txt", JSON.stringify(array), (err) => {
            if (err) return "Error";
            else { return "writed successfully" }
        });
    });
}

module.exports.scrapOnAdding = async (track) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(track.url);
    await page.waitForSelector("span#productTitle");
    const result = await page.evaluate(() => {
        const title = document.querySelector("span#productTitle").innerText;
        const price = document.querySelector("span#priceblock_ourprice").innerText;
        const image = document.querySelector("#imgTagWrapperId img").src;
        return { title, price, image }
    });
    updateDB(track, result);
}

const updateDB = (track, result) => {
    Tracker.findByIdAndUpdate(track._id, { image: result.image, title: result.title, price: result.price })
        .then(track => {
            console.log({ track });
        }).catch(err => {
            console.log(err);
        });
}

const scrapJob = new Cronjob("39 * * * * *", () => {
    scrap();
});

scrapJob;