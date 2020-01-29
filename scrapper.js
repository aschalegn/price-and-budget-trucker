const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.amazon.com/AmazonBasics-Braided-Lightning-Certified-Charger/dp/B01F9RH0R4?pf_rd_p=27643bbf-38ff-4db5-8032-83558fc1281c&pd_rd_wg=Httk7&pf_rd_r=H741CQEF6VBXF24HJMJA&ref_=pd_gw_unk&pd_rd_w=MtEdD&pd_rd_r=0f35e116-d98a-44f2-924c-358064178236');
    await page.waitForSelector("span#productTitle");
    const result = await page.evaluate(() => {
        let title = document.querySelector("span#productTitle").innerText;
        let price = document.querySelector("span#priceblock_ourprice").innerText;
        return { title, price }
    });
    
    await browser.close();

    fs.readFile("scrapped.txt", "utf8", (err, data) => {
        if (err) return "The is Error reading the file";
        let array = JSON.parse(data);

        array.push(result)
        fs.writeFile("scrapped.txt", JSON.stringify(array), (err) => {
            if (err) console.log("Error")
            else { console.log("writed successfully") }

        });
    });

})();






