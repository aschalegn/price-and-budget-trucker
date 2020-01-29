const router = require("express").Router();
const controller = require("../controllers/user");

router.post("/signin", (req, res) => {
    try {
        controller.createUser(req, res);
    } catch (error) {

    }
});

router.post("/login", (req, res) => {
    try {

    } catch (error) {

    }
});

router.post("/login", (req, res) => {
    try {

    } catch (error) {

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