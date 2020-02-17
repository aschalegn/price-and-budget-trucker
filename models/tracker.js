const mongoose = require("mongoose");

const trackerScheme = new mongoose.Schema({
    title: { type: String },
    url: { type: String, required:true },
    currentPrice: { type: Number },
    desiredPrice: { type: Number },
    isbuyed: { type: Boolean, default: false },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    platform: String,
    price: String,
    image: String
});

let Tracker = mongoose.model("Tracker", trackerScheme);
module.exports = Tracker;