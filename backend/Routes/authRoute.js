const express = require("express");
const {
  signup,
  login,
  logout,
  refreshToken,
} = require("../controllers/auth.controller.js");
const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/refreshToken", refreshToken);

module.exports = router;
