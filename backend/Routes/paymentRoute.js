const express = require("express");
const { createcheckoutsession } = require("../controllers/payment.controller");

const router = express.Router();

router.get("/create-checkout-session", createcheckoutsession);

module.exports = router;
