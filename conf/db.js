const fs = require('fs')
const path = require('path')
const env = process.env.NODE_ENV || 'dev' // 环境参数：根据package中执行脚本判断

const configPathMap = {
  dev: '../../mufeng-back-db-config.json',
  production: '../../mufeng-back-db-config.json'
}

const { MYSQL_CONF, REDIS_CONF } = JSON.parse(fs.readFileSync(path.join(__dirname, configPathMap[env]), 'utf8'))

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}
