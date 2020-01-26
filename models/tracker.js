const mongoose = require("mongoose");

const trackerScheme = new mongoose.Schema({
    url: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    desiredPrice: { type: Number, required: true },
});

module.exports.Tracker = mongoose.model("Tracker", trackerScheme);