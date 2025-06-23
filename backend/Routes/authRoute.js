const express = require("express");
const {
  signup,
  login,
  logout,
  refreshToken,
  getProfile,
} = require("../controllers/auth.controller.js");
const { protectRoute } = require("../middleware/auth.js");
const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/refreshToken", refreshToken);

router.get("/profile",protectRoute,getProfile);

module.exports = router;
