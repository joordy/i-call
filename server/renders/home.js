// Home route function
const home = async (req, res) => {
  try {
    tester()
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
