// Import packages
const express = require('express')
const isUserLoggedIn = require('../utils/isLoggedIn')
const router = express.Router()
const { auth, requiresAuth } =require('express-openid-connect')
// const { requiresAuth } = require('express-openid-connect');

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

router.use(auth({
  authRequired: false,
  auth0Logout: true,
  baseURL: `${process.env.BASE_URL}`,
  clientID: `${process.env.CLIENT_ID}`,
  issuerBaseURL: `${process.env.ISSUER_BASE_URL}`,
  secret: `${process.env.SECRET}`,

}))

// Setting get routes
// router.get('/', home)
router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'logged in' : 'logged out')
})
// router.get('/login', login)
router.get('/register', register)
// router.get('/dashboard', requiresAuth(), (req,res) => {
//   res.send(JSON.stringify(req.oidc.user))
// })

router.get('/dashboard', requiresAuth(), dashboard)
router.get('/rooms/:roomID', isUserLoggedIn, rooms)
// router.get('/createroom', createroom)

// router.get('*', notFound)

// router.post('/login', postLogin)
router.post('/register', postRegister)
router.post('/rooms/:roomID', rooms)
router.post('/rooms/invite', invite)

// Export router module
module.exports = router
