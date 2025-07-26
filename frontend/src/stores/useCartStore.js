import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,
  isCouponApplied: false, //  fixed typo from isappliedCoupon

  // Get applied coupon for current user
  getMyCoupon: async () => {
    try {
      const response = await axios.get("/coupon");
      if (response.data) {
        set({
          coupon: response.data,
          isCouponApplied: true,
        });
      } else {
        set({
          coupon: null,
          isCouponApplied: false,
        });
      }
    } catch (error) {
      console.error("Error fetching coupon:", error);
    }
  },

  // Apply a new coupon
  applyCoupon: async (code) => {
    try {
      const response = await axios.post("/coupon/validate", { code });
      set({ coupon: response.data, isCouponApplied: true });
      get().calculateTotal();
      toast.success("Coupon applied successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply coupon");
    }
  },

  // Remove currently applied coupon
  removeCoupon: () => {
    set({ coupon: null, isCouponApplied: false });
    get().calculateTotal();
    toast.success("Coupon removed");
  },

  // Get cart items
  getCartItem: async () => {
    try {
      const res = await axios.get("/cart");
      set({ cart: res.data });
      get().calculateTotal();
    } catch (error) {
      set({ cart: [] });
      toast.error(error?.response?.data?.message || "An error occurred!");
    }
  },

  // Clear the cart
  clearCart: async () => {
    set({ cart: [], coupon: null, total: 0, subtotal: 0 });
  },

  // Add product to cart
  addProduct: async (product) => {
    try {
      await axios.post("/cart", { productId: product._id });
      toast.success("Product added to cart successfully!");

      set((prevState) => {
        const existingItem = prevState.cart.find(
          (item) => item._id === product._id
        );
        const newCart = existingItem
          ? prevState.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...prevState.cart, { ...product, quantity: 1 }];

        return { cart: newCart };
      });

      get().calculateTotal();
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred!");
    }
  },

  // Calculate subtotal and total
  calculateTotal: () => {
    const { cart, coupon } = get();
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    let total = subtotal;
    if (coupon && coupon.discountPercentage) {
      const discount = subtotal * (coupon.discountPercentage / 100);
      total = subtotal - discount;
    }

    set({ subtotal, total });
  },

  // Update product quantity
  updateQuantity: async (productId, quantity) => {
    try {
      if (quantity <= 0) {
        await get().removeProductFromCart(productId);
        return;
      }

      await axios.put(`/cart/${productId}`, { quantity });

      set((prevState) => ({
        cart: prevState.cart.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        ),
      }));

      get().calculateTotal();
    } catch (error) {
      toast.error("Failed to update quantity.");
    }
  },

  // Remove product from cart
  removeProductFromCart: async (productId) => {
    try {
      await axios.delete("/cart", { data: { productId } });

      set((prevState) => ({
        cart: prevState.cart.filter((item) => item._id !== productId),
      }));

      get().calculateTotal();
    } catch (error) {
      toast.error("Failed to remove product.");
    }
  },
}));
