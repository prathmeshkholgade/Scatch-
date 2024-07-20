const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("dotenv").config();
console.log(process.env);

const userSchema = Schema({
  fullName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  orders: {
    type: Array,
    default: [],
  },
  contact: {
    type: Number,
  },
  picture: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
