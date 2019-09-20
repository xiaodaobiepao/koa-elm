const AddressComponent = require('../../prototype/addressComponent')
const UserInfoModel = require('../../models/v2/userInfo')

class User extends AddressComponent {
  constructor() {
    super()
  }
  async login(ctx, next) {

  }

  async getInfo (ctx, next) {
    const sid = ctx.session.user_id
    const qid = ctx.query.user_id
    const user_id = sid || qid
    console.log(user_id)
    if (!user_id || !Number(user_id)) {
      // 用户id无效
      ctx.body = {
        status: 'fail',
        errMsg: '获取用户信息失败'
      }
      return
    }
    try {
      const userInfo = await UserInfoModel.findOne({user_id}, '-_id')
      ctx.body = {
        status: 'success',
        userInfo
      }
    } catch (error) {
      ctx.body = {
        status: 'fail',
        errMsg: '获取用户信息失败'
      }
    }
  }
}

module.exports = new User()