const Router = require('koa-router')
const Admin = require('../controller/admin/admin')
const router = new Router()


router.post('/login', Admin.login)
// router.get('/singout', Admin.singout)
// router.get('/all', Admin.getAllAdmin)
// router.get('/count', Admin.getAdminCount)
// router.get('/info', Admin.getAdminInfo)
// router.post('/update/avatar/:admin_id', Admin.updateAvatar)

module.exports = router.routes()

