const { tuShare } = require('./tushare')

async function stockBasic () {
  const paramObj = {
    api_name: 'stock_basic',
    params: {
      exchange: 'SZSE', // 交易所 SSE上交所,SZSE深交所
    }
  }
  const res = await tuShare(paramObj)
  return res
}

module.exports = {
  stockBasic
}
