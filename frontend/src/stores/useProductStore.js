import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/products", productData);
      set((state) => ({
        products: [...state.products, res.data],
        loading: false,
      }));
      toast.success("Product created successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create product");
      set({ loading: false });
    }
  },
  fetchAllProduct: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/products");
      set({ products: res.data.products, loading: false });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create product");
      set({ loading: false });
    }
  },
  getProductByCategory:async (category) => {
    set({loading:true});
    try {
      const res=await axios.get(`/products/category/${category}`);
      set({products:res.data.products,loading:false})
      
    } catch (error) {
       toast.error(error?.response?.data?.message || "failed to fetch products");
      set({ loading: false });
    }
    
  },
  deleteProduct:async () => {
    
  },
  toggleFeaturedProduct:async () => {
    
  }
}));
