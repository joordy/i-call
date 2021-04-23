const path = require('path')
const expressHandlebars = require('express-handlebars')

const hbs = expressHandlebars.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, '../views/layouts'),
  partialsDir: '../views/components',
  extname: '.hbs',
  helpers: {
    listen: (input) => {
      return console.log(input)
    },
  },
})

module.exports = hbs
