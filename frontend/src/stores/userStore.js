import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });
    if (password != confirmPassword) {
      set({ loading: false });
      return toast.error("Password do not match");
    }
    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      set({ user: res.data.user, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "An Error Occured,Try again");
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", { email, password });
      set({ user: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "An error Occured,Try again ");
    }
  },
  logout:async () => {
    try {
      await axios.post("/auth/logout")
      set({user:null});
      
    } catch (error) {
      toast.error(error.response?.data?.message||"Error ocurring during Logout")
      
    }
    
  },
  checkAuth: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/auth/profile");
      set({ user: res.data, checkingAuth: false });
      console.log("Authenticated user:", res.data);

    } catch (error) {
      console.log(error.message);
      set({ checkingAuth: false, user: null });
    }
  },
}));
