const crypto = require('crypto')
// 密匙
const SECRET_KEY = 'jfldj_4343'

 // md5 加密
function md5 (content) {
  let md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex') // hex:将输出变成16进制
}

// 加密函数
function _genPassword (password) {
  const str = `password=${password}&key=${SECRET_KEY}`
  return md5(str)
}

module.exports = {
  _genPassword
}