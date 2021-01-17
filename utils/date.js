const tools = require('./tools')

/**
 * 
 * @param {date or string} date 
 * @param {string} fmt
 * @returns {string} fmt
 */
function _dateFormat (date = new Date(), fmt = 'yyyy-MM-dd') {
  const dateType = tools._typeof(date)
  if (dateType !== 'string' && dateType !== 'date') return
  if (tools._typeof(date) === 'string') {
    if (date.length === 10) date *= 1000 // 时间戳为10位字符串时要乘1000，为13位时不需要处理
    date = new Date(date)
  }
  const obj = {
    yyyy: date.getFullYear(),
    MM: date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
    dd: date.getDate() > 9 ? date.getDate() : '0' + date.getDate(),
    day: date.getDay() // 0-6 代表周日到周六
  }
  for (const i in obj) {
    fmt = fmt.replace(i, obj[i])
  }
  return fmt
}

function _getBeforeDay (date = new Date()) {
  const dateType = tools._typeof(date)
  if (dateType !== 'string' && dateType !== 'date') return
  if (tools._typeof(date) === 'string') {
    if (date.length === 10) date *= 1000 // 时间戳为10位字符串时要乘1000，为13位时不需要处理
    date = new Date(date)
  }
  const beforeDay = new Date(date.getTime() - 24 * 60 * 60 * 1000)
  return beforeDay
}

function _getAfterDay (date = new Date()) {
  const dateType = tools._typeof(date)
  if (dateType !== 'string' && dateType !== 'date') return
  if (tools._typeof(date) === 'string') {
    if (date.length === 10) date *= 1000 // 时间戳为10位字符串时要乘1000，为13位时不需要处理
    date = new Date(date)
  }
  const afterDay = new Date(date.getTime() - 24 * 60 * 60 * 1000)
  return afterDay
}

module.exports = {
  _dateFormat,
  _getBeforeDay,
  _getAfterDay
}
