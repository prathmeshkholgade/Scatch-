const productModel = require("../models/productModel");

module.exports.createProduct = async (req, res) => {
  const url = req.file.path;
  const fileName = req.file.filename;
  const Product = new productModel(req.body);
  Product.picture = { url, fileName };
  const result = await Product.save();
  console.log(result);
  res.status(200).json({ product: result });
};
