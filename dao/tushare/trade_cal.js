const { exec } = require('../../db/mysql')

function insertRecord (params) {
  const sql = `INSERT INTO t_trade_cal VALUES ('${params.uuid}', '${params.calDate}', ${params.isOpen});`
  return exec(sql)
}

async function queryIsOpen(cal_date) {
  const sql = `SELECT t_trade_cal.is_open FROM t_trade_cal WHERE t_trade_cal.cal_date = '${cal_date}';`
  const res = await exec(sql)
  return res[0]['is_open']
}

module.exports = {
  insertRecord,
  queryIsOpen
}
