import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/auth";

export default function Header({ user, setUser }) {
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    setUser(null);
    nav("/login");
  };

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link
          to={user ? "/dashboard" : "/"}
          className="text-2xl font-bold text-indigo-600 tracking-wide hover:text-indigo-700 transition"
        >
          NovaBridge
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-gray-700 font-medium">
          {user ? (
            <>
              <Link
                to="/tasks"
                className="hover:text-indigo-600 transition-colors"
              >
                Tasks
              </Link>

              <Link
                to="/profile"
                className="hover:text-indigo-600 transition-colors"
              >
                Profile
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 hover:text-indigo-600 transition-colors"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition-all shadow-md"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
