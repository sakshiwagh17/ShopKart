import React from "react";
import { Lock, ShoppingCart, LogIn, LogOut, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();
  return (
    <header className="h-16 shadow-md bg-white border-b sticky top-0 z-50 px-4">
      <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600 tracking-tight"
        >
          ShopKart
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6 text-sm sm:text-base">
          <Link
            to="/"
            className="text-gray-700 hover:text-indigo-600 transition font-medium"
          >
            Home
          </Link>

          {user && (
            <Link
              to={"/cart"}
              className="relative group  hover:text-indigo-400 transition duration-300 
							ease-in-out"
            >
              <ShoppingCart
                className="inline-block mr-1 group-hover:text-indigo-400"
                size={20}
              />
              <span className="hidden sm:inline">Cart</span>
              {cart.length > 0 && (
                <span
                  className="absolute -top-2 -left-2 bg-indigo-500 text-white rounded-full px-2 py-0.5 
									text-xs group-hover:bg-indigo-400 transition duration-300 ease-in-out"
                >
                  {cart.length}
                </span>
              )}
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
