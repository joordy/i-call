// Import packages
const express = require('express');
const router = express.Router();

// Import routes
const { home } = require('./../renders/home');

// Setting get routes
router.get('/', home);

// Export router module
module.exports = router;
