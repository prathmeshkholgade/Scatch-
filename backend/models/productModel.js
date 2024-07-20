const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productShema = Schema({
  picture: {
    url: String,
    fileName: String,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  disCount: {
    type: Number,
    default: 0,
  },
  bgColor: {
    type: String,
    required: true,
  },
  panelColor: {
    type: String,
    required: true,
  },
  textColor: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("product", productShema);
