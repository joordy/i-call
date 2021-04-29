// Import packages
const { v4: uuidV4 } = require('uuid')

// Dashboard route function (GET)
const callEnded = async (req, res) => {
  try {    
    // Render dashboard page with Unique ID and User Object
    console.log(req.oidc.user)
    res.render('callEnded', {
      roomIDS: uuidV4(),
      user: req.oidc.user, 
      pageInf: {
        styles: 'callended.css',
        title: 'Call ended — iCall',
      },
    })
  } catch (err) {
    console.log(err)
  }
}

// Export route
module.exports = callEnded
