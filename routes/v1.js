const router = require('koa-router')()
const City = require('../controller/v1/cities')
const User = require('../controller/v2/user')

router.get('/cities', City.getCity)
router.get('/user', User.getInfo)

module.exports = router.routes()