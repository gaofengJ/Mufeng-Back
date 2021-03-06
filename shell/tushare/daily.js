const { v4: uuidv4 } = require('uuid')
const utils = require('../../utils/index')
const { daily } = require('../../tushare/daily')
const { insertRecord } = require('../../dao/tushare/daily')
const { queryNameByTsCode } = require('../../dao/tushare/stock-basic')

const dateArgv = process.argv[2] // node daily.js '2021-01-04'
let _date = dateArgv ? new Date(dateArgv) : new Date() // 如果命令行中没有加日期，就使用当天日期
_date = utils._dateFormat(_date, 'yyyyMMdd')

async function shellDaily (date) {
  _date = date || _date // 方便批量操作 批量操作时，每次传入一个date
  const { code, data } = await daily(_date)
  if (code) return
  const { fields, items } = data // fields和items都为Object，并且不是类数组 [ 'ts_code', 'trade_date', 'open', 'high', 'low', 'close', 'pre_close', 'change', 'pct_chg', 'vol', 'amount' ] 'object'
  let sucCount = 0
  let errCount = 0
  if (!items[0]) return // 如果没有数据就返回
  for (const itemIdx in items) {
    const params = {}
    params.uuid = uuidv4()
    for (const fieldIdx in fields) {
      params[fields[fieldIdx]] = items[itemIdx][fieldIdx]
    }
    params.name = await queryNameByTsCode(params.ts_code)
    try {
      const res = await insertRecord(params)
      if (res.affectedRows === 1) {
        sucCount++
        console.log(`daily ${_date}已导入${sucCount}条数据 股票代码：${params.ts_code}`)
      } else {
        errCount++
        console.log(`daily ${_date}已有${errCount}条数据导入失败 股票代码：${params.ts_code}`)
      }
    } catch (e) {
      console.log('e', e)
    }
  }
}

// ;(async () => {
//   shellDaily()
// })()

module.exports = {
  shellDaily
}
