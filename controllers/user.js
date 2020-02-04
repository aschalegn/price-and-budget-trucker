const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//!Add e-mail functionality

const tokenSecret = "@@wise**Aschaley/*economy";

module.exports.createUser = (req, res) => {
    //add the user to the db
    try {
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
            })

    } catch (error) {
        console.log(error);
    }
    //send E-mail to validate user

}

module.exports.logInUser = (req, res) => {
    User.findOne({ email: req.body.email }).select("_id password fullName trackers")
        .exec((err, user) => {
            bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
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
                        User.findById(user._id).populate("trackers").exec((err, user) => {

                            if (err) {
                                console.log("Error:***", err);
                                return
                            }
                            else {
                                res.status(200).send(user);
                            }
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

module.exports.logOutUser = (req, res) => {

}

module.exports.deleteUser = (req, res) => {

}

module.exports.updateUser = (req, res) => {

}