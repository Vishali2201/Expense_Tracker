const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, updateTransaction, deleteTransaction } = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply authMiddleware to protect the routes
router.get('/', authMiddleware, getTransactions);        // GET all transactions for the logged-in user
router.post('/add', authMiddleware, addTransaction);     // POST to add a new transaction
router.put('/:id', authMiddleware, updateTransaction);   // PUT to update a transaction by ID
router.delete('/:id', authMiddleware, deleteTransaction); // DELETE a transaction by ID

module.exports = router;
