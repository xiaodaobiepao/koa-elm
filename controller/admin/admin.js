// const Add
const AddressComponent = require('../../prototype/addressComponent')

class Admin extends AddressComponent {
    constructor() {
        super()
        this.login = this.login.bind(this)
    }
    async login(ctx, next) {
        // ctx.type = 'html'
        // ctx.body = '<h1>登录</h1>'
      const {user_name, password, status = 1} = ctx.request.fields
      try {
        if (!user_name) {
          throw new Error('用户名不能为空')
        } else if (!password) {
          throw new Error('密码不能为空')
        }
      } catch (error) {
        console.log(error)
        ctx.body = {
          status: 0,
          type: 'GET_ERROR_PARAM',
          message: error.message
        }
      }
    }
}

module.exports = new Admin()