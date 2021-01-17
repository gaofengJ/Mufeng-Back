const { exec } = require('../../db/mysql')

function insertRecord (params) {
  const sql = `INSERT INTO t_limit_list VALUES ('${params.uuid}', '${params.trade_date}', '${params.ts_code}', '${params.name}', '${params.close}', '${params.pct_chg}', '${params.amp}', '${params.fc_ratio}', '${params.fl_ratio}', '${params.fd_amount}', '${params.first_time}', '${params.last_time}', '${params.open_times}', '${params.strth}', '${params.limit}');`
  return exec(sql)
}

// 查看非一字涨停数量
async function limitUNotLine (trade_date) {
  const sql = `SELECT count(ts_code) as count FROM t_limit_list WHERE t_limit_list.trade_date = '${trade_date}' AND locate('ST', t_limit_list.name) = 0 AND locate('N', t_limit_list.name) = 0 AND t_limit_list.amp > 0.001 AND t_limit_list.limit = 'U';`
  let res = await exec(sql)
  return res[0]['count']
}

module.exports = {
  insertRecord,
  limitUNotLine
}
