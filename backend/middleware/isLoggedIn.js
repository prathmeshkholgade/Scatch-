const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports = async function (req, res, next) {
  // console.log(req.cookies);
  if (!req.cookies.token) {
    return res.send("logged in frist");
  }
  try {
    let decode = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await userModel
      .findOne({ email: decode.email })
      .select("-password");
    console.log(user);
    req.user = user;
    next();
  } catch (err) {
    res.send("something went wrong");
  }
};
