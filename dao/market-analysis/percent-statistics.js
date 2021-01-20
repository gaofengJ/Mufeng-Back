const { exec } = require('../../db/mysql')

async function selectPercentStatistics (date, query) {
  const sql = `SELECT count(pct_chg) as num FROM t_daily WHERE trade_date = ${date} ${query}`
  const res = await exec(sql)
  return res[0]['num']
}

module.exports = {
  selectPercentStatistics
}
