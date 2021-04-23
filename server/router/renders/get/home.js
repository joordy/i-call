// Home route function (GET)
const home = async (req, res, next) => {
  try {
    if (req.oidc.isAuthenticated() === false) {
      // When user isn't authenticated, load sign-in page
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
