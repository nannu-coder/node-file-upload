const Product = require("../models/ProductModel");
const { StatusCodes } = require("http-status-codes");

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);

  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  res.send("get all products");
};

module.exports = {
  createProduct,
  getAllProducts,
};
