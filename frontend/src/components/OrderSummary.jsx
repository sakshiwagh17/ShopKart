import React from 'react'
import { motion } from "framer-motion";
import { useCartStore } from '../stores/useCartStore'
import { Link } from "react-router-dom";
import { MoveRight } from 'lucide-react';
import {loadStripe} from '@stripe/stripe-js';
import axios from '../lib/axios';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const OrderSummary = () => {
    const { total, subtotal ,cart,coupon} = useCartStore();
    const savings = subtotal - total;

    const formattedTotal = total.toFixed(2);
    const formattedSubtotal = subtotal.toFixed(2);
    const formattedSavings = savings.toFixed(2);

    const handlePayment=async (req,res) => {
        const stripe=await stripePromise;
        const response=await axios.post("/payment/create-checkout-session",{
            products:cart,
            coupon:coupon?coupon.code:null
        });
        const session=response.data;
        const result=await stripe.redirectToCheckout({
            sessionId:session.id
        })
        if(result.error){
            console.log("Error",result.error);
        }
    }
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

            <button className='w-full mt-6 bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg transition' onClick={handlePayment}>
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
