// const Add
const AddressComponent = require('../../prototype/addressComponent')

class Admin extends AddressComponent {
    constructor() {
        super()
        this.login = this.login.bind(this)
    }
    async login(ctx, next) {
        ctx.type = 'html'
        ctx.body = '<h1>登录</h1>'
    }
}

module.exports = new Admin()