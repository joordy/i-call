// // const server = require('http').Server(app)
// // const io = require('socket.io')(server)

// // const initSocketIO = (server) => {
// //   const io = require('socket.io')(server)

// //   io.on('connection', (socket) => {
// //     socket.on('join-room', (roomID, userID) => {
// //       console.log('socket:', roomID, userID)
// //     })
// //   })
// // }

const initSocketIO = (server) => {
  const io = require('socket.io')(server)

  io.on('connection', (socket) => {
    console.log('socket appeared')
    socket.on('join-room', (roomID, userId) => {
      console.log(`you've joined the room`)
      socket.join(roomID)
      socket.broadcast.emit('user-connected', userId)
    })
  })
}
module.exports = initSocketIO
