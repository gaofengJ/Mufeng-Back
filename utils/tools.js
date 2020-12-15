function _typeof (obj) {
  let type = Object.prototype.toString.call(obj)
  let res = ''
  switch (type) {
    case '[object String]':
      res = 'string'
      break
    case '[object Number]':
      res = 'number'
      break
    case '[object Boolean]':
      res = 'boolean'
      break
    case '[object Undefined]':
      res = 'undefined'
      break
    case '[object Null]':
      res = 'null'
      break
    case '[object Object]':
      res = 'object'
      break
    case '[object Array]':
      res = 'array'
      break
    case '[object Math]':
      res = 'math'
      break
    case '[object Date]':
      res = 'date'
      break
    case '[object Function]':
      res = 'function'
      break
    default:
      res = 'error'
      break
  }
  return res
}

module.exports = {
  _typeof
}
