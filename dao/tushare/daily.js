const { exec } = require('../../db/mysql')

const insertRecord = (params) => {
  const sql = `INSERT INTO t_daily VALUES ('${params.uuid}', '${params.ts_code}', ${params.trade_date}, ${params.open}, ${params.high}, ${params.low}, ${params.close}, ${params.pre_close}, ${params.change}, ${params.pct_chg}, ${params.vol}, ${params.amount});`
  return exec(sql)
}

const deleteRecord = (date) => {
  console.log('deleteSentiment')
}

const updateRecord = (date) => {
  console.log('updateSentiment')
}

const selectRecord = async (startDate, endDate) => {
  console.log(1)
}

module.exports = {
  insertRecord,
  deleteRecord,
  updateRecord,
  selectRecord
}
