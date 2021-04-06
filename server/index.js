// Imports and handlebars setup
const express = require('express');
const app = express();
const path = require('path');
const expressHandlebars = require('express-handlebars');
const router = require('./router/routes');
const templates = path.join(__dirname, './views');
const port = process.env.PORT || 3333;
const hbs = expressHandlebars.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, './views/layouts'),
  partialsDir: './views/components',
  extname: '.hbs',
  helpers: {
    listen: (input) => {
      return console.log(input);
    },
  },
});

app
  .enable('trust proxy')
  .engine('.hbs', hbs.engine)
  .set('view engine', '.hbs')
  .set('views', templates)
  .use(express.static('public'))
  .use(router)
  .use((request, response, next) => {
    if (process.env.NODE_ENV != 'development' && !request.secure) {
      return response.redirect('https://' + request.headers.host + request.url);
    }
    next();
  });

// Launch application
app.listen(port, function () {
  console.log(`App can be opened on http://localhost:${port}`);
});
