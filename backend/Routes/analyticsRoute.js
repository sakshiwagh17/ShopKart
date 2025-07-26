const express = require("express");
const { protectRoute, adminRoute } = require("../middleware/auth.js");
const getAnalyticsData = require("../controllers/analytics.controller.js");
const router = express.Router();

router.get("/", protectRoute, adminRoute, async (req, res) => {
  try {
    const analyticsData = await getAnalyticsData();
    res.json({ analyticsData });
  } catch (err) {
    console.error("Analytics route error:", err);
    res.status(500).json({ error: "Failed to get analytics" });
  }
});
module.exports = router;
