const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const outcomeSchema = new Schema({
    description: { type: String, required: true },
    amount: { type: Number, required: true },
});

let Outcome = mongoose.model("Outcome", outcomeSchema);
module.exports = Outcome;