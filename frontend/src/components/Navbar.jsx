import React from "react";
import { Lock, ShoppingCart, LogIn, LogOut, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
const Navbar = () => {
  const {user,logout} = useUserStore();
  const isAdmin = user?.role === 'admin';

  return (
    <header className="h-16 border-b-2 shadow-sm px-4">
      <div className="flex justify-between items-center h-full">
        <Link to="/" className="text-2xl text-indigo-500 font-bold">
          ShopKart
        </Link>

        <nav className="flex items-center gap-6">
          <Link to="/" className="hover:underline text-indigo-600">
            Home
          </Link>

          {user && (
            <Link
              to="/cart"
              className="flex items-center gap-1 hover:underline text-indigo-600"
            >
              <ShoppingCart size={20} />
              <span>Cart</span>
            </Link>
          )}

          {user && isAdmin && (
            <Link
              to="/dashboard"
              className="flex items-center gap-1 hover:underline text-indigo-600"
            >
              <Lock size={20} />
              <span>Dashboard</span>
            </Link>
          )}

          {user ? (
            <button className="flex items-center gap-1 rounded-md bg-indigo-600 text-white px-3 py-1 hover:bg-indigo-100  hover:text-indigo-600 transition" onClick={logout}>
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          ) : (
            <>
              <Link
                to="/signup"
                className="flex items-center gap-1 rounded-md bg-indigo-600 text-white px-3 py-1 hover:bg-indigo-100  hover:text-indigo-600 transition"
              >
                <UserPlus size={20} />
                <span>Sign Up</span>
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-1 rounded-md bg-indigo-600 text-white px-3 py-1 hover:bg-indigo-100 hover:text-indigo-600  transition"
              >
                <LogIn size={20} />
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
