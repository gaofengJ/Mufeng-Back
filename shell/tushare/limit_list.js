const { v4: uuidv4 } = require('uuid')
const utils = require('../../utils/index')
const { limitList } = require('../../tushare/limit_list')
const { insertRecord } = require('../../dao/tushare/limit_list')

const dateArgv = process.argv[2] // node limit_list.js '2021-01-04'

let _date = dateArgv ? new Date(dateArgv) : new Date() // 如果命令行中没有加日期，就使用当天日期
_date = utils._dateFormat(_date, 'yyyyMMdd')

async function shellLimitList (date) {
  _date = date || _date // 方便批量操作 批量操作时，每次传入一个date
  const { code, data } = await limitList(_date)
  if (code) return

  const { fields, items } = data // fields和items都为Object，并且不是类数组 [ 'trade_date', 'ts_code', 'name', 'close', 'pct_chg', 'amp', 'fc_ratio', 'fl_ratio', 'fd_amount', 'first_time', 'last_time', 'open_times', 'strth', 'limit' ] 'object'
  if (!items[0]) return // 如果没有数据就返回

  for (const itemIdx in items) {
    const params = {}
    params.uuid = uuidv4()
    params.trade_date = items[itemIdx][0]
    params.ts_code = items[itemIdx][1]
    params.name = items[itemIdx][2]
    params.close = items[itemIdx][3]
    params.pct_chg = items[itemIdx][4]
    params.amp = items[itemIdx][5]
    params.fc_ratio = items[itemIdx][6]
    params.fl_ratio = items[itemIdx][7]
    params.fd_amount = items[itemIdx][8]
    params.first_time = items[itemIdx][9]
    params.last_time = items[itemIdx][10]
    params.open_times = items[itemIdx][11]
    params.strth = items[itemIdx][12]
    params.limit = items[itemIdx][13]

    await insertRecord(params)
    console.log(`${_date} ${params.name}涨跌停数据导入完毕`)
  }
}

;(async () => {
  shellLimitList()
})()

module.exports = shellLimitList
