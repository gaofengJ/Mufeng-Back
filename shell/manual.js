const utils = require('../utils/index')
const { queryIsOpen } = require('../dao/tushare/trade-cal')
const { shellDaily } = require('./tushare/daily')
const { shellDailyLimit } = require('./tushare/daily-limit')
const { shellLimitList } = require('./tushare/limit-list')
const { shellDailyMarketMood } = require('./tushare/daily-market-mood')

const dateArgv = process.argv[2] // node manual.js '2021-01-04'
if (!dateArgv) {
  console.log('请输入目标日期')
  return
}
let _date = new Date(dateArgv)
_date = utils._dateFormat(_date, 'yyyyMMdd')

async function tasks () {

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

tasks()