// Home route function
const home = async (req, res) => {
  try {
    // console.log(uuidV4())
    res.redirect('/dashboard')
  } catch (err) {
    console.log(err)
  }
}

// Export route
module.exports = home
