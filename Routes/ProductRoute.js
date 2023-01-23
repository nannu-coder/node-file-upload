const router = require("express").Router();
const {
  createProduct,
  getAllProducts,
} = require("../Controllers/ProductController");
const uploadsController = require("../Controllers/uploadsController");

router.route("/").post(createProduct).get(getAllProducts);
router.route("/uploads").post(uploadsController);

module.exports = router;
