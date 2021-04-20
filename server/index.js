// Imports and handlebars setup
const express = require('express')
const http = require('http')
const app = express()
const path = require('path')
const session = require('express-session')
const mongoose = require('mongoose')
const router = require('./router/routes')
const hbs = require('./utils/hbsSetup')
const port = process.env.PORT || 3232
require('dotenv').config()

// Sockets
const initSocketIO = require('./utils/socket')
const server = http.createServer(app)

// PeerJS
const { ExpressPeerServer } = require('peer')
const peerServer = ExpressPeerServer(server, { debug: true })
const newSession = session({
  secret: 'iCallSession123',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: 'auto',
  },
})

app.enable('trust proxy')
app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, './views'))
app.use(express.static('public'))
app.use(router)
app.use('/peerjs', peerServer)
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(express.json())
app.use(
  session({
    secret: `process.env.SESSION_SECRET`,
    cookie: { maxAge: 600000 },
    resave: true,
    saveUninitialized: true,
    secure: true,
  })
)
app.use((request, response, next) => {
  if (process.env.NODE_ENV != 'development' && !request.secure) {
    return response.redirect('https://' + request.headers.host + request.url)
  }
  next()
})

mongoose
  .connect(
    `mongodb+srv://joordy_:jjsyEnMXAbUGzJRRJ77z@icall.pjumk.mongodb.net/allUsers?retryWrites=true&w=majority`,
    {
      dbName: 'allUsers',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log('mongoDB database connected')
  })
  .catch((err) => {
    console.log('Error connecting...')
  })

// Use Socket.io function in application
initSocketIO(server, newSession)

// Launch application
server.listen(port, () => {
  console.log(`App can be opened on http://localhost:${port}`)
})
