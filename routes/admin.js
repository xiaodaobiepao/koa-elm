const Router = require('koa-router')
const Admin = require('../controller/admin/admin')
const router = new Router()


router.post('/login', Admin.login)

module.exports = router.routes()

