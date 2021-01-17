const { exec } = require('../../db/mysql')

function insertRecord (params) {
  const sql = `INSERT INTO t_daily VALUES ('${params.uuid}', '${params.ts_code}', ${params.trade_date}, ${params.open}, ${params.high}, ${params.low}, ${params.close}, ${params.pre_close}, ${params.change}, ${params.pct_chg}, ${params.vol}, ${params.amount});`
  return exec(sql)
}

function deleteRecord (date) {
  console.log('deleteSentiment')
}

function updateRecord (date) {
  console.log('updateSentiment')
}

async function selectRecord (startDate, endDate) {
  console.log(1)
}

module.exports = {
  insertRecord,
  deleteRecord,
  updateRecord,
  selectRecord
}
