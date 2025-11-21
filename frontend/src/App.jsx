<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import TasksPage from './pages/TasksPage';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import { getProfile } from './services/auth';

export default function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));
  const location = useLocation();

  const hideHeaderRoutes = ['/login', '/register'];
  const hideHeader = hideHeaderRoutes.includes(location.pathname);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) {
      getProfile().then(res => {
        setUser(res.data.user);
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }).catch(() => {
        localStorage.removeItem('token');
      });
    }
  }, []);

  return (
    <div className={`min-h-screen ${hideHeader ? '' : 'bg-gray-50'}`}>
      
      {/* Show Header except Login/Register */}
      {!hideHeader && <Header user={user} setUser={setUser} />}

      {/* Auth Pages need full width, dashboard needs padding */}
      <main className={`${hideHeader ? '' : 'container mx-auto p-4'}`}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute user={user}>
              <Dashboard user={user} />
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute user={user}>
              <Profile user={user} setUser={setUser} />
            </ProtectedRoute>
          } />

          <Route path="/tasks" element={
            <ProtectedRoute user={user}>
              <TasksPage />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </div>
  );
}
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
>>>>>>> 30c8d4fbff36ee2a3d76e5f71359bd628af7c3de
