const fetcher = require('./../models/fetch')

const getRandomCatFacts = async () => {
  const response = await fetcher('https://cat-fact.herokuapp.com/facts')
  return response
}

module.exports = getRandomCatFacts
