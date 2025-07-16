import React from 'react'
import { motion } from "framer-motion";
import { useCartStore } from '../stores/useCartStore'
import { Link } from "react-router-dom";
import { MoveRight } from 'lucide-react';

const OrderSummary = () => {
    const { total, subtotal } = useCartStore();
    const savings = subtotal - total;

    const formattedTotal = total.toFixed(2);
    const formattedSubtotal = subtotal.toFixed(2);
    const formattedSavings = savings.toFixed(2);

    return (
        <motion.div
            className="shadow-xl rounded-2xl p-8 bg-white max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <p className='text-indigo-500 text-xl font-semibold mb-4'>Order Summary</p>
            <ul className='space-y-4'>
                <li className='flex justify-between'>
                    <span>Original Price</span>
                    <span>₹{formattedSubtotal}</span>
                </li>
                <li className='flex justify-between'>
                    <span>Total Price</span>
                    <span>₹{formattedTotal}</span>
                </li>
                <li className='flex justify-between'>
                    <span>You Saved</span>
                    <span>₹{formattedSavings}</span>
                </li>
            </ul>

            <button className='w-full mt-6 bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg transition'>
                Proceed to Checkout
            </button>

            <div className='flex items-center justify-center mt-4 text-indigo-600 font-medium'>
                <Link to="/" className="flex items-center gap-1 hover:underline">
                    <span>Continue Shopping</span>
                    <MoveRight size={18} />
                </Link>
            </div>
        </motion.div>
    )
}

export default OrderSummary;
