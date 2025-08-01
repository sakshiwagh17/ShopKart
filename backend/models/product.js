const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    category: {
      type: String,
      required: true,
    },
    isfeatured: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productsSchema);
module.exports = Product;
