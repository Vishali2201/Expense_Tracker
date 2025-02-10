// models/Goal.js
const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  name: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  savedAmount: { type: Number, default: 0 },
  targetDate: { type: Date, required: true },
  category: { type: String, required: true },
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
