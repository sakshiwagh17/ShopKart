import { Loader, Lock, LogIn, Mail } from "lucide-react";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/userStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const { login, loading } = useUserStore();
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    login({ email, password });
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6 text-indigo-500">Log In</h1>

      <div className="w-80  p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <ul className="space-y-4">
            <li>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-600">
                  <Mail size={18} />
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-indigo-600 rounded-md focus:outline-none"
                />
              </div>
            </li>

            <li>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-600">
                  <Lock size={18} />
                </span>
                <input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                  placeholder="Enter Password"
                  className="w-full pl-10 pr-3 py-2 text-indigo-600 rounded-md focus:outline-none"
                />
              </div>
            </li>
          </ul>

          <button
            type="submit"
            className="w-full flex justify-center gap-2 items-center bg-indigo-500 text-white font-semibold px-3 py-2 rounded-md hover:bg-indigo-400 transition"
          >
            {loading ? (
              <>
                <Loader className="animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <LogIn size={20} aria-hidden="true" />
                <span>LogIn</span>
              </>
            )}
          </button>
        </form>

        <p className="mt-4 text-sm text-center ">
          Not Registered yet?{" "}
          <Link
            to="/signup"
            className="underline  text-indigo-600 hover:text-indigo-600"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
