const express = require("express");
const { createcheckoutsession, checkoutSuccess } = require("../controllers/payment.controller.js");
const { protectRoute } = require("../middleware/auth.js");

const router = express.Router();

router.post("/create-checkout-session", protectRoute ,createcheckoutsession);
router.post("/checkout-success",protectRoute,checkoutSuccess)

module.exports = router;
