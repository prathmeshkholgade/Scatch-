const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");
const userModel = require("../models/userModel");
const ExpressError = require("../utils/ExpressError");

module.exports.registerUser = async (req, res, next) => {
  let { fullName, email, password } = req.body;
  let user = await userModel.findOne({ email: email });
  if (user) return next(new ExpressError(500, "email is already exist"));

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(new ExpressError(500, err));
    bcrypt.hash(password, salt, async function (err, hash) {
      if (err) return next(new ExpressError(500, err));
      else {
        const user = new userModel({ fullName, email, password: hash });
        await user.save();
        const token = generateToken(user);
        const { password, ...userInfo } = user.toObject();
        res.cookie("token", token);
        res.status(200).json({ user: userInfo });
        console.log(user);
      }
    });
  });
};

module.exports.loginUser = async (req, res, next) => {
  let { email, password } = req.body;
  console.log(req.body);
  let user = await userModel.findOne({ email: email });
  if (!user) return next(new ExpressError(500, "email or password incorrect"));
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      const token = generateToken(user);
      res.cookie("token", token);
      const { password, ...userInfo } = user.toObject();
      res.status(200).json({ user: userInfo });
    } else {
      return next(new ExpressError(500, "email or password incorrect"));
    }
  });
};

module.exports.logout = (req, res) => {
  res.cookie("token", "");
  res.send("logged out");
};
module.exports.getuserData = (req, res) => {
  console.log(req.user);
  res.status(200).json({ user: req.user });
};
