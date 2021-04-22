const { v4: uuidV4 } = require('uuid')

// Home route function
const home = async (req, res) => {
  try {
    // console.log(uuidV4())
    res.render('home', {
      roomIDS: uuidV4(),
      pageInf: {
        styles: 'home.css',
        script: 'videoScript.js',
        title: 'iCall — Videocalls',
      },
    })
  } catch (err) {
    console.log(err)
  }
}

// Export route
module.exports = home
