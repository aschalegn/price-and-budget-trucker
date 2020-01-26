const router = require("express").Router();

router.get("/", (req, res) => { 
    res.send("this is the get route")
});


module.exports = router