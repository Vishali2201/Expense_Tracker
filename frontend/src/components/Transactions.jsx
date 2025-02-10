import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaSearch, FaPlus, FaArrowLeft, FaQuestionCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Transactions = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    date: '', amount: '', category: '', description: '', currency: 'USD'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransactions, setSelectedTransactions] = useState(new Set());

  const categories = ['Groceries', 'Utilities', 'Entertainment', 'Rent', 'Travel'];
  const yourAuthToken = localStorage.getItem('authToken');
  

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/transactions', {
        headers: {
          'Authorization': `Bearer ${yourAuthToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value });
  };

  const addTransaction = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/transactions/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${yourAuthToken}`
        },
        body: JSON.stringify(newTransaction)
      });
      if (response.ok) {
        fetchTransactions();
        setNewTransaction({ date: '', amount: '', category: '', description: '', currency: 'USD' });
      } else {
        console.error('Failed to add transaction');
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/transactions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${yourAuthToken}`
        }
      });
      if (response.ok) {
        fetchTransactions();
      } else {
        console.error('Failed to delete transaction');
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const deleteSelectedTransactions = async () => {
    try {
      const deletePromises = Array.from(selectedTransactions).map(id =>
        fetch(`http://localhost:5000/api/transactions/${id}`, { method: 'DELETE' })
      );
      await Promise.all(deletePromises);
      fetchTransactions();
      setSelectedTransactions(new Set());
    } catch (error) {
      console.error('Error deleting selected transactions:', error);
    }
  };

  const toggleSelectTransaction = (id) => {
    const newSelectedTransactions = new Set(selectedTransactions);
    if (newSelectedTransactions.has(id)) {
      newSelectedTransactions.delete(id);
    } else {
      newSelectedTransactions.add(id);
    }
    setSelectedTransactions(newSelectedTransactions);
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
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

      <div className="flex-grow">
        <nav className="flex items-center justify-end bg-blue-800 text-white p-4">
          <div className="flex items-center">
            <button
              className="bg-white text-blue-800 px-4 py-2 rounded hover:bg-gray-200 mr-4"
              onClick={() => navigate('/help')}
            >
              <FaQuestionCircle className="inline mr-2" />
              Help
            </button>
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/settings')}>
              <img src="path/to/your/profile-pic.jpg" alt="Profile" className="w-8 h-8 rounded-full mr-2" />
              <span className="text-gray-200">Yashica</span>
            </div>
          </div>
        </nav>

        <div className="p-6 bg-gray-100 flex-grow min-h-screen">
          <h2 className="text-2xl font-bold mb-6">Transactions</h2>
          <div className="mb-6 p-4 bg-white shadow rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Add New Transaction</h3>
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="date" name="date" value={newTransaction.date} onChange={handleInputChange} className="p-2 border rounded" />
              <input type="number" name="amount" value={newTransaction.amount} placeholder="Amount" onChange={handleInputChange} className="p-2 border rounded" />
              <select name="category" value={newTransaction.category} onChange={handleInputChange} className="p-2 border rounded">
                <option value="">Select Category</option>
                {categories.map((cat, index) => <option key={index} value={cat}>{cat}</option>)}
              </select>
              <input type="text" name="description" value={newTransaction.description} placeholder="Description" onChange={handleInputChange} className="p-2 border rounded" />
              <input type="text" name="currency" value={newTransaction.currency} placeholder="Currency" onChange={handleInputChange} className="p-2 border rounded" />
              <button type="button" onClick={addTransaction} className="p-2 bg-blue-600 text-white rounded"><FaPlus className="inline mr-2" /> Add Transaction</button>
            </form>
          </div>

          <div className="mb-6 flex items-center space-x-4">
            <input type="text" placeholder="Search by description" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="p-2 border rounded flex-grow" />
            <button className="p-2 bg-gray-200 rounded"><FaSearch /></button>
          </div>

          {selectedTransactions.size > 0 && (
            <button className="mb-4 p-2 bg-red-600 text-white rounded" onClick={deleteSelectedTransactions}>
              <FaTrash className="inline mr-2" /> Delete Selected
            </button>
          )}

          <div className="bg-white shadow rounded-lg overflow-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="p-4 text-left font-medium">Date</th>
                  <th className="p-4 text-left font-medium">Category</th>
                  <th className="p-4 text-left font-medium">Description</th>
                  <th className="p-4 text-left font-medium">Amount</th>
                  <th className="p-4 text-left font-medium">Currency</th>
                  <th className="p-4 text-left font-medium">Actions</th>
                  <th className="p-4 text-left font-medium">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        const newSelectedTransactions = e.target.checked
                          ? new Set(transactions.map((t) => t._id))
                          : new Set();
                        setSelectedTransactions(newSelectedTransactions);
                      }}
                      checked={selectedTransactions.size === transactions.length}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction._id} className="border-b">
                    <td className="p-4">{new Date(transaction.date).toLocaleDateString()}</td>
                    <td className="p-4">{transaction.category}</td>
                    <td className="p-4">{transaction.description}</td>
                    <td className="p-4">{transaction.amount}</td>
                    <td className="p-4">{transaction.currency}</td>
                    <td className="p-4">
                      <button className="text-blue-500 mr-2" onClick={() => console.log(`Edit ${transaction._id}`)}><FaEdit /></button>
                      <button className="text-red-500" onClick={() => deleteTransaction(transaction._id)}><FaTrash /></button>
                    </td>
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedTransactions.has(transaction._id)}
                        onChange={() => toggleSelectTransaction(transaction._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
