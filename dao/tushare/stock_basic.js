const { exec } = require('../../db/mysql')

const insertRecord = (params) => {
  const sql = `INSERT INTO t_stock_basic VALUES ('${params.uuid}', '${params.ts_code}', '${params.symbol}', '${params.name}', '${params.area}', '${params.industry}', '${params.market}', '${params.list_date}')`
  return exec(sql)
}

module.exports = {
  insertRecord
}
