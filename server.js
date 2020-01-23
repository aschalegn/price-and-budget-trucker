const express = require("express");
const app = express();
const incomeRoute = require("./routes/income");
const outcomemeRoute = require("./routes/outcome");
const userRoute = require("./routes/user");
const path = require('path');
require("dotenv").config();
app.use(express.json());
let publicdir = path.join(__dirname, '', 'public');
app.use(express.static(publicdir));

//route/middelewares
app.use("/income", incomeRoute);
app.use("/outcome", outcomemeRoute);
app.use("/user", userRoute);

//! Get logs Data
app.get('/history', (req, res) => {
  actionModule.getServerLogs(res);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/404.html"));
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`server is listening on port : ${PORT}`);
});
