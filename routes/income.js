const router = require("express").Router();
const Income = require("../models/income");

router.post("/", (req, res) => {
    try {
        const body = req.body;
        res.send("POST route works")
    } catch (error) {
        console.log("*Error:* ", error);
    }
});

router.get("/", (req, res) => {
    try {
        Income.find()
            .then(incomes => { res.send(incomes) })
            .catch(err => console.log("Error:* ", err))
    } catch (error) {
        console.log("Error:** ", error);
    }
});

router.patch("/:", (req, res) => {
    try {
        const body = req.body;
        const recordId = req.params.id;
        res.send("patch route works");
    } catch (error) {

    }
});

router.delete("/", (req, res) => {
    try {
        const recordId = req.params.id;
        res.send("DELETE route works");
    } catch (error) {
        console.log("*Error:* ", error)
    }
});


module.exports = router;