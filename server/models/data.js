const getRandomCatFacts = require('./../controller/returnCatFact')

const chatModel = async () => {
  const response = await getRandomCatFacts()
  const num = Math.floor(Math.random() * 5) + 1
  let catFact

  if (!response[num]) {
    return (catFact = {
      message: `${response[1].text}`,
      user: 'Cat',
    })
  } else {
    catFact = {
      message: `${response[num].text}`,
      user: 'Cat',
    }
  }
  return catFact
}

module.exports = chatModel
