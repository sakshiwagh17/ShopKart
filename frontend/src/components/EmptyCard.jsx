import { ShoppingCart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const EmptyCard = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center space-y-4 py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ShoppingCart className="font-semibold h-24 w-24 text-center text-indigo-300" />
      <h3 className="font-semibold text-2xl text-indigo-500">
        Your cart is Empty
      </h3>
      <p className="text-gray-400">
        Look like you haven't added anything to your Cart
      </p>
      <Link
        to="/"
        className="rounded-lg bg-indigo-500 text-md text-white p-2 hover:bg-indigo-700"
      >
        Start Shoping
      </Link>
    </motion.div>
  );
};

export default EmptyCard;
