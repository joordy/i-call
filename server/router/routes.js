// Import packages
const express = require('express')
const mongo = require('mongodb');
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const isUserLoggedIn = require('../utils/isLoggedIn')
const router = express.Router()
require('dotenv').config()

// Import routes
// Get routes
const home = require('./renders/get/home')
const login = require('./renders/get/login')
const register = require('./renders/get/register')
const dashboard = require('./renders/get/dashboard')
const notFound = require('./renders/get/notFound')

// Post routes
const postLogin = require('./renders/post/postLogin')
const postRegister = require('./renders/post/postRegister')
const invite = require('./renders/post/invite')
const rooms = require('./renders/post/rooms')

// Setting get routes
router.get('/', home)
router.get('/login', login)
router.get('/register', register)
router.get('/dashboard', dashboard)
router.get('/rooms/:roomID', isUserLoggedIn, rooms)
// router.get('/createroom', createroom)

// router.get('*', notFound)

router.post('/login', postLogin)
router.post('/register', postRegister)
router.post('/rooms/:roomID', rooms)
router.post('/rooms/invite', invite)

// Export router module
module.exports = router
