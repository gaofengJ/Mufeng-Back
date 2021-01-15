async function dailyMarketAnalysis (date) {

  let res = { // 短线情绪指标，以2020年7月7日为例
    a: '', // 2020年7月7日涨停，非一字涨停，非ST
    b: '', // 2020年7月6日涨停，非一字涨停，非ST
    c: '', // 2020年7月6日涨停，非一字涨停，非ST，2020年7月7日高开
    d: '', // 2020年7月6日涨停，非一字涨停，非ST，2020年7月7日上涨
    e: '', // 2020年7月7日曾涨停，非ST
    sentimentA: '', // 非一字涨停 sentimentA = a
    sentimentB: '', // 打板高开率 sentimentB = c / b
    sentimentC: '', // 打板成功率 sentimentC = d / b
    sentimentD: '', // 打板被砸率 sentimentD = e / (a + e)
  }
  return res
}

module.exports = {
  dailyMarketAnalysis
}
