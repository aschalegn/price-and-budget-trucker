const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
    fullName: { required: true, type: String },
    email: { required: true, type: String },
    password: { required: true, type: String },
    isAuth: { type: Boolean, default: false },
});

module.exports.User = mongoose.model("User", userScheme);