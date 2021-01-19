const { tuShare } = require('./tushare')

async function tradeCal (year) {

  let startDate = `${year}0101`
  let endDate = `${year}1231`
  const paramObj = {
    api_name: 'trade_cal',
    params: {
      exchange: 'SSE', // 交易所 SSE上交所,SZSE深交所,CFFEX 中金所,SHFE 上期所,CZCE 郑商所,DCE 大商所,INE 上能源
      start_date: startDate,
      end_date: endDate
      // is_open: 1 // 是否交易 '0'休市 '1'交易
    }
  }
  const res = await tuShare(paramObj)
  return res
}

module.exports = {
  tradeCal
}
