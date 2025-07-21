const express = require("express");
const { createcheckoutsession, checkoutSuccess } = require("../controllers/payment.controller");
const { protectRoute } = require("../middleware/auth");

const router = express.Router();

router.post("/create-checkout-session", protectRoute ,createcheckoutsession);
router.post("/checkout-success",protectRoute,checkoutSuccess)

module.exports = router;
