const schedule = require('node-schedule')
const utils = require('../utils/index')
const { shellDaily } = require('./tushare/daily')
const { shellDailyLimit } = require('./tushare/daily-limit')
const { shellLimitList } = require('./tushare/limit-list')
const { shellDailyMarketMood } = require('./tushare/daily-market-mood')

function tasks () {

  // 涨跌停价
  schedule.scheduleJob('0 0 17 * * 1-5', task(shellDailyLimit))

  // 获取日线行情
  schedule.scheduleJob('0 0 18 * * 1-5', task(shellDaily))

  // 涨跌停统计
  schedule.scheduleJob('0 0 19 * * 1-5', task(shellLimitList))

  // 短线情绪
  schedule.scheduleJob('0 30 19 * * 1-5', task(shellDailyMarketMood))

}

function task (fn) {
  const date = utils._dateFormat(new Date(), 'yyyyMMdd')
  fn(date)
}

tasks()