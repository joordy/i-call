const fetch = require('node-fetch')

const fetcher = async (endpoint) => {
  const data = await fetch(endpoint)
  const response = await data.json()
  return response
}

module.exports = fetcher
