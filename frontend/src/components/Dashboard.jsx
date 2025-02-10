import React from 'react';
import { FaChartPie, FaChartLine, FaDollarSign, FaWallet, FaCog, FaClipboardList, FaBullseye } from 'react-icons/fa';
import { LineChart, Line, PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const recentTransactions = [
    { category: 'Groceries', amount: 50, date: '2023-10-12' },
    { category: 'Utilities', amount: 120, date: '2023-10-10' },
    { category: 'Entertainment', amount: 80, date: '2023-10-08' },
    { category: 'Rent', amount: 500, date: '2023-10-01' },
    { category: 'Travel', amount: 150, date: '2023-09-28' },
  ];

  const expenseTrendsData = [
    { month: 'Jan', expense: 400 },
    { month: 'Feb', expense: 350 },
    { month: 'Mar', expense: 500 },
    { month: 'Apr', expense: 600 },
    { month: 'May', expense: 550 },
    { month: 'Jun', expense: 450 },
    { month: 'Jul', expense: 700 },
    { month: 'Aug', expense: 600 },
    { month: 'Sep', expense: 650 },
    { month: 'Oct', expense: 750 },
  ];

  const incomeExpenseData = [
    { name: 'Income', value: 3000 },
    { name: 'Expenses', value: 1800 },
  ];

  const COLORS = ['#00C49F', '#FF8042'];
  const savingsGoalProgress = 70;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-blue-900 text-white p-5 space-y-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <nav className="space-y-4">
          <a href="#" className="flex items-center space-x-2">
            <FaChartPie /><span>Overview</span>
          </a>
          <a href="/transactions" className="flex items-center space-x-2">
            <FaDollarSign /><span>Transactions</span>
          </a>
          <a href="/budgeting" className="flex items-center space-x-2">
            <FaWallet /><span>Budgeting</span>
          </a>
          <a href="/goals" className="flex items-center space-x-2">
            <FaBullseye /><span>Goals</span>
          </a>
          <a href="/reports" className="flex items-center space-x-2">
            <FaClipboardList /><span>Reports</span>
          </a>
          <a href="/settings" className="flex items-center space-x-2">
            <FaCog /><span>Settings</span>
          </a>
        </nav>
      </aside>
      <main className="flex-1 p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="font-semibold text-gray-700">Total Income</h3>
            <p className="text-2xl font-bold text-green-500">$3,000</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="font-semibold text-gray-700">Total Expenses</h3>
            <p className="text-2xl font-bold text-red-500">$1,800</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="font-semibold text-gray-700">Savings</h3>
            <p className="text-2xl font-bold text-blue-500">$1,200</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="font-semibold text-gray-700">Budget Status</h3>
            <p className="text-2xl font-bold text-yellow-500">On Track</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2 p-4 bg-white shadow rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-4">Expense Trends</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={expenseTrendsData}>
                <Line type="monotone" dataKey="expense" stroke="#8884d8" />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-4">Income vs. Expense</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={incomeExpenseData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8">
                  {incomeExpenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2 p-4 bg-white shadow rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-4">Recent Transactions</h3>
            <ul>
              {recentTransactions.map((transaction, index) => (
                <li key={index} className="flex justify-between text-gray-600 mb-2">
                  <span>{transaction.category}</span>
                  <span>${transaction.amount}</span>
                  <span>{transaction.date}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-white shadow rounded-lg flex flex-col items-center">
            <h3 className="font-semibold text-gray-700 mb-4">Savings Goal</h3>
            <div className="w-full bg-gray-300 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${savingsGoalProgress}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-600">{savingsGoalProgress}% completed</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
