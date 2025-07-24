import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/userStore";
import AdminPage from "./pages/AdminPage";
import LoadingSpinner from "./components/LodingSpinner";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccess from "./pages/PurchaseSuccess";

const App = () => {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItem } = useCartStore();
  console.log("Current user:", user);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  useEffect(() => {
    getCartItem();
  }, [getCartItem]);
  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/cart"
          element={user ? <CartPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/purchase-success"
          element={user ? <PurchaseSuccess /> : <Navigate to="/login" />}
        />
        <Route
          path="/secret-dashboard"
          element={
            user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />
          }
        />
        <Route path="/category/:category" element={<CategoryPage />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
