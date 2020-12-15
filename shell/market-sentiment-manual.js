const { v4: uuidv4 } = require('uuid')
const { insertSentiment } = require('../dao/market-analysis')

async function marketSentimentManual () {
  try {
    const uuid = uuidv4()
    const params = {
      uuid,
      date: +(new Date('2020-12-10')).getTime(),
      a: 26,
      b: 28,
      c: 15,
      d: 14,
      e: 22,
      sentimentA: 26,
      sentimentB: 53,
      sentimentC: 50,
      sentimentD: 46
    }
    console.log(params)
    const insertRes = await insertSentiment(params)
    console.log('insertRes:', insertRes)
  } catch (e) {
    console.log(e)
  } finally {

  }
}

marketSentimentManual()