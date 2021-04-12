// Imports and handlebars setup
const express = require('express')
const http = require('http')
const app = express()
const path = require('path')
const router = require('./router/routes')
const hbs = require('./utils/hbsSetup')
const port = process.env.PORT || 3030
require('dotenv').config()

// Sockets
const initSocketIO = require('./utils/socket')
const server = http.createServer(app)

// PeerJS
const { ExpressPeerServer } = require('peer')
const serverPeer = ExpressPeerServer(server, { debug: true })

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
  .use('/peerjs', serverPeer)
  .use((request, response, next) => {
    if (process.env.NODE_ENV != 'development' && !request.secure) {
      return response.redirect('https://' + request.headers.host + request.url)
    }
    next()
  })

initSocketIO(server)

// Launch application
server.listen(port, () => {
  console.log(`App can be opened on http://localhost:${port}`)
})
