const { exec } = require('../../db/mysql')

const selectPercentStatistics = async (date, query) => {
  const sql = `SELECT count(pct_chg) as num FROM t_daily WHERE trade_date = ${date} ${query}`
  return await exec(sql)
}

module.exports = {
  selectPercentStatistics
}
