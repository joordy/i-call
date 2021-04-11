// Import packages
const express = require('express')
const router = express.Router()

// Import routes
const { home } = require('./../renders/home')
const { notFound } = require('./../renders/notFound')
const { dashboard } = require('./../renders/dashboard')
const { rooms } = require('./../renders/rooms')

// Setting get routes
router.get('/', home)
router.get('/dashboard', dashboard)
router.get('/rooms/:roomID', rooms)

// router.get('*', notFound)

router.post('/rooms/:roomID', rooms)

// Export router module
module.exports = router
