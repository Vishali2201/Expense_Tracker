import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Doughnut, Bar } from 'react-chartjs-2';
import { ProgressBar } from 'react-bootstrap';

function BudgetingPage() {
  const navigate = useNavigate();

  // Sample data for weekly spending and budget categories
  const weeklySpendingData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Weekly Spending',
        data: [200, 250, 300, 150],
        backgroundColor: '#4f46e5',
      },
    ],
  };

  const budgetRecommendations = [
    "Consider reducing dining-out budget by 10%.",
    "Increase groceries budget next month.",
  ];

  const budgetProgressData = {
    totalBudget: 1000,
    spent: 600,
    forecastedEnd: 950,
  };

  const data = {
    labels: ['Housing', 'Food', 'Entertainment', 'Transport'],
    datasets: [
      {
        label: 'Budget Allocation',
        data: [300, 200, 150, 100],
        backgroundColor: ['#3b82f6', '#f97316', '#10b981', '#ef4444'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="flex h-screen overflow-hidden">

<aside className="w-64 bg-blue-800 text-white min-h-screen p-4">
        <h2 className="text-xl font-bold mb-4">Navigation</h2>
        <div
          className="flex items-center mb-6 cursor-pointer"
          onClick={() => navigate('/dashboard')}
        >
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
      <main className="flex-1 p-4 bg-gray-100 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Budgeting Overview</h2>

        <div className="flex flex-wrap gap-4 justify-center items-start">
          {/* Category Breakdown */}
          <div className="bg-white p-3 rounded-lg shadow-md flex-grow h-[600px] w-[30%]">
            <h3 className="text-lg font-semibold mb-2">Category Breakdown</h3>
            <Doughnut data={data} options={options} />
          </div>

          {/* Weekly Spending */}
          <div className="bg-white p-3 rounded-lg shadow-md flex-grow h-[600px] w-[30%]">
            <h3 className="text-lg font-semibold mb-2">Weekly Spending</h3>
            <Bar data={weeklySpendingData} options={options} />
          </div>

          {/* Budget Progress */}
          <div className="bg-white p-3 rounded-lg shadow-md flex-grow h-[380px] w-[30%]">
            <h3 className="text-lg font-semibold mb-2">Budget Progress</h3>
            <div className="text-center mb-4">
              <p>Total Budget: ${budgetProgressData.totalBudget}</p>
              <p>Spent: ${budgetProgressData.spent}</p>
              <p>Forecasted End: ${budgetProgressData.forecastedEnd}</p>
            </div>
            <ProgressBar now={(budgetProgressData.spent / budgetProgressData.totalBudget) * 100} />
          </div>
        </div>

        {/* Budget Recommendations */}
        <div className="bg-white p-4 rounded-lg shadow-md mt-4 w-full h-[160px]">
          <h3 className="text-lg font-semibold mb-2">Budget Recommendations</h3>
          <ul className="list-disc list-inside text-sm">
            {budgetRecommendations.map((rec, idx) => (
              <li key={idx}>{rec}</li>
            ))}
          </ul>
        </div>

        {/* Spending Insights */}
        <div className="bg-white p-4 rounded-lg shadow-md mt-4">
          <h3 className="text-lg font-semibold mb-2">Spending Insights</h3>
          <p className="text-gray-700">
            You have spent {((budgetProgressData.spent / budgetProgressData.totalBudget) * 100).toFixed(0)}% of your total budget. 
            Monitor your spending closely to stay within limits!
          </p>
        </div>

        {/* Reset Button */}
        <button className="bg-blue-500 text-white p-3 rounded mt-4 mx-auto block hover:bg-blue-600 transition w-full md:w-1/3">
          Reset for Next Month
        </button>
      </main>
    </div>
  );
}

export default BudgetingPage;
