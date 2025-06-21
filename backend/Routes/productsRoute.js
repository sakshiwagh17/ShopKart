const express = require("express");
const { protectRoute, adminRoute } = require("../middleware/auth.js");
const {
  getAllProduct,
  getfeaturedProducts,
  createProducts,
  deleteProduct,
  getrecommendedProducts,
  getProductByCategory,
  toggleFeature,
} = require("../controllers/product.controller.js");

const router = express.Router();
router.get("/", protectRoute, adminRoute, getAllProduct);
router.get("/featured", getfeaturedProducts);
router.get("/recommended", getrecommendedProducts);
router.get("/category/:category", getProductByCategory);
router.patch("/toggle", toggleFeature);
router.post("/", protectRoute, adminRoute, createProducts);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);
module.exports = router;
