// Import packages
const express = require('express')
const { auth, requiresAuth } = require('express-openid-connect')
const router = express.Router()
require('dotenv').config()

// Import routes
const home = require('./renders/get/home')
const dashboard = require('./renders/get/dashboard')
const notFound = require('./renders/get/notFound')
const invite = require('./renders/post/invite')
const rooms = require('./renders/post/rooms')

router.use(auth({
  authRequired: false,
  auth0Logout: true,
  baseURL: `${process.env.BASE_URL}`,
  clientID: `${process.env.CLIENT_ID}`,
  issuerBaseURL: `${process.env.ISSUER_BASE_URL}`,
  secret: `${process.env.SECRET}`,
}))

// Get routes
router.get('/', home)
router.get('/dashboard', requiresAuth(), dashboard)
router.get('/*', notFound)
// router.get('/rooms/:roomID', requiresAuth(), isUserLoggedIn, rooms)

// Post routes
router.post('/rooms/:roomID', requiresAuth(), rooms)
router.post('/rooms/invite', requiresAuth(), invite)

module.exports = router