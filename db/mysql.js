const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

const pool = mysql.createPool(MYSQL_CONF)

function exec (sql) {
  const promise = new Promise((resolve, reject) => {
    pool.getConnection(function(err, con) {
      if (err) {
        console.log('get connection err', err)
        reject(err)
      } else {
        con.query(sql, (err, res) => {
          if (err) {
            console.log('query err', err)
            reject(err)
          }
          // 释放连接
          con.release()
          resolve(res)
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
