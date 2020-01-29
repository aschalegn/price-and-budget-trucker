const router = require("express").Router();
const Tracker = require("../models/tracker");
router.get("/", (req, res) => {
    res.send("this is the get route")
});

router.post("/", (req, res) => {
    Tracker.create(req.body, (err, doc) => {
        res.status(201).send(req.body);
    });
});

router.patch("/:id", (req, res) => {

})

router.delete("/:id", (req, res) => {

})


module.exports = router