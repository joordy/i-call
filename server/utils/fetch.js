const fetch = require('node-fetch')
// const { filterData } = require('./filters')

const fetcher = async (endpoint) => {
  const data = await fetch(endpoint)
  const response = await data.json()
  // const filteredItems = await filterData(response)
  return response
}

module.exports = fetcher
