import React, { useState, useEffect } from 'react';
import { FaBell, FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';
import { ProgressBar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoalsPage = () => {
  const navigate = useNavigate();

  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    targetDate: '',
    category: '',
  });

  // Fetch goals data from the backend
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Or wherever your token is stored
        if (token) {
          const response = await axios.get('http://localhost:5000/api/goals', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setGoals(response.data); // Set the fetched goals to state
        } else {
          console.log('No token found');
        }
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    fetchGoals(); // Call fetchGoals inside useEffect
  }, []); // Empty dependency array means this runs once when the component mounts

  const handleCreateGoal = async () => {
    if (newGoal.name && newGoal.targetAmount && newGoal.targetDate) {
      try {
        const token = localStorage.getItem('authToken'); // Get the token again before creating the goal
        if (token) {
          const response = await axios.post('http://localhost:5000/api/goals', newGoal, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setGoals([...goals, response.data]); // Update state with the new goal
          setNewGoal({ name: '', targetAmount: '', targetDate: '', category: '' });
        } else {
          console.log('No token found');
        }
      } catch (error) {
        console.error('Error creating goal:', error);
      }
    }
  };

  const handleGoalInput = (e) => {
    const { name, value } = e.target;
    setNewGoal((prevGoal) => ({ ...prevGoal, [name]: value }));
  };

  // Helper function to format the date (remove time)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format as MM/DD/YYYY
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Navigation */}
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

      {/* Main Goals Content */}
      <main className="flex-1 ml-64 p-6 overflow-y-auto bg-gray-100">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Goal Overview</h2>

        {/* Create Goal Form */}
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">Create a New Goal</h3>
          <input
            type="text"
            name="name"
            value={newGoal.name}
            onChange={handleGoalInput}
            className="w-full p-2 mb-4 border rounded"
            placeholder="Goal Name (e.g., New Car Fund)"
          />
          <input
            type="number"
            name="targetAmount"
            value={newGoal.targetAmount}
            onChange={handleGoalInput}
            className="w-full p-2 mb-4 border rounded"
            placeholder="Target Amount"
          />
          <input
            type="date"
            name="targetDate"
            value={newGoal.targetDate}
            onChange={handleGoalInput}
            className="w-full p-2 mb-4 border rounded"
          />
          <select
            name="category"
            value={newGoal.category}
            onChange={handleGoalInput}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="" disabled>Select Category</option>
            <option value="Travel">Travel</option>
            <option value="Savings">Savings</option>
            <option value="Home">Home</option>
          </select>
          <Button variant="primary" onClick={handleCreateGoal} className="w-full bg-blue-700">
            Create Goal
          </Button>
        </div>

        {/* Goal Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {goals.map((goal, index) => {
            const progress = (goal.savedAmount / goal.targetAmount) * 100;
            const timeRemaining = new Date(goal.targetDate) - new Date();
            const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));

            return (
              <div key={index} className="bg-white p-4 rounded-lg shadow-lg transition hover:shadow-xl">
                <h3 className="text-xl font-semibold text-blue-600">{goal.name}</h3>
                <div className="flex items-center text-gray-500 my-2">
                  <FaCalendarAlt className="mr-2" />
                  <p>{formatDate(goal.targetDate)} ({daysRemaining} days left)</p>
                </div>
                <ProgressBar now={progress} label={`${progress.toFixed(0)}%`} className="mb-2" />
                <div className="text-center text-gray-700 mb-4">${goal.savedAmount} / ${goal.targetAmount} saved</div>
                <div className="flex justify-between items-center">
                  {[25, 50, 75, 100].map((milestone) => (
                    <div
                      key={milestone}
                      className={`w-3 h-3 rounded-full ${progress >= milestone ? 'bg-green-500' : 'bg-gray-300'}`}
                    ></div>
                  ))}
                  <FaBell className="text-blue-500 cursor-pointer" title="Set Reminder" />
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default GoalsPage;
