const { v4: uuidV4 } = require('uuid')

// Home route function
const rooms = async (req, res) => {
  try {
    const room = req.body.roomIDS
    res.render('rooms', {
      room: room,
      pageInf: {
        styles: 'rooms.css',
        script: 'videoScript.js',
        sockets: '/socket.io/socket.io.js',
        title: 'Rooms',
      },
    })
  } catch (err) {
    console.log(err)
  }
}

// Export route
module.exports = { rooms }
