const mysql = require('mysql')
const db_info = {
    host: 'joahaeng.cccgliye8vsw.ap-northeast-2.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: '00000000',
    database: 'innodb'
}

module.exports = mysql.createConnection(db_info)