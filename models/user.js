const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
    fullName: { required: true, type: String },
    email: { required: true, type: String },
    password: { required: true, type: String },
    isAuth: { type: Boolean, default: false },
    incomes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Income"
        }
    ],

    outcomes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Outcome"
        }
    ],
    trackers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tracker'
        }
    ]
});

const User = mongoose.model("User", userScheme);
module.exports = User; 