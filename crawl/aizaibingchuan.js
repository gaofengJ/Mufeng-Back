const puppeteer = require('puppeteer')
const config = require('./config')
const $ = require('../utils/index')

// 基本配置
const targetUrl = 'https://weixin.sogou.com/'
const queryStr = '2020-7-21 爱在冰川复盘'

async function crawl () {

  const res = {}

  try {
    const browser = await puppeteer.launch(config)
    
    let page = await browser.newPage()
    
    await page.goto(targetUrl, {
      waitUntil: 'domcontentloaded'
    })
    
    await page.type('input[name=query]', queryStr)
    await page.keyboard.press('Enter') // 输入内容搜索
  
    await page.waitForResponse('https://hhytrace.sogoucdn.com/p/') // 等待接口响应
  
    //在点击按钮之前，事先定义一个promise，用于返回新tab的page对象
    const pagePromise = new Promise(res =>
      browser.once('targetcreated',
          target => res(target.page())
      )
    )
  
    await (await page.$('.news-list>li:first-child h3 a')).click() // 点击进入第一篇文章
  
    page = await pagePromise
  
    await page.waitForNavigation({
      waitUntil: 'networkidle0'
    }) // 等待页面加载
  
    const article = await page.$('#js_article')
  
    res.title = await article.$eval('#activity-name', el => el.innerText) // 文章标题
    res.date = res.title.slice(res.title.indexOf('（') + 1, res.title.length - 8) // 日期
    res.content = await article.$eval('#js_content', el => el.innerHTML.trim()) // 文章内容
  
    console.log(res)
  } catch (e) {
    console.log(e)
  }

}

crawl()
console.log($)
