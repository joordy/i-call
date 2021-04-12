// Home route function
const home = async (req, res) => {
  try {
    res.render('home', {
      pageInf: {
        title: 'Rooms',
      },
    })
  } catch (err) {
    console.log(err)
  }
}

// Export route
module.exports = { home }
