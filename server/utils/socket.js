const moment = require('moment')
const sharedSessions = require('express-socket.io-session')
const fetcher = require('../utils/fetch')

const initSocketIO = (server, newSession) => {
  const io = require('socket.io')(server)

  io.on('connection', (socket) => {
    let userObj = {}
    // Use a session to work with the userName as params
    io.use(sharedSessions(newSession))

    // Join video-room,
    socket.on('join-room', (obj) => {
      userObj.roomID = obj.room_ID
      userObj.peerID = obj.peer_ID
      console.log(obj)
      console.log('user connected')
      socket.join(obj.room_ID)
      io.in(obj.room_ID).emit('user-connected', obj.peer_ID)
      // socket.broadcast.to(obj.room_ID).emit('user-connected', obj.peer_ID)
    })

    // Sends message to client
    socket.on('message', async (obj) => {
      // Send message to specific room ID, so room A doesn't receive messages from room B
      io.to(obj.room_ID).emit('createMessage', createMessage(obj))

      // If a message contains the word 'CatFact', the room will receive a randomized cat fact
      if (obj.message.includes('catfact')) {
        const catFact = await getRandomCatFact()
        io.to(obj.room_ID).emit('createMessage', createMessage(catFact))
      }
    })

    socket.on('disconnecting', () => {
      console.log(userObj.peerID)
      console.log('disconnected joejoe')
      socket.broadcast.emit('userDisconnecting', userObj.peerID)
    })
  })
}

// Formats time for the messages with the moment NPM package
function createMessage(text) {
  return {
    text,
    time: moment().format('h:mm a'),
  }
}

// Function to format a random cat fact. The response will give 5 popular cat-facts
// for the day, and the NUM variable takes a randomized option from the array list.
async function getRandomCatFact() {
  const response = await fetcher('https://cat-fact.herokuapp.com/facts')
  const num = Math.floor(Math.random() * 5) + 1
  console.log(response[num])
  console.log(num)
  const catFact = {
    message: `${response[num].text}`,
    user: 'CatFacts',
  }
  return catFact
}

module.exports = initSocketIO
