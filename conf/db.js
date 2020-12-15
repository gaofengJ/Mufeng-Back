const env = process.env.NODE_ENV // 环境参数：根据package中执行脚本判断

// 配置
let MYSQL_CONF
let REDIS_CONF

if (env === 'dev') {
  // mysql
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '19941211j1',
    port: '3306',
    database: 'mufeng'
  }
  // redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

if (env === 'production') {
  // mysql
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '19941211j1',
    port: '3306',
    database: 'mufeng'
  }
  // redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: '19941211j1',
  port: '3306',
  database: 'mufeng'
}
// redis
REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}
