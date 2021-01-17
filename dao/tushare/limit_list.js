const { exec } = require('../../db/mysql')

const insertRecord = (params) => {
  const sql = `INSERT INTO t_limit_list VALUES ('${params.uuid}', '${params.trade_date}', '${params.ts_code}', '${params.name}', '${params.close}', '${params.pct_chg}', '${params.amp}', '${params.fc_ratio}', '${params.fl_ratio}', '${params.fd_amount}', '${params.first_time}', '${params.last_time}', '${params.open_times}', '${params.strth}', '${params.limit}');`
  return exec(sql)
}

module.exports = {
  insertRecord
}
