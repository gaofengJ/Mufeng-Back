const utils = require('../utils/index')
const { queryIsOpen } = require('../dao/tushare/trade-cal')
const {
  limitUNotLine,
  limitUNotLineAndOpenHigh,
  limitUNotLineAndUp,
  hasLimited
} = require('../dao/tushare/limit-list')

async function dailyMarketMood (date) {

  const prevTradeDate = await getPrevDate(date)

  let res = { // 短线情绪指标，以2020年7月7日为例
    a: '', // 2020年7月7日涨停，非一字涨停，非ST
    b: '', // 2020年7月6日涨停，非一字涨停，非ST
    c: '', // 2020年7月6日涨停，非一字涨停，非ST，2020年7月7日高开
    d: '', // 2020年7月6日涨停，非一字涨停，非ST，2020年7月7日上涨
    e: '', // 2020年7月7日曾涨停，非ST
    sentimentA: '', // 非一字涨停 sentimentA = a
    sentimentB: '', // 打板高开率 sentimentB = c / b
    sentimentC: '', // 打板成功率 sentimentC = d / b
    sentimentD: '', // 打板被砸率 sentimentD = e / (a + e)
  }

  res.a = await limitUNotLine(date)
  res.b = await limitUNotLine(prevTradeDate)
  res.c = await limitUNotLineAndOpenHigh(date, prevTradeDate)
  res.d = await limitUNotLineAndUp(date, prevTradeDate)
  res.e = await hasLimited(date) // 由于无法准确获取曾涨停数据，e的数量会偏大
  res.sentimentA = res.a
  res.sentimentB = Math.floor(res.c / res.b * 100)
  res.sentimentC = Math.floor(res.d / res.b * 100)
  res.sentimentD = Math.floor(res.e / (res.a + res.e) * 100)

  return res
}

/**
 * 获取前一个交易日
 */
async function getPrevDate (date) {
  let prevTradeDate = date
  let isOpen = 0
  while (!isOpen) {
    prevTradeDate = utils._dateFormat(utils._getBeforeDay(new Date(`${prevTradeDate.slice(0, 4)}-${prevTradeDate.slice(4, 6)}-${prevTradeDate.slice(6, 8)}`)), 'yyyyMMdd')
    isOpen = await queryIsOpen(prevTradeDate)
  }
  return prevTradeDate
}


module.exports = {
  dailyMarketMood
}
