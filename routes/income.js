const router = require("express").Router();
const Income = require("../models/income");
const User = require("../models/user");
const auth = require("../controllers/user")

router.post("/", (req, res) => {
    if (!auth.isLogedIn(req)) {
        res.status(401).send("unautorized");
    }
    try {
        User.findById(req.body._id, (err, user) => {
            if (err) {
                console.log("Error", err);
                res.send("there is an error")
                return
            }
            let newIncome = new Income({
                description: req.body.description,
                amount: req.body.amount,
            });
            newIncome.save();
            if (newIncome) {
                user.incomes.push(newIncome);
                user.save();
                res.status(201).send(newIncome);
                return
            }
            res.status(404).send("problem");
        });
    }
    catch (error) {
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