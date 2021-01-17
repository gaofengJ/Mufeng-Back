const utils = require('../utils/index')
const { queryIsOpen } = require('../dao/tushare/trade_cal')
const { limitUNotLine } = require('../dao/tushare/limit_list')

async function dailyMarketAnalysis (date) {

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
  console.log(res.a, date)
  console.log(res.b, prevTradeDate)
  return

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
  dailyMarketAnalysis
}
