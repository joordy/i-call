// Imports and handlebars setup
const express = require('express')
const http = require('http')
const app = express()
const path = require('path')
const router = require('./router/routes')
const hbs = require('./utils/hbsSetup')
const port = process.env.PORT || 3131
require('dotenv').config()

// Sockets
// const initSocketIO = require('./utils/socket')
const server = http.createServer(app)
const io = require('socket.io')(server)

// PeerJS
const { ExpressPeerServer } = require('peer')
const peerServer = ExpressPeerServer(server, { debug: true })

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
  .use(router)
  .use('/peerjs', peerServer)
  .use((request, response, next) => {
    if (process.env.NODE_ENV != 'development' && !request.secure) {
      return response.redirect('https://' + request.headers.host + request.url)
    }
    next()
  })

io.on('connection', (socket) => {
  socket.on('join-room', (room_ID, user_ID) => {
    socket.join(room_ID)
    socket.broadcast.to(room_ID).emit('user-connected', user_ID)
  })
})

// initSocketIO(server)

// Launch application
server.listen(port, () => {
  console.log(`App can be opened on http://localhost:${port}`)
})
