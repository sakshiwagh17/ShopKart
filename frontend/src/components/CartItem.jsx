import React from "react";
import { Plus, Minus, LucideTrash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
  const { updateQuantity, removeProductFromCart } = useCartStore();

  return (
    <div className="rounded-xl border border-indigo-700 p-4 shadow-md md:p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Product Image */}
        <img
          src={item.image}
          alt={item.name}
          className="h-32 w-32 rounded object-cover"
        />

        {/* Item Info */}
        <div className="flex flex-col gap-2 flex-1">
          <p className="text-lg font-semibold text-gray-800">{item.name}</p>
          <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
          <p className="text-sm font-medium text-indigo-700">
            Subtotal: ₹{item.price * item.quantity}
          </p>
          <button
            className="mt-1 text-red-500 hover:text-red-700 w-fit"
            onClick={() => removeProductFromCart(item._id)}
            title="Remove item"
          >
            <LucideTrash size={18} />
          </button>
        </div>

        {/* Quantity Controls */}
        <div className="mt-4 md:mt-0">
          <p className="mb-2 font-medium">Choose Quantity:</p>
          <div className="flex items-center gap-3">
            <button
              className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition"
              onClick={() => {
                if (item.quantity > 1) updateQuantity(item._id, item.quantity - 1);
              }}
            >
              <Minus size={16} />
            </button>
            <span className="text-lg font-medium w-6 text-center">{item.quantity}</span>
            <button
              className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition"
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
