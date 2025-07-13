const express = require("express");
const { protectRoute } = require("../middleware/auth");
const {
  getCoupon,
  validateCoupon,
} = require("../controllers/coupon.controller.js");
const router = express.Router();

router.get("/", protectRoute, getCoupon);
router.get("/validate", validateCoupon);

module.exports =  router ;
