const { tuShare } = require('./tushare')

async function limitList (date) {

  const paramObj = {
    api_name: 'limit_list',
    params: {
      trade_date: date // '20201225'
    }
  }
  const res = await tuShare(paramObj)
  return res
}

module.exports = {
  limitList
}
