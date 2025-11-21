import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard({ user }) {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 font-sans">
      
      {/* Welcome Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 tracking-wide">
        Welcome, {user?.name || 'User'} 👋
      </h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition">
          <h3 className="text-xl font-semibold text-gray-800">Profile</h3>
          <p className="text-gray-600 text-sm mt-2">
            View and update your profile.
          </p>
          <Link
            to="/profile"
            className="text-indigo-600 font-medium text-sm mt-4 inline-block hover:underline"
          >
            Open profile →
          </Link>
        </div>

        {/* Tasks Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition">
          <h3 className="text-xl font-semibold text-gray-800">Tasks</h3>
          <p className="text-gray-600 text-sm mt-2">
            Create, update and manage tasks.
          </p>
          <Link
            to="/tasks"
            className="text-indigo-600 font-medium text-sm mt-4 inline-block hover:underline"
          >
            Manage tasks →
          </Link>
        </div>

      </div>
    </div>
  );
}
