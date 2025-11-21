import React from "react";
import { useForm } from "react-hook-form";
import { login } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setUser }) {
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();

  const onSubmit = (data) => {
    login(data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        nav("/dashboard");
      })
      .catch((err) => {
        alert(err.response?.data?.error || "Login failed");
      });
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
      
      {/* Left Gradient Section */}
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-indigo-600 to-blue-500 
      items-center justify-center p-10 text-white">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome Back 👋</h1>
          <p className="text-lg opacity-90">
            Login and continue your journey with us!
          </p>
        </div>
      </div>

      {/* Right Form Card */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Login</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register("email", { required: true })}
                type="email"
                className="w-full p-3 border border-gray-300 rounded-xl 
                focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Email Address"
              />
            </div>

            <div>
              <input
                {...register("password", { required: true })}
                type="password"
                className="w-full p-3 border border-gray-300 rounded-xl 
                focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Password"
              />
            </div>

            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg transition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
