const fetcher = require('./../models/fetch')

const getRandomCatFact = async () => {
  const response = await fetcher('https://cat-fact.herokuapp.com/facts')
  const num = Math.floor(Math.random() * 5) + 1
  console.log(response[num])
  console.log(num)
  const catFact = {
    message: `${response[num].text}`,
    user: 'CatFacts',
  }
  return catFact
}

module.exports = getRandomCatFact