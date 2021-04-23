// Rooms route function (POST)
const rooms = async (req, res) => {
  try {
    console.log(req.body)
    console.log(req.session)
    const room = req.body.roomID
    req.session.userName = req.body.userName
    req.session.save()

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
