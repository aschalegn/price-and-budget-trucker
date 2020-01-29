const mongoose = require("mongoose");

const trackerScheme = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    desiredPrice: { type: Number, required: true },
    isbuyed: { type: Boolean, default: false }
});

Tracker = mongoose.model("Tracker", trackerScheme);
module.exports = Tracker;