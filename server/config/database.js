const mysql = require('mysql')
const db_info = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '0000',
    database: 'joahaengdb'
}

module.exports = mysql.createConnection(db_info)