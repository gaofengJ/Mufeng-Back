const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF)

// 开始连接
con.connect()

// 统一执行sql的函数
function exec (sql) {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result[0]) // Nodejs操作MySQL返回RowDataPacket类型的对象，使用result[0]方便之后处理
    })
  })
  return promise
}

module.exports = {
  exec,
  escape: mysql.escape
}
