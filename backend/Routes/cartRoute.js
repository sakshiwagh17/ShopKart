const express = require("express");
const {
  getCartProduct,
  addProductToCart,
  removeProduct,
  updateQuantity,
} = require("../controllers/cart.controller");
const { protectRoute } = require("../middleware/auth.js");
const router = express.Router();
router.get("/", protectRoute, getCartProduct);
router.post("/", protectRoute, addProductToCart);
router.delete("/", protectRoute, removeProduct);
router.put("/:id", protectRoute, updateQuantity);

module.exports = router;
