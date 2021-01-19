const { tuShare } = require('./tushare')

async function dailyLimit (date) {

  const paramObj = {
    api_name: 'stk_limit',
    params: {
      trade_date: date // '20201225'
    }
  }
  const res = await tuShare(paramObj)
  return res
}

module.exports = {
  dailyLimit: dailyLimit
}
