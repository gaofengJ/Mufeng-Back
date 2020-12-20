const fs = require('fs')
const env = process.env.NODE_ENV // 环境参数：根据package中执行脚本判断

const configPathMap = {
  dev: '../../mufeng-back-db-config.json',
  production: ''
}

const { MYSQL_CONF, REDIS_CONF } = JSON.parse(fs.readFileSync(configPathMap[env], 'utf8'))

console.log(MYSQL_CONF, REDIS_CONF)

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}
