const sharedSessions = require('express-socket.io-session')
const createMessage = require('./../controller/createMessage')
const getRandomCatFact = require('./../controller/returnCatFact')

const initSocketIO = (server, newSession) => {

  // Requires package of socket, and connect seperated server to it
  const io = require('socket.io')(server)

  // Create socket connection
  io.on('connection', (socket) => {
    // User object, 
    let userObj = {}

    // Use a session to work with the userName as params
    io.use(sharedSessions(newSession))

    // Join video-room
    socket.on('join-room', (obj) => {
      // Add information to User Object
      userObj.roomID = obj.room_ID
      userObj.peerID = obj.peer_ID

      // Join room ID 
      socket.join(obj.room_ID)

      // Add user to room, and send it to client-side
      io.in(obj.room_ID).emit('user-connected', obj.peer_ID)
    })

    // Sends message to client
    socket.on('message', async (obj) => {
      // Send message to specific room ID, so room A doesn't receive messages from room B
      io.to(obj.room_ID).emit('createMessage', createMessage(obj))

      // Check if message contains the word of cat facts
      if (obj.message.includes('catfact')) {
        // Fetch random cat fact
        const catFact = await getRandomCatFact()

        // Send message to client-side with catfact
        io.to(obj.room_ID).emit('createMessage', createMessage(catFact))
      }
    })

    // Disconnect user from room 
    socket.on('disconnecting', () => {
      // Disconnect the user, and send Peer ID to client, to remove specific call and video
      socket.broadcast.emit('userDisconnecting', userObj.peerID)
    })
  })
}

module.exports = initSocketIO
 