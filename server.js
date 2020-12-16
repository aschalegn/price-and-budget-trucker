const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cookieParser = require("cookie-parser");
const incomeRoute = require("./routes/income");
const outcomeRoute = require("./routes/outcome");
const userRoute = require("./routes/user");
const trackerRoute = require("./routes/tracker");
const path = require('path');
const { isLogedIn } = require("./controllers/user");
require("dotenv").config();
app.use(express.json());

//routes
app.use(cookieParser());
app.use("/api/user", userRoute);
app.use("/api/income", incomeRoute);
app.use("/api/outcome", outcomeRoute);
app.use("/api/tracker", trackerRoute);
// app.use("/api/setting", userRoute);

let publicdir = path.join(__dirname, 'client', 'build');
app.use(express.static(publicdir));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicdir, 'index.html'));
});

const mongoURL = process.env.DB_URL || "mongodb://localhost:27017/budgetTracker";

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(con => console.log("connected to the DB"))
  .catch(err => console.log("Problem to connect to the DB"));
const PORT = process.env.PORT | 2000;

app.listen(2000, () => {
  console.log(`server is listening on port : ${PORT}`);
});
