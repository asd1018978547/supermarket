/**
 * 连接数据库模块
 */

var mysql = require('mysql')

var conn = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'root',
   database: 'supermarket'
});

conn.connect()

console.log('数据库连接成功...')


// 暴露出去
module.exports = conn;