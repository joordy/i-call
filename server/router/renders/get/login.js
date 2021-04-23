// Home route function
const login = async (req, res) => {
  try {
    res.redirect('/dashboard')
    // res.render('login', {
    //   pageInf: {
    //     styles: 'form.css',
    //     title: `Log in — iCall`,
    //   },
    // })
  } catch (err) {
    console.log(err)
  }
}

// Export route
module.exports = login
