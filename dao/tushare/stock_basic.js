const { exec } = require('../../db/mysql')

function insertRecord (params) {
  const sql = `INSERT INTO t_stock_basic VALUES ('${params.uuid}', '${params.ts_code}', '${params.symbol}', '${params.name}', '${params.area}', '${params.industry}', '${params.market}', '${params.list_date}')`
  return exec(sql)
}

async function queryNameByTsCode (tsCode) {
  const sql = `SELECT name FROM t_stock_basic WHERE ts_code = '${tsCode}'`
  const res = await exec(sql)
  return res[0]['name']
}

module.exports = {
  insertRecord,
  queryNameByTsCode
}
