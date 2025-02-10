// controllers/goalController.js
const Goal = require('../models/Goal');

// Get all goals for the logged-in user
exports.getGoals = async (req, res) => {
  const userId = req.user.userId;
  try {
    const goals = await Goal.find({ user: userId });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Create a new goal
exports.createGoal = async (req, res) => {
  const { name, targetAmount, targetDate, category } = req.body;
  console.log(req);
  const userId = req.user.userId;

  try {
    const newGoal = new Goal({
      user: userId,
      name,
      targetAmount,
      savedAmount: 0,
      targetDate,
      category,
    });
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update a goal by ID
exports.updateGoal = async (req, res) => {
  const { id } = req.params;
  const { name, targetAmount, savedAmount, targetDate, category } = req.body;

  try {
    const updatedGoal = await Goal.findByIdAndUpdate(
      id,
      { name, targetAmount, savedAmount, targetDate, category },
      { new: true }
    );

    if (!updatedGoal) return res.status(404).json({ msg: 'Goal not found' });
    res.json(updatedGoal);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete a goal by ID
exports.deleteGoal = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedGoal = await Goal.findByIdAndDelete(id);

    if (!deletedGoal) return res.status(404).json({ msg: 'Goal not found' });
    res.json({ msg: 'Goal deleted', deletedGoal });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};
