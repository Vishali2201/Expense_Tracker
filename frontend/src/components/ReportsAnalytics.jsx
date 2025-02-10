import React, { useState } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ReportsAnalytics = () => {
  const [timePeriod, setTimePeriod] = useState('monthly');
  const navigate = useNavigate();

  // Data for different time periods
  const dataSets = {
    weekly: {
      spendingTrends: [50, 75, 60, 90, 100, 80, 70],
      expenseBreakdown: [100, 200, 80, 120, 50],
      income: [300, 400, 350, 500, 450, 480, 420],
      expense: [250, 320, 300, 420, 380, 400, 360],
    },
    monthly: {
      spendingTrends: [200, 400, 300, 500, 700, 600],
      expenseBreakdown: [300, 500, 100, 150, 50],
      income: [500, 700, 600, 800, 700, 900],
      expense: [400, 500, 450, 600, 550, 650],
    },
    yearly: {
      spendingTrends: [1000, 1200, 1100, 1500, 1400, 1600],
      expenseBreakdown: [1200, 1500, 400, 600, 200],
      income: [2000, 2500, 2300, 2600, 2400, 2700],
      expense: [1500, 1800, 1600, 2000, 1900, 2100],
    },
  };

  // Chart data configurations based on selected time period
  const spendingTrendsData = {
    labels: timePeriod === 'weekly' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Spending Trends',
        data: dataSets[timePeriod].spendingTrends,
        borderColor: '#4b77a9',
        backgroundColor: 'rgba(75, 119, 169, 0.2)',
        fill: true,
      },
    ],
  };

  const expenseBreakdownData = {
    labels: ['Groceries', 'Rent', 'Utilities', 'Entertainment', 'Other'],
    datasets: [
      {
        data: dataSets[timePeriod].expenseBreakdown,
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
      },
    ],
  };

  const incomeExpenseData = {
    labels: timePeriod === 'weekly' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Income',
        data: dataSets[timePeriod].income,
        backgroundColor: '#36a2eb',
      },
      {
        label: 'Expense',
        data: dataSets[timePeriod].expense,
        backgroundColor: '#ff6384',
      },
    ],
  };

  const forecastData = timePeriod === 'weekly' ? 80 : timePeriod === 'monthly' ? 700 : 1500;

  // Generate PDF and Excel reports
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Monthly Report', 10, 10);
    doc.save('report.pdf');
  };

  const generateExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheetData = [
      ['Month', 'Income', 'Expense'],
      ['Jan', 500, 400],
      ['Feb', 700, 500],
      ['Mar', 600, 450],
      ['Apr', 800, 600],
      ['May', 700, 550],
      ['Jun', 900, 650],
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    XLSX.writeFile(workbook, 'report.xlsx');
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col justify-between p-4">
        <div>
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
        </div>
      </aside>
      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 flex flex-col items-stretch overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Reports & Analytics</h1>

        {/* Time Period Selector */}
        <div className="flex items-center mb-6">
          <label className="mr-2 text-gray-700 text-sm">Select Time Period:</label>
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="p-2 rounded bg-gray-200 text-gray-800"
          >
            <option value="weekly">Last 7 Days</option>
            <option value="monthly">Last Month</option>
            <option value="yearly">Last Year</option>
          </select>
        </div>

        {/* Chart Layout */}
        <div className="flex-1 flex flex-col gap-4">
          {/* First Row - Spending Trends & Expense Breakdown */}
          <div className="flex flex-row gap-4 flex-1">
            <div className="flex-1 h-full bg-white p-4 rounded shadow-sm">
              <h2 className="text-center font-semibold text-lg mb-4">Spending Trends</h2>
              <div style={{ height: '400px' }}>
                <Line data={spendingTrendsData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
            <div className="flex-1 h-full bg-white p-4 rounded shadow-sm">
              <h2 className="text-center font-semibold text-lg mb-4">Expense Breakdown</h2>
              <div style={{ height: '400px' }}>
                <Pie data={expenseBreakdownData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </div>

          {/* Second Row - Income vs Expense Analysis & Forecasting/Generate Report */}
          <div className="flex flex-row gap-4 flex-1">
            <div className="flex-1 h-full bg-white p-4 rounded shadow-sm">
              <h2 className="text-center font-semibold text-lg mb-4">Income vs Expense</h2>
              <div style={{ height: '400px' }}>
                <Bar data={incomeExpenseData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
            <div className="flex-1 h-full flex flex-col gap-4">
              <div className="bg-white p-4 rounded shadow-sm flex-1 flex flex-col items-center justify-center">
                <h2 className="text-center font-semibold text-lg mb-4">Forecasting</h2>
                <p className="text-gray-700 text-lg">Predicted expense: ${forecastData}</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm flex-1 flex flex-col items-center justify-center">
                <h2 className="text-center font-semibold text-lg mb-4">Generate Report</h2>
                <div className="space-x-4">
                  <button onClick={generatePDF} className="bg-blue-500 text-white px-4 py-2 rounded">PDF</button>
                  <button onClick={generateExcel} className="bg-green-500 text-white px-4 py-2 rounded">Excel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
