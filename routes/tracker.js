const router = require("express").Router();
const Tracker = require("../models/tracker");
const trackerPlatform = require('../controllers/addToScanePlatform')
const User = require("../models/user");
const auth = require("../controllers/user");
const Scraper = require("../scrapper");

router.get("/", (req, res) => {
    res.send("this is the get route")
});

router.post("/", (req, res) => {
    if (!auth.isLogedIn) {
        res.send("UnAuthorised");
        return
    }

    User.findById(req.body._id, (err, user) => {
        if (err) {
            console.log("Error:", err);
            return
        }

        if (user) {
            let newTracker = new Tracker({
                title: req.body.title,
                url: req.body.url,
                currentPrice: req.body.currentPrice,
                desiredPrice: req.body.desiredPrice,
                platform: 'amazon'
            });
            newTracker.save();

            if (newTracker) {
                user.trackers.push(newTracker);
                user.save();
                res.status(201).send(newTracker);
                Scraper.scrapOnAdding(newTracker);
                return
            } else {
                res.send("not added");
            }
        }
        else {
            res.send("User not found");
        }
    });
});

router.get("/:user_id", (req, res) => {
    if (!auth.isLogedIn) {
        res.status(401).send("UnAuthorize");
        return
    }
    User.findById(req.params.user_id, (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error acuured")
        }
        if (user) {
            User.findById(user._id).select("trackers").populate("trackers")
                .exec((err, user) => {
                    res.send(user)
                    return
                })
        }
    });
});

router.patch("/:id", (req, res) => {

})

router.patch("/:id/buy", (req, res) => {

})

router.delete("/:track_id/:user_id", (req, res) => {
    if (!auth.isLogedIn) {
        return res.sendStatus(401);
    }
    User.findById(req.params.user_id, (err, user) => {
        Tracker.findByIdAndDelete(req.params.track_id, (err, track) => {
            if (err) {
                return res.sendStatus(500);
            }
            if (track) {
                user.trackers = user.trackers.filter(tracker => {
                    return tracker._id != req.params.track_id
                })
                user.save();
                return res.send(track._id);
            }
        })
    })

})


module.exports = router