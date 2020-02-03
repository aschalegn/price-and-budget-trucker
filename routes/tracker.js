const router = require("express").Router();
const Tracker = require("../models/tracker");
const trackerPlatform = require('../controllers/addToScanePlatform')
const User = require("../models/user");
const auth = require("../controllers/user")
router.get("/", (req, res) => {
    res.send("this is the get route")
});

router.post("/", (req, res) => {
    if (!auth.isLogedIn) {
        res.send("UnAythorised")
        return
    }

    User.findById(req.body._id, (err, user) => {
        if (err) {
            console.log("Error:", err);
        }

        if (user) {
            const platform = req.body.url.split('.')[1];
            let newTracker = new Tracker({
                title: req.body.title,
                url: req.body.url,
                currentPrice: req.body.currentPrice,
                desiredPrice: req.body.desiredPrice,
                user: user._id,
                platform: platform
            });
            newTracker.save();
            if (newTracker) {
                res.send(newTracker);
                user.trackers.push(newTracker);
                user.save();
                trackerPlatform.addToScanePlatform(newTracker, platform);
            } else {
                res.send("not added");
            }
        }
        else {
            res.send("User not found");
        }
    });
});

router.patch("/:id", (req, res) => {

})

router.patch("/:id/buy", (req, res) => {

})

router.delete("/:id", (req, res) => {

})


module.exports = router