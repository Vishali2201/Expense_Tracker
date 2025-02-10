import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Handle Register Function
  const handleRegister = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('Registration successful!');
        localStorage.setItem('authToken', data.token);
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        setErrorMessage(data.message || 'Username or Email already exists');
      }
    } catch (error) {
      setErrorMessage('Server error. Please try again later.');
    }
  };

  // Handle Login Function
  const handleLogin = async (e) => {
    e.preventDefault();
  
    const loginData = {
      usernameOrEmail: username || email, 
      password: password,
    };

    setErrorMessage('');
    setSuccessMessage('');
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(data.msg || 'Login failed. Please check your credentials.');
      } else {
        setSuccessMessage('Login successful!');
        localStorage.setItem('authToken', data.token);
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (error) {
      setErrorMessage('Server error. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-700">
      <div className="w-full max-w-md p-8 space-y-6 bg-white text-black shadow-lg rounded-lg">
        <div className="flex justify-around border-b pb-4">
          <button
            onClick={() => setActiveTab('login')}
            className={`text-lg font-semibold ${activeTab === 'login' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500'}`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`text-lg font-semibold ${activeTab === 'register' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500'}`}
          >
            Register
          </button>
        </div>

        {errorMessage && (
          <div className="text-red-500 text-center py-2">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="text-green-500 text-center py-2">
            {successMessage}
          </div>
        )}

        {activeTab === 'login' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-blue-700">Login</h2>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="w-full bg-blue-700 text-white p-3 rounded-md font-semibold hover:bg-blue-600 transition duration-300"
              onClick={handleLogin}
            >
              Login
            </button>
            <p className="text-center text-sm text-gray-500">
              <a href="#" onClick={() => navigate('/forgot-password')} className="underline hover:text-blue-600">Forgot Password?</a>
            </p>
          </div>
        )}

        {activeTab === 'register' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-blue-700">Register</h2>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className="w-full bg-blue-700 text-white p-3 rounded-md font-semibold hover:bg-blue-600 transition duration-300"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
