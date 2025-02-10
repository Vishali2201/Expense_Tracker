const express = require('express');
const router = express.Router();
const { getGoals, createGoal, updateGoal, deleteGoal } = require('../controllers/goalController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect routes with authentication middleware
router.get('/', authMiddleware, getGoals);        // GET all goals (requires authentication)
router.post('/add', authMiddleware, createGoal);  // POST to create a new goal (requires authentication)
router.put('/:id', authMiddleware, updateGoal);   // PUT to update a goal (requires authentication)
router.delete('/:id', authMiddleware, deleteGoal); // DELETE a goal (requires authentication)

module.exports = router;
