const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const productModel = require("../models/productModel");
const wrapAsync = require("../utils/wrapAsync");
const multer = require("multer");
const { storage } = require("../config/cloudConfig");
const { createProduct } = require("../controllers/productController");
const userModel = require("../models/userModel");
const e = require("express");
const upload = multer({ storage });

router.get("/", async (req, res) => {
  const result = await productModel.find({});
  res.status(200).json({ products: result });
});
router.post("/create", upload.single("picture"), wrapAsync(createProduct));

router.get("/addtocart/:id", isLoggedIn, async (req, res) => {
  console.log(req.user);
  const user = await userModel.findOne({ email: req.user?.email });
  console.log(user);
  user.cart.push(req.params.id);
  const cart = await user.save();
  res.json({ product: cart });
});
module.exports = router;
