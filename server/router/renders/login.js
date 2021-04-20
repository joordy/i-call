// Home route function
const login = async (req, res) => {
  try {
    // console.log(uuidV4())
    res.redirect('/dashboard')
  } catch (err) {
    console.log(err)
  }
}

// Export route
module.exports = login
