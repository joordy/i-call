// Home route function
const register = async (req, res) => {
  try {
    // res.redirect('/dashboard')
    res.render('register', {
      pageInf: {
        styles: 'form.css',
        title: `Register — iCall`,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

// Export route
module.exports = register
