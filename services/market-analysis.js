const utils = require('../utils/index')
const {
  selectSentiment,
  selectUpDownNum
} = require('../dao/market-analysis/market-mood')

const {
  selectPercentStatistics
} = require('../dao/market-analysis/percent-statistics')

async function getMarketSentiment (startDate, endDate) {
  startDate = utils._dateFormat(new Date(startDate), 'yyyyMMdd')
  endDate = utils._dateFormat(new Date(endDate), 'yyyyMMdd')
  const list = await selectSentiment(startDate, endDate)
  return list
}

async function getPercentStatistics (date) {
  date = utils._dateFormat(date, 'yyyyMMdd')
  let rangeArr = [
    {
      key: '<-9%',
      value: 'AND pct_chg <= -9'
    },
    {
      key: '-9%~-8%',
      value: 'AND -9 <= pct_chg AND pct_chg < -8'
    },
    {
      key: '-8%~-7%',
      value: 'AND -8 <= pct_chg AND pct_chg < -7'
    },
    {
      key: '-7%~-6%',
      value: 'AND -7 <= pct_chg AND pct_chg < -6'
    },
    {
      key: '-6%~-5%',
      value: 'AND -6 <= pct_chg AND pct_chg < -5'
    },
    {
      key: '-5%~-4%',
      value: 'AND -5 <= pct_chg AND pct_chg < -4'
    },
    {
      key: '-4%~-3%',
      value: 'AND -4 <= pct_chg AND pct_chg < -3'
    },
    {
      key: '-3%~-2%',
      value: 'AND -3 <= pct_chg AND pct_chg < -2'
    },
    {
      key: '-2%~-1%',
      value: 'AND -2 <= pct_chg AND pct_chg < -1'
    },
    {
      key: '-1%~0',
      value: 'AND -1 <= pct_chg AND pct_chg < 0'
    },
    {
      key: '0',
      value: 'AND pct_chg = 0'
    },
    {
      key: '0~1%',
      value: 'AND 0 < pct_chg AND pct_chg <= 1'
    },
    {
      key: '1%~2%',
      value: 'AND 1 < pct_chg AND pct_chg <= 2'
    },
    {
      key: '2%~3%',
      value: 'AND 2 < pct_chg AND pct_chg <= 3'
    },
    {
      key: '3%~4%',
      value: 'AND 3 < pct_chg AND pct_chg <= 4'
    },
    {
      key: '4%~5%',
      value: 'AND 4 < pct_chg AND pct_chg <= 5'
    },
    {
      key: '5~6',
      value: 'AND 5 < pct_chg AND pct_chg <= 6'
    },
    {
      key: '6%~7%',
      value: 'AND 6 < pct_chg AND pct_chg <= 7'
    },
    {
      key: '7%~8%',
      value: 'AND 7 < pct_chg AND pct_chg <= 8'
    },
    {
      key: '8%~9%',
      value: 'AND 8 < pct_chg AND pct_chg <= 9'
    },
    {
      key: '>9%',
      value: 'AND 9 < pct_chg'
    },
  ]
  const list = []
  for (let i = 0; i < rangeArr.length; i++) {
    const num = await selectPercentStatistics(date, rangeArr[i]['value'])
    list.push({
      key: rangeArr[i]['key'],
      value: num
    })
  }
  return list
}

async function getUpDownNum (startDate, endDate) {
  startDate = utils._dateFormat(new Date(startDate), 'yyyyMMdd')
  endDate = utils._dateFormat(new Date(endDate), 'yyyyMMdd')
  const list = await selectUpDownNum(startDate, endDate)
  return list
}

module.exports = {
  getMarketSentiment,
  getPercentStatistics,
  getUpDownNum
}
