const { exec } = require('../../db/mysql')

function insertSentiment (params) {
  const sql = `INSERT INTO t_market_sentiment (id, date, a, b, c, d, e, sentiment_a, sentiment_b, sentiment_c, sentiment_d) VALUES ('${params.uuid}', ${params.date}, ${params.a}, ${params.b}, ${params.c}, ${params.d}, ${params.e}, ${params.sentimentA}, ${params.sentimentB}, ${params.sentimentC}, ${params.sentimentD});`
  return exec(sql)
}

function deleteSentiment (date) {
  console.log('deleteSentiment')
}

function updateSentiment (date) {
  console.log('updateSentiment')
}

async function selectSentiment (startDate, endDate) {
  const sql = `SELECT id, from_unixtime(date / 1000, '%Y-%m-%d') as date, a, b, c, d, e, sentiment_a, sentiment_b, sentiment_c, sentiment_d FROM t_market_sentiment WHERE date >= ${startDate.getTime()} and date <= ${endDate.getTime()} order by date;`
  return await exec(sql)
}

module.exports = {
  insertSentiment,
  deleteSentiment,
  updateSentiment,
  selectSentiment
}
