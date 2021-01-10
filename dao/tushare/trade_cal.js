const { exec } = require('../../db/mysql')

const insertRecord = (params) => {
  const sql = `INSERT INTO t_trade_cal VALUES ('${params.uuid}', '${params.calDate}', ${params.isOpen});`
  return exec(sql)
}

const deleteRecord = (date) => {
  console.log('deleteRecord')
}

const updateRecord = (date) => {
  console.log('updateRecord')
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
