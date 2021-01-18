const { v4: uuidv4 } = require('uuid')
const utils = require('../../utils/index')
const { dailyMarketAnalysis } = require('../../tushare/daily_market_analysis')
const { insertRecord } = require('../../dao/tushare/daily')

const dateArgv = process.argv[2] // node daily_market_analysis.js '2021-01-04'
let _date = dateArgv ? new Date(dateArgv) : new Date() // 如果命令行中没有加日期，就使用当天日期
_date = utils._dateFormat(_date, 'yyyyMMdd')

async function shellDaily (date) {
  _date = date || _date // 方便批量操作 批量操作时，每次传入一个date
  const { code, data } = await dailyMarketAnalysis(_date)
  if (code) return
  const { fields, items } = data // fields和items都为Object，并且不是类数组 [ 'ts_code', 'trade_date', 'open', 'high', 'low', 'close', 'pre_close', 'change', 'pct_chg', 'vol', 'amount' ] 'object'
  let SucCount = 0
  let errCount = 0
  if (!items[0]) return // 如果没有数据就返回
  for (const itemIdx in items) {
    const params = {}
    params.uuid = uuidv4()
    for (const fieldIdx in fields) {
      params[fields[fieldIdx]] = items[itemIdx][fieldIdx]
    }
    const res = await insertRecord(params)
    if (res.affectedRows === 1) {
      SucCount++
      console.log(`${_date}已导入${SucCount}条数据`)
    } else {
      errCount++
      console.log(`${_date}已有${errCount}条数据导入失败`)
    }
  }
}

;(async () => {
  shellDaily()
})()

module.exports = shellDaily
