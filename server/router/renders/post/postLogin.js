// postRegister route function
const postLogin = async (req, res) => {
  try {
    // const room = req.body.roomID
    // req.session.userName = req.body.userName
    // req.session.save()

    // res.render('rooms', {
    //   room: room,
    //   userName: req.session.userName,
    //   pageInf: {
    //     styles: 'rooms.css',
    //     script: 'videoScript.js',
    //     title: 'Rooms',
    //   },
    // })
    console.log(req.body)
    res.redirect('/dashboard')
  } catch (err) {
    console.log(err)
  }
}

// Export route
module.exports = postLogin
