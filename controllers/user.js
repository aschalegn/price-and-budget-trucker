const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//!Add e-mail functionality
const tokenSecret = "@@wise**Aschaley/*economy";

module.exports.createUser = async (req, res) => {
    //add the user to the db
    try {
        const user = await User.find({ email: req.body.email });
        if (user.length === 0) {
            User.create(req.body)
                .then(user => {
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) console.log(err);
                        else {
                            bcrypt.hash(user.password, salt, (err, hash) => {
                                if (err) { console.log(err) }
                                else {
                                    user.password = hash;
                                    user.save();
                                    res.status(201).send(user);
                                }
                            });
                        }
                    });
                });
        }
        else {
            console.log("User Already Exist");
            res.status(303).send("user Already exist")
        }

    } catch (error) {
        console.log(error);
    }
    //Todo: send E-mail to validate user

}

module.exports.logInUser = (req, res) => {
    User.findOne({ email: req.params.email }).select("_id password fullName trackers")
        .exec((err, user) => {
            bcrypt.compare(req.params.password, user.password, function (err, isMatch) {
                if (err) {
                    console.log(err);
                    res.status(500).send("there an error");
                    return
                }
                if (isMatch) {
                    jwt.sign({ email: user.email, password: user.password }, tokenSecret, (err, token) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send("there an error");
                            return
                        }
                        res.cookie("wiseeconomy", token, { maxAge: 1254545454 });
                        User.findById(user._id).populate("trackers").populate("incomes").populate("outcomes")
                            .exec((err, user) => {
                                if (err) {
                                    console.log("Error:***", err);
                                    return
                                }
                                user ?
                                    res.status(200).send(user)
                                    : res.send("User Not Found");
                            });
                    });
                }
            });
        });
}

module.exports.isLogedIn = (req) => {
    const token = req.cookies.wiseeconomy;
    let payload;
    if (!token) { return false }
    try {
        payload = jwt.verify(token, tokenSecret);
        if (payload) {
            return true
        }
    } catch (error) {
        console.log("Erro", error);
    }
}

module.exports.deleteUser = (req, res) => {

}

module.exports.updateUser = (req, res) => {

}