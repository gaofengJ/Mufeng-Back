const { v4: uuidv4 } = require('uuid')
const utils = require('../../utils/index')
const { dailyLimit } = require('../../tushare/daily-limit')
const { insertRecord } = require('../../dao/tushare/daily-limit')

const dateArgv = process.argv[2] // node daily_limit.js '2021-01-04'
let _date = dateArgv ? new Date(dateArgv) : new Date() // 如果命令行中没有加日期，就使用当天日期
_date = utils._dateFormat(_date, 'yyyyMMdd')

async function shellDailyLimit (date) {
  _date = date || _date // 方便批量操作 批量操作时，每次传入一个date
  const { code, data } = await dailyLimit(_date)
  if (code) return
  const { fields, items } = data // fields和items都为Object，并且不是类数组 [ 'trade_date', 'ts_code', 'up_limit', 'down_limit' ] 'object'
  let sucCount = 0
  let errCount = 0
  if (!items[0]) return // 如果没有数据就返回
  for (const itemIdx in items) {
    const params = {}
    params.uuid = uuidv4()
    for (const fieldIdx in fields) {
      params[fields[fieldIdx]] = items[itemIdx][fieldIdx]
    }
    try {
      const res = await insertRecord(params)
      if (res.affectedRows === 1) {
        sucCount++
        console.log(`daily-limit ${_date}已导入${sucCount}条数据 股票代码：${params.ts_code}`)
      } else {
        errCount++
        console.log(`daily-limit ${_date}已有${errCount}条数据导入失败 股票代码：${params.ts_code}`)
      }
    } catch (e) {
      console.log('e', e)
    }
  }
}

// ;(async () => {
//   shellDailyLimit()
// })()

module.exports = {
  shellDailyLimit
}
