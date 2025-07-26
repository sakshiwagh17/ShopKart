import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import toast from "react-hot-toast";

const GiftCoupon = () => {
  const [inputCoupon, setInputCoupon] = useState("");
  const [hasEdited, setHasEdited] = useState(false);

  const {
    isCouponApplied,
    coupon,
    getMyCoupon,
    applyCoupon,
    removeCoupon,
  } = useCartStore();

  useEffect(() => {
    getMyCoupon();
  }, [getMyCoupon]);

  useEffect(() => {
    console.log(coupon)
    if (!hasEdited && coupon?.code) {
      setInputCoupon(coupon.code);
    }
  }, [coupon, hasEdited]);

  const handleInputChange = (e) => {
    setInputCoupon(e.target.value);
    setHasEdited(true);
  };

  const handleApplyCoupon = async () => {
    if (!inputCoupon.trim()) {
      toast.error("Please enter a valid coupon code");
      return;
    }
    await applyCoupon(inputCoupon);
    setHasEdited(false);
  };

  const handleRemoveCoupon = async () => {
    await removeCoupon();
    setInputCoupon("");
    setHasEdited(false);
  };

  return (
    <motion.div
      className="flex-1 bg-white rounded-2xl shadow-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div>
        <label className="text-sm text-gray-700">
          Do you have a voucher or gift card?
        </label>
        <input
          type="text"
          className="border-2 mt-3 p-2 w-full rounded-md border-indigo-400 focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter code here"
          value={inputCoupon}
          onChange={handleInputChange}
        />
      </div>

      <button
        onClick={handleApplyCoupon}
        className="w-full mt-6 bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg transition"
      >
        Apply Coupon
      </button>

      {isCouponApplied && coupon && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-700">Applied Coupon</h3>
          <p className="mt-2 text-sm text-gray-600">
            {coupon.code} - {coupon.discountPercentage}% off
          </p>

          <motion.button
            type="button"
            className="mt-2 flex w-full items-center justify-center rounded-lg bg-red-600 
            px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none
            focus:ring-4 focus:ring-red-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRemoveCoupon}
          >
            Remove Coupon
          </motion.button>
        </div>
      )}

      <p className="mt-3 text-gray-600">Your Available Coupon</p>
    </motion.div>
  );
};

export default GiftCoupon;
