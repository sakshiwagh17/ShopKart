import React from "react";
import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import EmptyCard from "../components/EmptyCard";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import GiftCoupon from "../components/GiftCoupon";

const CartPage = () => {
  const { cart } = useCartStore();
  console.log("Cart", cart);

  return (
    <div className="py-8 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">

          {/* Cart Items Section */}
          <motion.div
            className="flex-1 bg-white rounded-2xl shadow-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {cart.length === 0 ? (
              <EmptyCard />
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
            )}
          </motion.div>

         {/* summary and coupon */}
          {cart.length > 0 && (
            <motion.div
              className="lg:w-1/3 w-full mt-6 lg:mt-0 space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <OrderSummary />
              <GiftCoupon />
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CartPage;
