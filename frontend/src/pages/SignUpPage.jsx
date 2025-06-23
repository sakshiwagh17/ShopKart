import React, { useState } from "react";
import { User, Mail, Lock, UserPlus, Loader, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/userStore";

const SignUpPage = () => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { signup, loading } = useUserStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    signup(formData);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6 text-indigo-500">
        Create Your Account
      </h1>

      <div className="w-80  p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <ul className="space-y-4">
            <li>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-600">
                  <User size={18} />
                </span>
                <input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setformData({ ...formData, name: e.target.value })
                  }
                  type="text"
                  required
                  placeholder="Enter Name"
                  className="w-full pl-10 pr-3 py-2 text-indigo-600 rounded-md focus:outline-none"
                />
              </div>
            </li>

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
                  value={formData.email}
                  onChange={(e) =>
                    setformData({ ...formData, email: e.target.value })
                  }
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
                  value={formData.password}
                  onChange={(e) =>
                    setformData({ ...formData, password: e.target.value })
                  }
                  required
                  type="password"
                  placeholder="Enter Password"
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
                  id="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  type="password"
                  placeholder="Confirm password"
                  onChange={(e) =>
                    setformData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
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
                <UserPlus size={20} aria-hidden="true" />
                <span>Sign Up</span>
              </>
            )}
          </button>
        </form>

        <p className="mt-4 text-sm text-center ">
          Already have an account?{" "}
          <Link
            to="/login"
            className="underline  text-indigo-600 hover:text-indigo-600"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;