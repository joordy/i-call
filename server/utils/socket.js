// const server = require('http').Server(app)
// const io = require('socket.io')(server)

// const initSocketIO = (server) => {
//   const io = require('socket.io')(server)

//   io.on('connection', (socket) => {
//     socket.on('join-room', (roomID, userID) => {
//       console.log('socket:', roomID, userID)
//     })
//   })
// }

const initSocketIO = (server) => {
  const io = require('socket.io')(server)
  console.log(io)
}
module.exports = {
  initSocketIO,
}
