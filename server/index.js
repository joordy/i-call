// Imports and handlebars setup
const express = require('express')
const http = require('http')
const app = express()
const path = require('path')
const session = require('express-session')
const sharedSessions = require('express-socket.io-session')
const router = require('./router/routes')
const hbs = require('./utils/hbsSetup')
const port = process.env.PORT || 9000
require('dotenv').config()

// Sockets
// const initSocketIO = require('./utils/socket')
const server = http.createServer(app)
const io = require('socket.io')(server)
const formatMessage = require('./utils/formatMessage')

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

app
  .enable('trust proxy')
  .engine('.hbs', hbs.engine)
  .set('view engine', '.hbs')
  .set('views', path.join(__dirname, './views'))
  .use(
    express.urlencoded({
      extended: true,
    })
  )
  .use(express.json())
  .use(express.static('public'))
  .use(
    session({
      secret: process.env.SESSION_SECRET,
      cookie: { maxAge: 600000 },
      resave: true,
      saveUninitialized: true,
      secure: true,
    })
  )
  .use(router)
  .use('/peerjs', peerServer)
  .use((request, response, next) => {
    if (process.env.NODE_ENV != 'development' && !request.secure) {
      return response.redirect('https://' + request.headers.host + request.url)
    }
    next()
  })

io.on('connection', (socket) => {
  io.use(sharedSessions(newSession))

  socket.on('join-room', (obj) => {
    console.log(obj)
    socket.join(obj.room_ID)
    socket.broadcast.to(obj.room_ID).emit('user-connected', obj.peer_ID)
  })
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg)
  })
  socket.on('message', (message) => {
    io.emit('createMessage', message)
  })
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

// Launch application
server.listen(port, () => {
  console.log(`App can be opened on http://localhost:${port}`)
})
