const Router = require('koa-router')

const admin = require('./admin')
const router = new Router()

router.use('/admin', admin)

module.exports = router.routes()

