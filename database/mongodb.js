const mongoose = require('mongoose')
const config = require('../config')
const chalk = require('chalk');
mongoose.connect(config.mongo_url)
mongoose.Promise = global.Promise

const db = mongoose.connection

db.once('open', () => {
    console.log(
        chalk.green('连接mongodb数据库成功')
    )
})

db.on('error', error => {
    console.error(chalk.red('Error in MongoDb connection: ' + error))
    mongoose.disconnect()
})

db.on('close', () => {
    console.log(chalk.red('数据库断开，重新连接数据库'))
    mongoose.connect(config.mongo_url, {server:{auto_reconnect: true}})
})

module.exports = db;