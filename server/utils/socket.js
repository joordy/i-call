const initSocketIO = (server) => {
  const io = require('socket.io')(server)
  io.on('connection', (socket) => {
    console.log('socket appeared')
    io.on('connection', (socket) => {
      socket.on('join-room', (room_ID, user_ID) => {
        socket.join(room_ID)
        socket.broadcast.to(room_ID).emit('user-connected', user_ID)
      })
    })
  })
}
module.exports = initSocketIO
