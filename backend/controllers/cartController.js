const userModel = require("../models/userModel");

module.exports.addToCart = async (req, res) => {
  console.log(req.user);
  const user = await userModel.findOne({ email: req.user?.email });
  console.log(user);
  user.cart.push(req.params.id);
  const cart = await user.save();
  res.json({ product: cart });
};

module.exports.showCart = async (req, res) => {
  const userId = req.user._id;
  const user = await userModel.findById(userId).populate("cart");
  console.log(user);
  console.log("pupulate data");
  res.status(200).json({ cart: user.cart });
};
