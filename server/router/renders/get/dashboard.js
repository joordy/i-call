const { v4: uuidV4 } = require('uuid')

// Dashboard route function (GET)
const dashboard = async (req, res) => {
  try {    
    res.render('dashboard', {
      roomIDS: uuidV4(), // Sends unique ID to form, to create vid-room
      user: req.oidc.user, // User object with information
      pageInf: {
        styles: 'dashboard.css',
        script: 'videoScript.js',
        title: 'iCall — Enter video call',
      },
    })
  } catch (err) {
    console.log(err)
  }
}

// Export route
module.exports = dashboard
