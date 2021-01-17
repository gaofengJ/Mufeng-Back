const { v4: uuidv4 } = require('uuid')
const utils = require('../../utils/index')
const { stockBasic } = require('../../tushare/stock_basic')
const { insertRecord } = require('../../dao/tushare/stock_basic')

async function shellStockBasic () {
  const { code, data } = await stockBasic()
  if (code) return
  const { fields, items } = data
  if (!items[0]) return // 如果没有数据就返回
  for (const itemIdx in items) {
    const params = {}
    params.uuid = uuidv4()
    params.ts_code = items[itemIdx][0]
    params.symbol = items[itemIdx][1]
    params.name = items[itemIdx][2]
    params.area = items[itemIdx][3]
    params.industry = items[itemIdx][4]
    params.market = items[itemIdx][5]
    params.list_date = items[itemIdx][6]
    const res = await insertRecord(params)
    if (!res) {
      console.log(`已导入${params.symbol}基础信息`)
    } else {
      console.log(`${params.symbol}基础信息导入失败`)
    }
  }
}

;(async () => {
  shellStockBasic()
})()

module.exports = shellStockBasic
