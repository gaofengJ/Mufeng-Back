const puppeteer = require('puppeteer')
const config = require('./config')
const utils = require('../utils/index')

class MarketSentiment {
  constructor (date) {
    this.targetUrl = 'http://www.iwencai.com/unifiedwap/home/index' // 使用问财新地址
    this.date = date || new Date()
  }

  // 格式化时间 返回值示例：2020年1月1日
  getDate (val) {
    const date = utils._dateFormat(val)
    const dateArr = date.split('-')
    const dateStr = `${dateArr[0]}年${dateArr[1]}月${dateArr[2]}日`
    return dateStr
  }

  async crawl (date) {
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
    const browser = await puppeteer.launch(config)

    const currentDate = date || this.date

    // 如果是周六或者周日返回异常
    if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
      res = {
        code: -1,
        message: '搜索日期不能为周六或周日'
      }
      return res
    }

    const currentDateFormat = this.getDate(currentDate)
    const beforeDateFormat = this.getDate(utils._getBeforeDay(currentDate))

    try {
  
      let page = await browser.newPage()
  
      await page.goto(this.targetUrl, {
        waitUntil: 'domcontentloaded'
      })

      await clearInput(page, 'textarea.search-input') // 清空搜索框内容
      await timeout(3000)
  
      await page.type('textarea.search-input', `${currentDateFormat}涨停，非一字涨停，非ST`)
      await page.keyboard.press('Enter') // 输入内容搜索
      await page.waitForSelector('.table-count strong') // 等待元素加载
      res.a = +await page.$eval('.table-count strong', el => el.innerText)

      await clearInput(page, 'textarea.search-input') // 清空搜索框内容
      await timeout(3000)

      await page.type('textarea.search-input', `${beforeDateFormat}涨停，非一字涨停，非ST`)
      await page.keyboard.press('Enter') // 输入内容搜索
      await timeout(3000) // 由于两次使用的是同一元素，所以等待3000ms
      res.b = +await page.$eval('.table-count strong', el => el.innerText)

      await clearInput(page, 'textarea.search-input') // 清空搜索框内容
      await timeout(3000)
  
      await page.type('textarea.search-input', `${beforeDateFormat}涨停，非一字涨停，非ST，${currentDateFormat}高开`)
      await page.keyboard.press('Enter') // 输入内容搜索
      await timeout(3000)
      res.c = +await page.$eval('.table-count strong', el => el.innerText)

      await clearInput(page, 'textarea.search-input') // 清空搜索框内容
      await timeout(3000)

      await page.type('textarea.search-input', `${beforeDateFormat}涨停，非一字涨停，非ST，${currentDateFormat}上涨`)
      await page.keyboard.press('Enter') // 输入内容搜索
      await timeout(3000)
      res.d = +await page.$eval('.table-count strong', el => el.innerText)

      await clearInput(page, 'textarea.search-input') // 清空搜索框内容
      await timeout(3000)

      await page.type('textarea.search-input', `${currentDateFormat}曾涨停，非ST`)
      await page.keyboard.press('Enter') // 输入内容搜索
      await timeout(3000)
      res.e = +await page.$eval('.table-count strong', el => el.innerText)

      await clearInput(page, 'textarea.search-input') // 清空搜索框内容

      res.sentimentA = res.a // a 非一字涨停
      res.sentimentB = Math.floor(res.c / res.b * 100) // 打板高开率
      res.sentimentC = Math.floor(res.d / res.b * 100) // 打板成功率
      res.sentimentD = Math.floor(res.e / (res.a + res.e) * 100) // 打板被砸率

      return res
  
    } catch (e) {
      console.log('e', e)
    } finally {
      browser.close()
    }
  }
}

function timeout (ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}

async function clearInput (page, selector) {
  const inputValue = await page.$eval(selector, input => input.value)
  await page.focus(selector)
  for (let i = 0; i < inputValue.length; i++) {
    await page.keyboard.press('Backspace')
  }
}

module.exports = MarketSentiment
