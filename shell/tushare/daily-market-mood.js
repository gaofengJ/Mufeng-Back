const { v4: uuidv4 } = require('uuid')
const utils = require('../../utils/index')
const { dailyMarketAnalysis } = require('../../tushare/daily-market-mood')
const { insertRecord } = require('../../dao/market-analysis/market-mood')

const dateArgv = process.argv[2] // node daily_market_analysis.js '2021-01-04'
let _date = dateArgv ? new Date(dateArgv) : new Date() // 如果命令行中没有加日期，就使用当天日期
_date = utils._dateFormat(_date, 'yyyyMMdd')

async function shellDailyMarketMood (date) {
  _date = date || _date // 方便批量操作 批量操作时，每次传入一个date
  const data = await dailyMarketAnalysis(_date)

  const uuid = uuidv4()
  const params = Object.assign(data, {
    uuid,
    date: _date
  })

  try {
    const res = await insertRecord(params)
    if (res.affectedRows === 1) {
      console.log(`daily-market-mood ${_date}导入成功`)
    } else {
      console.log(`daily-market-mood ${_date}导入失败`)
    }
  } catch (e) {
    console.log('e', e)
  }
}

// ;(async () => {
//   shellDailyMarketMood()
// })()

module.exports = {
  shellDailyMarketMood
}
