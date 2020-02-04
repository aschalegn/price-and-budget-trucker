const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cookieParser = require("cookie-parser");
const incomeRoute = require("./routes/income");
const outcomeRoute = require("./routes/outcome");
const userRoute = require("./routes/user");
const trackerRoute = require("./routes/tracker");
const path = require('path');
require("dotenv").config();
app.use(express.json());
let publicdir = path.join(__dirname, '', 'public');
app.use(express.static(publicdir));

//routes/middelewares
app.use(cookieParser());
app.use("/income", incomeRoute);
app.use("/outcome", outcomeRoute);
app.use("/tracker", trackerRoute);
app.use("/user", userRoute);

app.get("*", (req, res) => {
  res.status(404).send("unknown routing");
});

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(con => console.log("connected to the DB"))
  .catch(err => console.log("Problem to connect to the DB"));

app.listen(process.env.PORT, () => {
  console.log(`server is listening on port : ${process.env.PORT}`);
});
