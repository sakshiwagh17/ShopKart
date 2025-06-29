import { ShoppingCart } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { useUserStore } from "../stores/userStore";

const ProductItem = ({ product }) => {
    const {user}=useUserStore();
  const handleAddToCart = () => {
    if(!user){
        toast.error('Please login to add product to cart')
    }else{
        
    }
  };

  return (
    <div className="p-4">
      <div className="w-full max-w-sm mx-auto bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-[1.02]">
        
        {/* Product Image */}
        <div className="relative h-60 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Product Content */}
        <div className="px-5 py-4 flex items-center flex-col justify-between min-h-[180px]">
          <h3 className="text-xl font-semibold text-gray-800 ">{product.name}</h3>
          
          <p className="text-lg font-bold text-indigo-600">${product.price}</p>

          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded-xl transition duration-300"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
