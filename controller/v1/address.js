const BaseComponent = require('../../prototype/baseComponent')
const AddressModel = require('../../models/v1/address')

class Address extends BaseComponent {
  constructor() {
    super()
    this.addAddress = this.addAddress.bind(this)
  }
  async getAddress(ctx, next) {
    const user_id = ctx.params.user_id
    if (!user_id || isNaN(Number(user_id))) {
      ctx.body = {
        status: 'fail',
        errMsg: 'user_id参数错误'
      }
      return
    }
    try {
      const addressList = await AddressModel.find({user_id}, '-_id')
      ctx.body = {
        addressList,
        status: 'success'
      }
    } catch (error) {
      ctx.body = {
        status: 'fail',
        errMsg: '获取地址列表失败'
      }
    }
  }

  async addAddress(ctx, next) {
    console.log(ctx.request)
    const field = ctx.request.fields
    const user_id = ctx.params.user_id
    const { address, address_detail, geohash, name, phone, phone_bk, poi_type = 0, sex, tag, tag_type } = field
    try {
      if (!user_id || !Number(user_id)) {
        throw new Error('用户ID参数错误')
      } else if (!address) {
        throw new Error('地址信息错误')
      } else if (!address_detail) {
        throw new Error('地址详情信息错误')
      } else if (!geohash) {
        throw new Error('geohash参数错误')
      } else if (!name) {
        throw new Error('收货人姓名错误')
      } else if (!phone) {
        throw new Error('收货手机号错误')
      } else if (!sex) {
        throw new Error('性别错误')
      } else if (!tag) {
        throw new Error('标签错误')
      } else if (!tag_type) {
        throw new Error('标签类型错误')
      }
    } catch (error) {
      ctx.body = {
        status: 'fail',
        errMsg: error.message
      }
      return
    }
    try {
      const address_id = await this.getId('address_id') // 获取（准确的说是生成）地址id
      const newAddress = {
        id: address_id,
        address,
        phone,
        phone_bk,
        name,
        st_geohash: geohash,
        address_detail,
        sex,
        tag,
        tag_type,
        user_id,
      }
      await AddressModel.create(newAddress)
      ctx.body = {
        status: 'success',
        message: '添加地址成功'
      }
    } catch (error) {
      ctx.body = {
        status: 'fail',
        errMsg: '添加地址失败'
      }
    }
  }

  async deleteAddress(ctx, next) {
    const {user_id, address_id} = req.params
    if (!user_id || !Number(user_id) || !address_id || !Number(address_id)) {
      ctx.body = {
        status: 'fail',
        errMsg: '非法参数'
      }
      return
    }
    try {
      await AddressModel.findOneAndRemove({id: address_id})
      ctx.body = {
        status: 'success',
        message: '删除地址成功'
      }
    } catch (error) {
      ctx.body = {
        status: 'fail',
        errMsg: '删除收货地址失败'
      }
    }
  }

  async getAddressById(ctx, next) {
    const address_id = ctx.params.address_id
    if (!address_id || !Number(address_id)) {
      ctx.body = {
        status: 'fail',
        errMsg: '参数错误'
      }
      return
    }
    try {
      const address = await AddressModel.findOne({id: address_id})
      ctx.body = {
        address,
        status: 'sucess'
      }
    } catch (error) {
      console.log('获取地址信息失败', error)
      ctx.body = {
        status: 'fail',
        errMsg: '获取地址信息失败'
      }
    }
  }
}

module.exports = new Address()