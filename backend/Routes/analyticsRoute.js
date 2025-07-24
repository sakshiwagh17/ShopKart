const express=require('express');
const { protectRoute, adminRoute } = require('../middleware/auth.js');
const getAnalyticsData = require('../controllers/analytics.controller.js');
const router=express.Router();

router.get('/',protectRoute,adminRoute,getAnalyticsData)
module.exports=router;