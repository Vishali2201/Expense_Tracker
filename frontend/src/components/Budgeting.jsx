import React, { useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Budgeting = () => {
  const [budgetData, setBudgetData] = useState({
    totalBudget: 5000,
    remainingBudget: 2000,
    categories: [
      { name: 'Groceries', budget: 1000, spent: 800 },
      { name: 'Rent', budget: 1500, spent: 1500 },
      { name: 'Entertainment', budget: 500, spent: 450 },
      { name: 'Utilities', budget: 800, spent: 600 },
      { name: 'Other', budget: 1200, spent: 650 },
    ],
    alertThreshold: 80, // Default alert threshold percentage
  });

  const navigate = useNavigate();

  // Category breakdown data
  const categoryData = {
    labels: budgetData.categories.map((cat) => cat.name),
    datasets: [
      {
        label: 'Budgeted',
        data: budgetData.categories.map((cat) => cat.budget),
        backgroundColor: '#4caf50',
      },
      {
        label: 'Spent',
        data: budgetData.categories.map((cat) => cat.spent),
        backgroundColor: '#f44336',
      },
    ],
  };

  const pieData = {
    labels: budgetData.categories.map((cat) => cat.name),
    datasets: [
      {
        data: budgetData.categories.map((cat) => cat.spent),
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
      },
    ],
  };

  // Handling budget alert setup
  const handleAlertChange = (e) => {
    setBudgetData((prev) => ({ ...prev, alertThreshold: e.target.value }));
  };

  return (
    <div className="flex h-screen flex-col">
      <nav className="flex items-center justify-between bg-blue-800 text-white p-4">
        <h1 className="text-xl font-bold">Budgeting</h1>
        <button
          className="bg-white text-blue-800 px-4 py-2 rounded hover:bg-gray-200"
          onClick={() => navigate('/budgeting-page')}
        >
          Go to Detailed Budgeting
        </button>
      </nav>

      <div className="flex flex-1">

        <aside className="w-64 bg-blue-800 text-white min-h-screen p-4">
          <h2 className="text-xl font-bold mb-4">Navigation</h2>
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
        </aside>
        <main className="flex-1 p-6 bg-gray-100 flex flex-col items-stretch overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Budgeting Overview</h1>

          <section className="flex justify-between mb-6 bg-white p-4 rounded shadow">
            <div>
              <h2 className="text-lg font-semibold">Total Budget</h2>
              <p className="text-2xl text-green-600">${budgetData.totalBudget}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Remaining Budget</h2>
              <p className="text-2xl text-blue-600">${budgetData.remainingBudget}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Over-Budget Alerts</h2>
              <input
                type="number"
                value={budgetData.alertThreshold}
                onChange={handleAlertChange}
                className="p-2 border rounded w-16 text-center"
                placeholder="%"
              />
            </div>
          </section>

        <section className="mb-6 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Set Budget</h2>

          <p>Define budgets for each category and set your total monthly budget.</p>
        </section>

        <div className="flex flex-col lg:flex-row gap-4 mb-6">

          <div className="flex-1 bg-white p-4 rounded shadow">
            <h2 className="text-center font-semibold mb-4">Category Breakdown</h2>
            <div style={{ height: '400px' }}>
              <Bar data={categoryData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>

          <div className="flex-1 bg-white p-4 rounded shadow">
            <h2 className="text-center font-semibold mb-4">Expense Breakdown</h2>
            <div style={{ height: '400px' }}>
              <Pie data={pieData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
        <section className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">Budget Progress by Category</h2>
          <div className="space-y-4">
            {budgetData.categories.map((cat, index) => {
              const progress = (cat.spent / cat.budget) * 100;
              const isOverBudget = progress > 100;
              const alertColor = progress >= budgetData.alertThreshold ? 'text-red-600' : 'text-gray-700';

              return (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className={`${alertColor} font-semibold`}>{cat.name}</span>
                    <span className={`${alertColor} font-semibold`}>{Math.min(progress, 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full ${isOverBudget ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Budget Alerts</h2>
          <p className="text-gray-700">
            Set an alert to notify you when spending reaches {budgetData.alertThreshold}% of the budgeted amount for any
            category.
          </p>
        </section>
        </main>
      </div>
    </div>
  );
};

export default Budgeting;
