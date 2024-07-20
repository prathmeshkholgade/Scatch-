const express = require("express");
const userModel = require("../models/userModel");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const generateToken = require("./utils/generateToken");
const {
  registerUser,
  loginUser,
  logout,
  getuserData,
} = require("../controllers/authController");
const wrapAsync = require("../utils/wrapAsync");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/", (req, res) => {
  res.send("user working");
});

router.post("/register", wrapAsync(registerUser));
router.post("/login", wrapAsync(loginUser));
router.get("/logout", logout);
router.get("/getuser", isLoggedIn, wrapAsync(getuserData));

module.exports = router;
