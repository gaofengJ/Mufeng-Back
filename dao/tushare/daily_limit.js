const { exec } = require('../../db/mysql')

function insertRecord (params) {
  const sql = `INSERT INTO t_daily_limit VALUES ('${params.uuid}', ${params.trade_date}, '${params.ts_code}', ${params.up_limit}, ${params.down_limit});`
  return exec(sql)
}

module.exports = {
  insertRecord
}
