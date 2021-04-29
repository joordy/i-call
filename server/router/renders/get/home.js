// Home route function (GET)
const home = async (req, res, next) => {
  try {
    // Check if user is authenticated
    if (!req.oidc.isAuthenticated()) {
      // Render login page when isn't authenticated
      res.render('home', {
        pageInf: {
          styles: 'home.css',
          title: ` That's what iCall intuitive — iCall`,
        },
      })
    } else {
      // When authenticated, redirect to dashboard
      res.redirect('/dashboard')
    }
  } catch (err) {
    console.log(err)
  }
}

// Export route
module.exports = home
