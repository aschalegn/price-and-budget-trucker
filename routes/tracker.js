const router = require("express").Router();
const Tracker = require("../models/tracker");
const trackerPlatform = require('../controllers/trackerPlatform')

router.get("/", (req, res) => {
    res.send("this is the get route")
});

router.post("/", (req, res) => {
    // let newTracker = new Tracker(req.body)
    // newTracker.user = req.body._id;
    // newTracker.sav()
    Tracker.create(req.body).then(tracker => {
        console.log(tracker);
        
        tracker.user = req.body._id;
        tracker.save();
        // trackerPlatform.getPlatform(tracker);
        res.send(tracker);
    })


});

router.patch("/:id", (req, res) => {

})

router.patch("/:id/buy", (req, res) => {

})

router.delete("/:id", (req, res) => {

})


module.exports = router