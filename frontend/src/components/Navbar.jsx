import React from "react";
import {
  Lock,
  ShoppingCart,
  LogIn,
  LogOut,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/userStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";

  return (
    <header className="h-16 shadow-md bg-white border-b sticky top-0 z-50 px-4">
      <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-tight">
          ShopKart
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6 text-sm sm:text-base">
          <Link to="/" className="text-gray-700 hover:text-indigo-600 transition font-medium">
            Home
          </Link>

          {user && (
            <Link
              to="/cart"
              className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 transition font-medium"
            >
              <ShoppingCart size={20} />
              <span>Cart</span>
            </Link>
          )}

          {user && isAdmin && (
            <Link
              to="/secret-dashboard"
              className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 transition font-medium"
            >
              <Lock size={20} />
              <span>Dashboard</span>
            </Link>
          )}

          {user ? (
            <button
              onClick={logout}
              className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          ) : (
            <>
              <Link
                to="/signup"
                className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                <UserPlus size={18} />
                <span>Sign Up</span>
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-1 px-3 py-1.5 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition"
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
