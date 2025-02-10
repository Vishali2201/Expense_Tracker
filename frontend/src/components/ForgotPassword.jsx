// src/pages/ForgotPassword.jsx
import React from 'react';

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-700">
      <div className="w-full max-w-md p-8 space-y-6 bg-white text-black shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-blue-700">Reset Password</h2>
        <p className="text-center text-sm text-gray-600 mb-4">
          Enter your email, and we’ll send you a link to reset your password.
        </p>
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button className="w-full bg-blue-700 text-white p-3 rounded-md font-semibold hover:bg-blue-600 transition duration-300">
          Send Reset Link
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
