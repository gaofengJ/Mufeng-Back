const schedule = require('node-schedule')
const utils = require('../utils/index')
const { queryIsOpen } = require('../dao/tushare/trade-cal')
const { shellDaily } = require('./tushare/daily')
const { shellDailyLimit } = require('./tushare/daily-limit')
const { shellLimitList } = require('./tushare/limit-list')
const { shellDailyMarketMood } = require('./tushare/daily-market-mood')

async function tasks () {

  const _date = utils._dateFormat(new Date(), 'yyyyMMdd')

  const isOpen = await queryIsOpen(_date)

  console.log(isOpen, typeof isOpen)
  return

  // 涨跌停价
  await shellDailyLimit(_date)

  // 获取日线行情
  await shellDaily(_date)

  // 涨跌停统计
  await shellLimitList(_date)

  // 短线情绪
  await shellDailyMarketMood(_date)

}

schedule.scheduleJob('0 0 19 * * 1-5', tasks())
