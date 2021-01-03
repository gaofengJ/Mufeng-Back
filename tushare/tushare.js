const http = require('http')

const baseUrl = 'api.waditu.com'
const TOKEN = '50c7adac6b4ce0baa49b97e946c27826f832d903aa055822b9bd0544'

/**
 * 
 * @param
 * {
    "api_name": "",
    "params": {}
  }
 * @description tushare接口调用
 */
function tuShare (obj) {
  return new Promise((resolve, reject) => {

    const postData = JSON.stringify(Object.assign(obj, {
      token: TOKEN // 添加token
    }))
  
    const options = {
      host: baseUrl,
      // port: 80,
      // path: '/',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      }
    }
  
    let req = http.request(options, (res) => {
      res.setEncoding('utf8')
      let resData = ''
      res.on('data', chunk => {
        resData += chunk
      })
      res.on('end', () => {
        resolve(JSON.parse(resData)) // 返回结果中code为Number类型
      })
    })
    req.on('error', e => {
      reject(e)
    })
    req.write(postData)
    req.end()
  })
}

module.exports = {
  tuShare
}
