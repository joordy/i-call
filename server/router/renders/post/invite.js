// Invite route function (POST)
const invite = async (req, res) => {
  try {
    // Save username to session storage
    req.session.userName = req.body.userName
    req.session.save()
    
    // Render video-room page with session information
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
