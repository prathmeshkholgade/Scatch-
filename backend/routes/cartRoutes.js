const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const userModel = require("../models/userModel");
const wrapAsync = require("../utils/wrapAsync");
const { addToCart, showCart } = require("../controllers/cartController");
const router = express.Router();

router.get("/addtocart/:id", isLoggedIn, wrapAsync(addToCart));
router.get("/cart", isLoggedIn, showCart);

module.exports = router;
