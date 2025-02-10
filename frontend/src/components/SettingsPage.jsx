import React, { useState } from 'react';
import {
  FaUser,
  FaBell,
  FaLanguage,
  FaDollarSign,
  FaMoon,
  FaDownload,
  FaTrash,
  FaArrowLeft,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    password: '',
    profilePicture: null,
  });

  const [notifications, setNotifications] = useState({
    budgetLimits: false,
    recurringExpenses: false,
    goalProgress: false,
  });

  const [preferences, setPreferences] = useState({
    currency: 'USD',
    language: 'English',
  });

  const [theme, setTheme] = useState({
    darkMode: false,
  });

  const exportData = () => {
    alert('Data exported as CSV!');
  };

  const deleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action is irreversible.')) {
      alert('Account deleted.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col justify-between p-4 fixed inset-y-0">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-center">Navigation</h2>
          <div className="flex items-center mb-6 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <FaArrowLeft className="mr-2" />
            <span>Dashboard</span>
          </div>
          <ul className="space-y-4">
            <li className="hover:text-blue-300 cursor-pointer" onClick={() => navigate('/transactions')}>Transactions</li>
            <li className="hover:text-blue-300 cursor-pointer" onClick={() => navigate('/budgeting')}>Budgeting</li>
            <li className="hover:text-blue-300 cursor-pointer" onClick={() => navigate('/goals')}>Goals</li>
            <li className="hover:text-blue-300 cursor-pointer" onClick={() => navigate('/reports')}>Reports</li>
            <li className="hover:text-blue-300 cursor-pointer" onClick={() => navigate('/settings')}>Settings</li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 ml-64">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Settings</h1>

        {/* Profile Management */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="flex items-center text-xl font-semibold mb-4 text-blue-600">
            <FaUser className="mr-2" /> Profile Management
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder="Name"
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              placeholder="Email"
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="password"
              name="password"
              value={profile.password}
              onChange={(e) => setProfile({ ...profile, password: e.target.value })}
              placeholder="Password"
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="file"
              name="profilePicture"
              onChange={(e) => setProfile({ ...profile, profilePicture: e.target.files[0] })}
              className="w-full p-3 border rounded-lg"
            />
          </div>
        </section>

        {/* Notifications Settings */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="flex items-center text-xl font-semibold mb-4 text-blue-600">
            <FaBell className="mr-2" /> Notifications Settings
          </h2>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={notifications.budgetLimits}
                onChange={(e) => setNotifications({ ...notifications, budgetLimits: e.target.checked })}
              />
              <span>Alert for Budget Limits</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={notifications.recurringExpenses}
                onChange={(e) => setNotifications({ ...notifications, recurringExpenses: e.target.checked })}
              />
              <span>Alert for Recurring Expenses</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={notifications.goalProgress}
                onChange={(e) => setNotifications({ ...notifications, goalProgress: e.target.checked })}
              />
              <span>Alert for Goal Progress</span>
            </label>
          </div>
        </section>

        {/* Currency & Language Preferences */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="flex items-center text-xl font-semibold mb-4 text-blue-600">
            <FaDollarSign className="mr-2" /> Currency & Language Preferences
          </h2>
          <div className="space-y-4">
            <select
              value={preferences.currency}
              onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
              className="w-full p-3 border rounded-lg"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="INR">INR</option>
            </select>
            <select
              value={preferences.language}
              onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
              className="w-full p-3 border rounded-lg"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>
        </section>

        {/* Theme Settings */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="flex items-center text-xl font-semibold mb-4 text-blue-600">
            <FaMoon className="mr-2" /> Theme Settings
          </h2>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={theme.darkMode}
              onChange={(e) => setTheme({ ...theme, darkMode: e.target.checked })}
            />
            <span>Dark Mode</span>
          </label>
        </section>

        {/* Data Management */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="flex items-center text-xl font-semibold mb-4 text-blue-600">
            <FaDownload className="mr-2" /> Data Management
          </h2>
          <button
            onClick={exportData}
            className="w-full bg-blue-600 text-white p-3 rounded-lg mt-2 hover:bg-blue-700"
          >
            Export Data
          </button>
          <button
            onClick={deleteAccount}
            className="w-full bg-red-600 text-white p-3 rounded-lg mt-4 hover:bg-red-700"
          >
            Delete Account
          </button>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
