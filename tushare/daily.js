const { tuShare } = require('./tushare')

async function daily (date) {

  const paramObj = {
    api_name: 'daily',
    params: {
      trade_date: date // '20201225'
    }
  }
  const res = await tuShare(paramObj)
  return res
}

module.exports = {
  daily
}
