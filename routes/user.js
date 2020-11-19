const router = require("express").Router();
const controller = require("../controllers/user");

router.post("/signin", (req, res) => {
    try {
        controller.createUser(req, res);
    } catch (error) {

    }
});

router.get("/login", (req, res) => {
    try {
        controller.logInUser(req, res);
    } catch (error) {
        res.status(404).send("there is a problem")
    }
});

router.patch("/:id", (req, res) => {
    try {

    } catch (error) {

    }
});


router.delete("/:id", (req, res) => {
    try {

    } catch (error) {

    }
});

module.exports = router;