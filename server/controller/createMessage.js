const moment = require('moment')

const createMessage = (text) => {
  return {
    text,
    time: moment().format('h:mm a'),
  }
}

module.exports = createMessage
