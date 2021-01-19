const { exec } = require('../../db/mysql')

function insertRecord (params) {
  const sql = `INSERT INTO t_limit_list VALUES ('${params.uuid}', '${params.trade_date}', '${params.ts_code}', '${params.name}', '${params.close}', '${params.pct_chg}', '${params.amp}', '${params.fc_ratio}', '${params.fl_ratio}', '${params.fd_amount}', '${params.first_time}', '${params.last_time}', '${params.open_times}', '${params.strth}', '${params.limit}');`
  return exec(sql)
}

/**
 * 非一字涨停
 */
async function limitUNotLine (tradeDate) {
  const sql = `SELECT count(ts_code) as count FROM t_limit_list WHERE t_limit_list.trade_date = '${tradeDate}' AND locate('ST', t_limit_list.name) = 0 AND locate('N', t_limit_list.name) = 0 AND t_limit_list.amp > 0.001 AND t_limit_list.limit = 'U';`
  let res = await exec(sql)
  return res[0]['count']
}

/**
 * 前一天非一字涨停，且当天高开
 */
async function limitUNotLineAndOpenHigh (tradeDate, prevTradeDate) {
  const sql = `SELECT count(t_limit_list.ts_code) as count FROM t_limit_list, t_daily WHERE t_limit_list.trade_date = '${prevTradeDate}' AND locate('ST', t_limit_list.name) = 0 AND locate('N', t_limit_list.name) = 0 AND t_limit_list.amp > 0.001 AND t_limit_list.limit = 'U' AND t_daily.trade_date = '${tradeDate}' AND t_daily.open > t_daily.pre_close AND t_limit_list.ts_code = t_daily.ts_code;`
  const res = await exec(sql)
  return res[0]['count']
}

/**
 * 前一天非一字涨停，且当天上涨
 */
async function limitUNotLineAndUp (tradeDate, prevTradeDate) {
  const sql = `SELECT count(t_limit_list.ts_code) as count FROM t_limit_list, t_daily WHERE t_limit_list.trade_date = '${prevTradeDate}' AND locate('ST', t_limit_list.name) = 0 AND locate('N', t_limit_list.name) = 0 AND t_limit_list.amp > 0.001 AND t_limit_list.limit = 'U' AND t_daily.trade_date = '${tradeDate}' AND t_daily.pct_chg > 0 AND t_limit_list.ts_code = t_daily.ts_code;`
  const res = await exec(sql)
  return res[0]['count']
}

/**
 * 当天曾涨停
 */
async function hasLimited (date) {
  const sql = `SELECT count(t_daily.ts_code) as count FROM t_daily, t_daily_limit, t_stock_basic WHERE t_daily.trade_date = '${date}' AND t_daily_limit.trade_date = '${date}' AND t_daily.high <> t_daily.close AND t_daily.high = t_daily_limit.up_limit AND locate('ST', t_stock_basic.name) = 0 AND locate('N', t_stock_basic.name) = 0 AND t_daily.ts_code = t_daily_limit.ts_code = t_stock_basic.ts_code;`
  console.log('sql', sql)
  const res = await exec(sql)
  return res[0]['count']
}

module.exports = {
  insertRecord,
  limitUNotLine,
  limitUNotLineAndOpenHigh,
  limitUNotLineAndUp,
  hasLimited
}
