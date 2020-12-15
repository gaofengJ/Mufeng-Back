const { v4: uuidv4 } = require('uuid')
const MarketSentiment = require('../crawl/market-sentiment')
const { insertSentiment } = require('../dao/market-analysis')

const dateArgv = process.argv[2] // 获取命令行参数 node demo.js arg1 arg2

async function marketSentimentCrawl () {
  try {
    // const date = new Date()
    const date = dateArgv ? new Date(dateArgv) : new Date() // 如果命令行中没有加日期，就使用当天日期
    const marketSentiment = new MarketSentiment(date)
    const res = await marketSentiment.crawl()
    const uuid = uuidv4()
    const params = Object.assign(res, {
      uuid,
      date: +date.getTime()
    })
    console.log(params)
    const insertRes = await insertSentiment(params)
    console.log('insertRes:', insertRes)
  } catch (e) {
    console.log(e)
  } finally {

  }
}

marketSentimentCrawl()
