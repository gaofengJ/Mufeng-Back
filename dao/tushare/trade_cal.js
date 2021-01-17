const { exec } = require('../../db/mysql')

const insertRecord = (params) => {
  const sql = `INSERT INTO t_trade_cal VALUES ('${params.uuid}', '${params.calDate}', ${params.isOpen});`
  return exec(sql)
}

module.exports = {
  insertRecord
}
