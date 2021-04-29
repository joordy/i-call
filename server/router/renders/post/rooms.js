// Rooms route function (POST)
const rooms = async (req, res) => {
  try {
    // Save username to session storage
    const room = req.body.roomID
    req.session.userName = req.body.userName
    req.session.save()

    // Render video-room page with session information
    res.render('rooms', {
      room: room,
      userName: req.session.userName,
      pageInf: {
        styles: 'rooms.css',
        script: 'videoScript.js',
        title: 'Rooms',
      },
    })
  } catch (err) {
    console.log(err)
  }
}

// Export route
module.exports = rooms
