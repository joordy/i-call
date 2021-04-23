// Invite route function (POST)
const invite = async (req, res) => {
  try {
    req.session.userName = req.body.userName
    req.session.save()
    
    res.render('rooms', {
      room: req.body.roomID,
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
module.exports = invite
