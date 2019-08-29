// const Add
const AddressComponent = require('../../prototype/addressComponent')

class Admin extends AddressComponent {
    constructor() {
        super()
        this.login = this.login.bind(this)
        // this.register = this.register.bind(this)
        // this.encryption = this.encryption.bind(this)
        // this.updateAvatar = this.updateAvatar(this)
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
      const newpassword = this.encryption(password)
      try {
          const admin = await AdminModel.findOne({user_name})
          if (!admin) {
            const adminTip = status === 1 ? '管理员' : '超管'
            const admin_id = await this.getId('admin_id')
            const cityInfo = await this.guessPosition(ctx)
            const newAdmin = {
                user_name,

            }
          }
      } catch (error) {
          
      }
    }
}

module.exports = new Admin()