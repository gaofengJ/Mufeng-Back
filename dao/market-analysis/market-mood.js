const { exec } = require('../../db/mysql')

function insertRecord (params) {
  const sql = `INSERT INTO t_market_mood (id, date, a, b, c, d, e, sentiment_a, sentiment_b, sentiment_c, sentiment_d) VALUES ('${params.uuid}', ${params.date}, ${params.a}, ${params.b}, ${params.c}, ${params.d}, ${params.e}, ${params.sentimentA}, ${params.sentimentB}, ${params.sentimentC}, ${params.sentimentD});`
  return exec(sql)
}

function deleteSentiment (date) {
  console.log('deleteSentiment')
}

function updateSentiment (date) {
  console.log('updateSentiment')
}

async function selectSentiment (startDate, endDate) {
  const sql = `SELECT * FROM t_market_mood WHERE date >= ${startDate} and date <= ${endDate} order by date;`
  return await exec(sql)
}

module.exports = {
  insertRecord,
  deleteSentiment,
  updateSentiment,
  selectSentiment
}
