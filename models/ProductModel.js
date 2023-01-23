const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
      minLength: 3,
    },

    price: {
      type: Number,
      required: [true, "Please enter a price"],
    },
    image: {
      type: String,
      required: [true, "please insert an image"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
