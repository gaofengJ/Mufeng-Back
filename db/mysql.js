const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

const pool = mysql.createPool(MYSQL_CONF)

function exec (sql) {
  const promise = new Promise((resolve, reject) => {
    pool.getConnection(function(err, con) {
      if (err) {
        reject(err)
      } else {
        con.query(sql, (err, res) => {
          if (err) {
            reject(err)
          }
          // 释放连接
          con.release()
          resolve(res[0]) // Nodejs操作MySQL返回RowDataPacket类型的对象，使用result[0]方便之后处理
        })
      }
    })
  })
  return promise
}

module.exports = {
  exec,
  escape: mysql.escape
}
