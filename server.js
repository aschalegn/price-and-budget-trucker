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
let publicdir = path.join(__dirname, '', 'client/build');
app.use(express.static(publicdir));

//routes
app.use(cookieParser());
app.use("/api/income", incomeRoute);
app.use("/api/outcome", outcomeRoute);
app.use("/api/tracker", trackerRoute);
app.use("/api/user", userRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(con => console.log("connected to the DB"))
  .catch(err => console.log("Problem to connect to the DB"));
const PORT = process.env.PORT | 2000;

app.listen(PORT, () => {
  console.log(`server is listening on port : ${process.env.PORT}`);
});
