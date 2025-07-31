import React, { useState, useEffect } from "react";
import { User, Mail, Lock, UserPlus, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";

const SignUpPage = () => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { signup, loading, user } = useUserStore(); // include user from store

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
    // redirection will be handled in useEffect
  };

  useEffect(() => {
    if (user) {
      navigate("/"); // redirect on signup success
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6 text-indigo-500">
        Create Your Account
      </h1>

      <div className="w-80 p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <ul className="space-y-4">
            {/* Name Field */}
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

            {/* Email Field */}
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

            {/* Password Field */}
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

            {/* Confirm Password Field */}
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

          {/* Submit Button */}
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

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="underline text-indigo-600 hover:text-indigo-600"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
