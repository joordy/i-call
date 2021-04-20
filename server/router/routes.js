// Import packages
const express = require('express')
// const mongoose = require('mongoose')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const isUserLoggedIn = require('../utils/isLoggedIn')
const router = express.Router()

// Import routes
const home = require('./renders/home')
const login = require('./renders/login')
const register = require('./renders/register')
const dashboard = require('./renders/dashboard')
const notFound = require('./renders/notFound')
const invite = require('./renders/invite')
const rooms = require('./renders/rooms')

// Setting get routes
router.get('/', home)
router.get('/login', login)
router.get('/register', register)
router.get('/dashboard', dashboard)
router.get('/rooms/:roomID', isUserLoggedIn, rooms)
// router.get('/createroom', createroom)

// router.get('*', notFound)

router.post('/rooms/:roomID', rooms)
router.post('/rooms/invite', invite)

// Export router module
module.exports = router
