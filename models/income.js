const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
    description: { type: String, required: true },
    amount: { type: Number, required: true },
});

let Income = mongoose.model("Income", incomeSchema);
module.exports = Income;