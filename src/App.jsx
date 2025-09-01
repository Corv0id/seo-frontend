import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile'
import Audits from './components/Audits';
import CreateAudit from './components/CreateAudit';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const sync = () => setToken(localStorage.getItem('token'));
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const loggedIn = Boolean(token);

  return (
    <>
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header loggedIn={loggedIn} />
      <div className="flex flex-1 mt-4">
        {loggedIn && <Sidebar />}
        <main className={`flex-1 p-6 overflow-auto ${!loggedIn ? 'ml-0' : ''}`}>
          <Routes>
            {/* always available */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* protected routes */}
            {loggedIn ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/audits" element={<Audits />} />
                <Route path="/create-audit" element={<CreateAudit />} />
                <Route path="/profile" element={<Profile />} />
              </>
            ) : (
              <Route path="/*" element={<Login />} />
            )}
          </Routes>
        </main>
      </div>
    </div>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;