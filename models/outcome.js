const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const outcomeSchema = new Schema({
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    category:String
});

let Outcome = mongoose.model("Outcome", outcomeSchema);
module.exports = Outcome;