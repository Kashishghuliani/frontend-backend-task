import React, { useState } from 'react';
import { updateProfile } from '../services/auth';

export default function Profile({ user, setUser }) {
  const [name, setName] = useState(user?.name || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');

  const save = () => {
    updateProfile({ name, avatarUrl })
      .then((res) => {
        setUser(res.data.user);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        alert('Profile updated');
      })
      .catch((err) =>
        alert(err.response?.data?.error || 'Update failed')
      );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8 border border-gray-100">

        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
          Your Profile
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-gray-700"
            placeholder="Enter your name"
          />
        </div>

        {/* Avatar URL */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
          <input
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-gray-700"
            placeholder="Enter your avatar image link"
          />
        </div>

        {/* Preview Avatar */}
        {avatarUrl && (
          <div className="flex justify-center mb-4">
            <img
              src={avatarUrl}
              alt="Avatar Preview"
              className="w-24 h-24 rounded-full border-2 shadow-md object-cover"
            />
          </div>
        )}

        <button
          onClick={save}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
