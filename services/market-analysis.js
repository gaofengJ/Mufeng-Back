const utils = require('../utils/index')
const {
  insertSentiment,
  deleteSentiment,
  updateSentiment,
  selectSentiment
} = require('../dao/market-analysis')

const getMarketSentiment = async (startDate, endDate) => {
  startDate = new Date(`${startDate} 00:00:00`) // 取当天0点
  endDate = new Date(`${endDate} 23:59:59`) // 取当天最晚点
  const list = await selectSentiment(startDate, endDate)
  return list
}

module.exports = {
  getMarketSentiment
}
