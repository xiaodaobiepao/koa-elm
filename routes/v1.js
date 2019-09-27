const router = require('koa-router')()
const City = require('../controller/v1/cities')
const SearchPlace = require('../controller/v1/search')
const User = require('../controller/v2/user')

router.get('/cities', City.getCity)
router.get('/cities/:id', City.getCityById)
router.get('/pois', SearchPlace.search)
router.get('/user', User.getInfo)

module.exports = router.routes()