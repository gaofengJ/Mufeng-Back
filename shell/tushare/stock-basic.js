const { v4: uuidv4 } = require('uuid')
const { stockBasic } = require('../../tushare/stock-basic')
const { insertRecord } = require('../../dao/tushare/stock-basic')

async function shellStockBasic () {
  const { code, data } = await stockBasic()
  if (code) return
  const { fields, items } = data

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
      console.log(`已导入${SucCount}条数据`)
    } else {
      errCount++
      console.log(`已有${errCount}条数据导入失败`)
    }
  }
}

;(async () => {
  shellStockBasic()
})()

module.exports = shellStockBasic
