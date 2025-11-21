import React from "react";
import { useForm } from "react-hook-form";
import { register as registerUser } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Register({ setUser }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const nav = useNavigate();

  const onSubmit = (data) => {
    registerUser(data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        nav("/login");
      })
      .catch((err) => {
        alert(err.response?.data?.error || "Registration failed");
      });
  };

  return (
    <div className="min-h-screen flex overflow-hidden">

      {/* Left Section */}
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-indigo-600 to-blue-500 text-white flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-extrabold mb-4 tracking-wide">
          Welcome to NovaBridge
        </h1>
        <p className="text-lg text-center opacity-90 max-w-sm">
          Create your account and start your journey with us 🚀
        </p>
      </div>

      {/* Right Section: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Name */}
            <div>
              <input
                {...register("name", { required: true })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Full Name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">Name is required</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                {...register("email", { required: true })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Email Address"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Password (min 6 characters)"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg transition"
            >
              Register
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
