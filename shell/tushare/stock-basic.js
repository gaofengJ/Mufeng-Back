const { v4: uuidv4 } = require('uuid')
const { stockBasic } = require('../../tushare/stock-basic')
const { insertRecord } = require('../../dao/tushare/stock-basic')

let SucCount = 0
let errCount = 0

async function shellStockBasic (exchange) {
  const { code, data } = await stockBasic(exchange)
  if (code) return
  const { fields, items } = data

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
        SucCount++
        console.log(`已导入${SucCount}条数据 股票代码：${params.ts_code}`)
      } else {
        errCount++
        console.log(`已有${errCount}条数据导入失败：${params.ts_code}`)
      }
    } catch (e) {
      console.log('e', e)
    }
  }
}

;(async () => {
  await shellStockBasic('SSE')
  await shellStockBasic('SZSE')
})()

module.exports = {
  shellStockBasic
}
