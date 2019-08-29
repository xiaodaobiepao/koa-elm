const Router = require('koa-router')

const admin = require('./admin')
const v1 = require('./v1')
const router = new Router()

router.use('/admin', admin)
router.use('/v1', v1    )

module.exports = router.routes()

