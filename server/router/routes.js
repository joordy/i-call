// Import packages
const express = require('express')
const isUserLoggedIn = require('../utils/isLoggedIn')
const router = express.Router()

// Import routes
const home = require('./../renders/home')
const notFound = require('./../renders/notFound')
// const createroom = require('../../_trash/createroom')
const invite = require('../renders/invite.js')
const rooms = require('./../renders/rooms')

// Setting get routes
router.get('/', home)
router.get('/rooms/:roomID', isUserLoggedIn, rooms)
// router.get('/createroom', createroom)

// router.get('*', notFound)

router.post('/rooms/:roomID', rooms)
router.post('/rooms/invite', invite)

// Export router module
module.exports = router
