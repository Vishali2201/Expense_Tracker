import React from "react";
import { FaDollarSign, FaChartLine, FaWallet } from "react-icons/fa";
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="animated-background min-h-screen text-white flex flex-col items-center">
      <section className="w-full text-center py-20 px-4 flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 space-y-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold animate-pulse">
          Track Your Expenses, Plan Your Future
        </h1>
        <p className="text-lg sm:text-xl max-w-md md:max-w-lg">
          Take control of your finances with real-time insights and budgeting tools.
        </p>
        <Link to="/auth">
            <button className="px-8 py-3 bg-yellow-500 text-blue-900 rounded-lg font-semibold shadow-lg transition duration-300 transform hover:bg-yellow-400 hover:scale-105">
                Get Started
            </button>
        </Link>
      </section>
      <section className="w-full px-4 py-16 grid gap-8 md:grid-cols-3 text-center">
        <div className="p-6 bg-white bg-opacity-10 rounded-lg shadow-md hover:bg-opacity-20 transition duration-300">
          <FaDollarSign className="mx-auto text-3xl mb-4 text-yellow-300" />
          <h3 className="text-2xl font-bold mb-2">Expense Tracking</h3>
          <p>Keep track of all your expenses in one place effortlessly.</p>
        </div>
        <div className="p-6 bg-white bg-opacity-10 rounded-lg shadow-md hover:bg-opacity-20 transition duration-300">
          <FaChartLine className="mx-auto text-3xl mb-4 text-yellow-300" />
          <h3 className="text-2xl font-bold mb-2">Budgeting</h3>
          <p>Create and stick to a budget tailored to your financial goals.</p>
        </div>
        <div className="p-6 bg-white bg-opacity-10 rounded-lg shadow-md hover:bg-opacity-20 transition duration-300">
          <FaWallet className="mx-auto text-3xl mb-4 text-yellow-300" />
          <h3 className="text-2xl font-bold mb-2">Visual Analytics</h3>
          <p>Understand your spending habits with beautiful visual insights.</p>
        </div>
      </section>
      <section className="w-full px-4 py-16 bg-blue-800 text-center space-y-8">
        <h2 className="text-3xl font-bold">What Our Users Say</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <blockquote className="p-6 bg-white bg-opacity-10 rounded-lg shadow-md">
            <p className="italic">"This app has completely changed the way I manage my finances!"</p>
            <footer className="mt-4 text-yellow-300">- Alex P.</footer>
          </blockquote>
          <blockquote className="p-6 bg-white bg-opacity-10 rounded-lg shadow-md">
            <p className="italic">"Simple, intuitive, and effective. Highly recommend!"</p>
            <footer className="mt-4 text-yellow-300">- Jamie K.</footer>
          </blockquote>
          <blockquote className="p-6 bg-white bg-opacity-10 rounded-lg shadow-md">
            <p className="italic">"The analytics feature helped me cut unnecessary expenses!"</p>
            <footer className="mt-4 text-yellow-300">- Morgan L.</footer>
          </blockquote>
        </div>
      </section>

      <footer className="w-full px-4 py-6 bg-blue-900 text-center text-sm">
        <div className="flex justify-center space-x-8 mb-4">
          <a href="#" className="hover:underline">About Us</a>
          <a href="#" className="hover:underline">Contact Us</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
        </div>
        <p>&copy; 2024 Expense Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
