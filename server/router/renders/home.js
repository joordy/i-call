// Home route function
const home = async (req, res) => {
  try {
    // console.log(uuidV4())
    res.render('home', {
      pageInf: {
        styles: 'home.css',
        // script: 'videoScript.js',
        title: ` That's what iCall intuitive — iCall`,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

// Export route
module.exports = home
