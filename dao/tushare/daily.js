const { exec } = require('../../db/mysql')

function insertRecord (params) {
  const sql = `INSERT INTO t_daily VALUES ('${params.uuid}', '${params.ts_code}', '${params.name}', ${params.trade_date}, ${params.open}, ${params.high}, ${params.low}, ${params.close}, ${params.pre_close}, ${params.change}, ${params.pct_chg}, ${params.vol}, ${params.amount});`
  return exec(sql)
}

function deleteRecord (date) {
  console.log('deleteSentiment')
}

function updateRecord (date) {
  console.log('updateSentiment')
}

async function selectRecord (startDate, endDate) {
  console.log(1)
}

async function selectUp (date) {
  const sql = `SELECT count('ts_code') as up FROM t_daily WHERE t_daily.trade_date = ${date} AND t_daily.pct_chg > 0;`
  const res = await exec(sql)
  return res[0]['up']
}

async function selectDown (date) {
  const sql = `SELECT count('ts_code') as down FROM t_daily WHERE t_daily.trade_date = ${date} AND t_daily.pct_chg < 0;`
  const res = await exec(sql)
  return res[0]['down']
}

async function selectZero (date) {
  const sql = `SELECT count('ts_code') as zero FROM t_daily WHERE t_daily.trade_date = ${date} AND t_daily.pct_chg = 0;`
  const res = await exec(sql)
  return res[0]['zero']
}

module.exports = {
  insertRecord,
  deleteRecord,
  updateRecord,
  selectRecord,
  selectUp,
  selectDown,
  selectZero
}
