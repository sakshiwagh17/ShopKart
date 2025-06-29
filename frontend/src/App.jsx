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

const App = () => {
  const { user, checkAuth,checkingAuth } = useUserStore();
console.log("Current user:", user);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route
						path='/secret-dashboard'
						element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />}
					/>
          <Route path='/category/:category' element={<CategoryPage />} />
      </Routes>
      

      <Toaster />
    </div>
  );
};

export default App;
