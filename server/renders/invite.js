// Home route function
const invite = async (req, res) => {
  try {
    console.log('invite.js')
    req.session.userName = req.body.userName
    req.session.save()
    console.log('req.body from invite.js', req.body)

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
