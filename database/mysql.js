const mysql = require('mysql')
const co = require('co-mysql')
const config = require('../config')

let db = mysql.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    database: config.DB_NAME,
    password: config.DB_PASS
})

module.exports = co(db)