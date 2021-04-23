// 404 route function
const notFound = async (req, res) => {
  try {
    res.status(404).render('404', { title: '404 Not Found' })
  } catch (err) {
    console.log(err)
  }
}

// Export route
module.exports = notFound
