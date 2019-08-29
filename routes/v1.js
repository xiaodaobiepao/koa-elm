const router = require('koa-router')()
const City = require('../controller/v1/cities')

router.get('/cities', City.getCity)

module.exports = router.routes()