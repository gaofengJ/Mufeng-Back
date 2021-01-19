const { v4: uuidv4 } = require('uuid')
const { tradeCal } = require('../../tushare/trade-cal')
const { insertRecord } = require('../../dao/tushare/trade-cal')

const yearArgv = process.argv[2] // node daily.js '2021'
let _year = yearArgv || (new Date()).getFullYear() // 如果命令行中没有加年份，默认选中当年

async function shellDaily (year) {
  _year = year || _year // 方便批量操作 批量操作时，每次传入一个year
  const { code, data } = await tradeCal(_year)
  if (code) return
  const { fields, items } = data

  let sucCount = 0
  let errCount = 0
  if (!items[0]) return // 如果没有数据就返回
  
  for (const itemIdx in items) {
    const params = {}
    params.uuid = uuidv4()
    params.calDate = items[itemIdx][1]
    params.isOpen = items[itemIdx][2]
    const res = await insertRecord(params)
    if (res.affectedRows === 1) {
      sucCount++
      console.log(`${_year}已导入${sucCount}条数据 日期：${params.calDate}`)
    } else {
      errCount++
      console.log(`${_year}已有${errCount}条数据导入失败 日期：${params.calDate}`)
    }
  }
}

;(async () => {
  shellDaily()
})()

module.exports = shellDaily
