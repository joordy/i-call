// Home route function
const register = async (req, res) => {
  try {
    // console.log(uuidV4())
    res.redirect('/dashboard')
  } catch (err) {
    console.log(err)
  }
}

// Export route
module.exports = register
