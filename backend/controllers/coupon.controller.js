const Coupon = require("../models/coupon.js");

//to get the active coupon
const getCoupon = async (req, res) => {
  try {
    //its finding if any active coupon assign to the logged user
    const coupon = await Coupon.findOne({
      userId: req.user._id,
      isActive: true,
    });
    //if not null
    res.json(coupon || null);
  } catch (error) {
    console.log("Error in the get Coupon!", error);
    res.json({ message: "Server Error!", error: error.message });
  }
};

//to validate the coupon
const validateCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({
      code: code,
      userId: req.user._id,
      isActive: true,
    });
    if (!coupon) {
      return res.status(500).json({ message: "Coupon not found!" });
    }
    //to expire the coupon
    if (coupon.expirationDate < new Date()) {
      (coupon.isActive = false),
        await coupon.save(),
        res.status(400).json({ message: "Coupon is expired!" });
    }
    res.json({
      message: "Coupon is valid",
      code: coupon.code,
      discountPercentage: coupon.discountpercentage,
    });
  } catch (error) {
    console.log("Error in the validate Coupon");
    res.json({ message: "Server Error", error });
  }
};
module.exports = { getCoupon, validateCoupon };
