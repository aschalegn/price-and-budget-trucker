const router = require("express").Router();
const Income = require("../models/income");

router.post("/", (req, res) => {

    try {
        Income.create(req.body)
            .then(income => res.status(201).send(income))
            .catch(err => res.send("problem"))

    } catch (error) {
        console.log("*Error:* ", error);
    }
});

router.get("/", (req, res) => {
    try {
        Income.find()
            .then(incomes => { res.send(incomes) })
            .catch(err => console.log("Error:* ", err));
    } catch (error) {
        console.log("Error:** ", error);
    }
});

router.patch("/:id", (req, res) => {
    try {
        const body = req.body;
        const recordId = req.params.id;
        res.send("patch route works");
    } catch (error) {
        console.log("Error:**  ", error);
        res.send("Problem with the request");
    }
});

router.delete("/:id", (req, res) => {
    try {
        Income.findByIdAndDelete(req.params.id, (err, doc) => {
            if (err) { console.log("Error:** ", err) }
            doc ? res.status(202).send(doc._id)
                : res.send("not found");

        });
    } catch (error) {
        console.log("*Error:* ", error);
    }
});


module.exports = router;