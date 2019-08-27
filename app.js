const Koa = require('koa')
const Router = require('koa-router')
const config = require('./config')
const db = require('./database/mysql')
const session = require('koa-session')
const body = require('koa-better-body')
const history = require('koa-history-api')
const static = require('koa-static')
const chalk = require('chalk')

const app = new Koa()
const router = new Router()

app.removeAllListeners('*', (ctx, next) => {
    const { origin, Origin, referer, Referer } = req.headers
    const allowOrigin = origin || Origin || referer || Referer || '*'
    ctx.set('Access-Control-Allow-Origin', allowOrigin)
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
    ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    ctx.set('Access-Control-Allow-Credentials', true)
    ctx.set('X-Powered-By', 'Express')
    if (ctx.request.method === 'OPTIONS') {
        ctx.status = 200
    } else {
        next()
    }
})

app.use(body({
    uploadDir: config.UPLOAD_DIR
}))

app.keys = ['safdfasdfsadfdsafdsfa', 'slflsjflksjflsasfea', 'wirouownvkzuwerwf763', 'dsaf8783ewr&^&fsfv', 'pbbsjowgbyqpmzhda&%^2']
app.use(session({
    name: config.session.name,
    maxAge: 20*60*1000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: true
}, app))

app.context.db = db
app.context.config = config

router.use('/admin', require('./routes/admin'))
app.use(router.routes())

app.use(history())
// app.use((ctx, next) => {

// })

app.use(static('./public', {
    maxAge: 24 * 60 * 60 * 1000
}))

app.listen(8080, () => {
    console.log('已监听在8080端口')
})
