// Import packages
const { v4: uuidV4 } = require('uuid')

// Dashboard route function (GET)
const dashboard = async (req, res) => {
  try {    
    // Render dashboard page with Unique ID and User Object
    res.render('dashboard', {
      roomIDS: uuidV4(),
      user: req.oidc.user, 
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
