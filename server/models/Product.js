const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Enter the product name",
    },
    price: {
      type: Number,
      required: "Enter the list price of product",
    },
    quantity: {
      type: Number,
      required: "Enter number of quantity in stock",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product, ProductSchema };
