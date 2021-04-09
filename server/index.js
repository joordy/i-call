// Imports and handlebars setup
const express = require('express')
const http = require('http')
const app = express()
const path = require('path')
const expressHandlebars = require('express-handlebars')
const router = require('./router/routes')
const server = http.createServer(app)
const { initSocketIO } = require('./utils/socket')
const port = process.env.PORT || 3333
require('dotenv').config()

const hbs = expressHandlebars.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, './views/layouts'),
  partialsDir: './views/components',
  extname: '.hbs',
  helpers: {
    listen: (input) => {
      return console.log(input)
    },
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
  .use(router)
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
