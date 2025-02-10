const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController'); // Ensure these functions are defined in authController.js

// Define routes
router.post('/register', registerUser); // Make sure registerUser is defined
router.post('/login', loginUser);       // Make sure loginUser is defined

module.exports = router;
