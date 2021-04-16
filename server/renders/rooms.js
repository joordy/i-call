const fetcher = require('../utils/fetch')

// Home route function
const rooms = async (req, res) => {
  try {
    const response = await fetcher('https://cat-fact.herokuapp.com/facts')
    console.log(response)
    const room = req.params.roomID
    req.session.userName = req.body.userName
    req.session.save()

    console.log(req.session)

    res.render('rooms', {
      room: room,
      userName: req.session.userName,
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
module.exports = rooms
