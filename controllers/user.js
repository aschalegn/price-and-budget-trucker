const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//!Add e-mail functionality
const tokenSecret = "@@wise**Aschaley/*economy";

module.exports.createUser = async (req, res) => {
   //add the user to the db
   try {
      const user = await User.find({ email: req.body.email });
      if (user.length === 0) {
         User.create(req.body)
            .then(user => {
               bcrypt.genSalt(10, (err, salt) => {
                  if (err) console.log(err);
                  else {
                     bcrypt.hash(user.password, salt, (err, hash) => {
                        if (err) { console.log(err) }
                        else {
                           user.password = hash;
                           user.save();
                           res.status(201).send({ _id: user._id });
                        }
                     });
                  }
               });
            });
      }
      else {
         res.status(303).send("user Already exist")
      }
   } catch (error) {
      console.log(error);
   }
   //Todo: send E-mail to validate user

}

module.exports.logInUser = (req, res) => {
   const { email, password } = req.query;
   User.findOne({ email: email }).select("_id email password")
      .exec((err, user) => {
         bcrypt.compare(password, user.password, function (err, isMatch) {
            if (err) {
               res.status(500).send("there an error");
               return
            }
            else if (isMatch) {
               jwt.sign({ email: user.email, password: user.password }, tokenSecret, (err, token) => {
                  if (err) {
                     res.status(500).send("there an error");
                     return
                  }

                  User.findById(user._id, { password: 0 }).populate("trackers incomes outcomes")
                     .exec((err, user) => {
                        if (err) {
                           console.log("Error:***", err);
                           return false
                        }
                        else if (user) {
                           res.cookie("wiseeconomy", token, { maxAge: 1254545454 });
                           res.status(200).send(user);
                        }
                        else return res.status(500).send("User Not Found");
                     });
               });
            }
         });
      });
}

module.exports.isLogedIn = (req) => {
   const token = req.cookies.wiseeconomy;
   let payload;
   if (!token) { return false }
   try {
      payload = jwt.verify(token, tokenSecret);
      if (payload) {
         return true
      }
   } catch (error) {
      console.log("Erro", error);
   }
}

module.exports.deleteUser = (req, res) => {

}

module.exports.updateUser = (req, res) => {

}