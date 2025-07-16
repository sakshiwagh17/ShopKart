import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
const GiftCoupon = () => {
  const [inputCoupn, setInputCoupon] = useState();

  const { isappliedCoupon, coupon } = useCartStore();
  const handleCoupon = async (req, res) => {};
  return (
    <motion.div
      className="flex-1 bg-white rounded-2xl shadow-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div>
        <label>Do you have a voucher or gift card?</label>
        <input
          type="text"
          className="border-2 mt-3 p-1 w-full rounded-md border-indigo-400 focus:border-indigo-500 
            focus:ring-indigo-500"
          placeholder="Enter code here"
          required
          onChange={(e) => setInputCoupon(e.target.value)}
        />
      </div>
      <button
        onClick={handleCoupon}
        className="w-full mt-6 bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg transition"
      >
        Apply Coupon
      </button>
      {isappliedCoupon && coupon && (
        <div className="mt-5">
          <p className="text-lg font-medium text-gray-400">Applied coupon</p>
          <p>{coupon.code}-{coupon.discountpercentag} % off</p>
        </div>
      )}
      <p className="mt-3 text-gray-600">Your Available coupon</p>
    </motion.div>
  );
};

export default GiftCoupon;
