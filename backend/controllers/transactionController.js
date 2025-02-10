const Transaction = require('../models/Transaction');

// Get all transactions for the logged-in user
exports.getTransactions = async (req, res) => {
  const userId = req.user.userId; // Fetch the logged-in user’s ID from the request

  try {
    const transactions = await Transaction.find({ user: userId }); // Filter transactions by user ID
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};


// Add a new transaction for the logged-in user
exports.addTransaction = async (req, res) => {
  const { date, category, description, amount, currency } = req.body;
  
  // Ensure user is attached to the request by the authMiddleware
  const userId = req.user.userId;

  try {
    const newTransaction = new Transaction({
      user: userId, // Link the transaction to the logged-in user
      date,
      category,
      description,
      amount,
      currency
    });

    await newTransaction.save();
    res.status(201).json(newTransaction); // Respond with the created transaction
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};


// Update a transaction by ID
exports.updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { date, category, description, amount, currency } = req.body;

  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { date, category, description, amount, currency },
      { new: true }
    );

    if (!updatedTransaction) return res.status(404).json({ msg: 'Transaction not found' });

    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete a transaction by ID
exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if (!deletedTransaction) return res.status(404).json({ msg: 'Transaction not found' });

    res.json({ msg: 'Transaction deleted', deletedTransaction });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};
