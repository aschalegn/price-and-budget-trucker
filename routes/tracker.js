const router = require("express").Router();
const Tracker = require("../models/tracker");
const trackerPlatform = require('../controllers/trackerPlatform')

router.get("/", (req, res) => {
    res.send("this is the get route")
});

router.post("/", (req, res) => {
    trackerPlatform.getPlatform(tracker);
    let newTracker = new Tracker({
        title: req.body.title,
        url: req.body.url,
        currentPrice: req.body.currentPrice,
        desiredPrice: req.body.desiredPrice,
        user: req.body._id,
    })
    newTracker.save();
    if (newTracker) {
        res.send(newTracker)
    } else {
        res.send("not added")
    }



});

router.patch("/:id", (req, res) => {

})

router.patch("/:id/buy", (req, res) => {

})

router.delete("/:id", (req, res) => {

})


module.exports = router