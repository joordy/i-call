const isUserLoggedIn = (req, res, next) => {
  console.log('this is achieved')
  if (req.session.userName != undefined) {
    return next()
  }
  res.redirect('/')
}

module.exports = isUserLoggedIn
