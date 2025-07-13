import React, { use } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import EmptyCard from "../components/EmptyCard";
import CartItem from "../components/CartItem";

const CartPage = () => {
  const { cart } = useCartStore();
   console.log("Cart",cart)
  return (
    <div className="py-8 md:py-16">
      <div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
        <div className='mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8'>
      <motion.div
        className="shadow-xl rounded-2xl p-8 bg-white max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {cart.length === 0 ? (
          <EmptyCard />
        ) : (
          <div className="space-y-6">
            {
              cart.map((item)=>(
                <CartItem key={item._id} item={item} />
              ))
            }
            
          </div>
        )}
      </motion.div>
      </div>
      </div>
    </div>
  );
};

export default CartPage;
