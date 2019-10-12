const AddressComponent = require('../../prototype/addressComponent')
const PaymentsModel = require('../../models/v1/payments')
const ShopModel = require('../../models/shopping/shop')
const CartModel = require('../../models/v1/cart')

class Carts extends AddressComponent {
  constructor() {
    super()
    this.extra = [{
      description: '',
      name: '餐盒',
      price: 0,
      quantity: 1,
      type: 0
    }]
    this.checkout = this.checkout.bind(this)
  }

  async checkout(ctx, next) {
    const UID = ctx.session.UID
    const fields = ctx.request.fields
    const { come_from, geohash, entities = [], restaurant_id } = fields
    try {
      if (!(entities instanceof Array) || !entities.length) {
        throw new Error('entities参数错误')
      } else if (!(entities[0] instanceof Array) || !entities[0].length) {
        throw new Error('entities参数错误')
      } else if (!restaurant_id) {
        throw new Error('restaurant_id参数错误')
      }
    } catch (error) {
      ctx.body = {
        status: 'fail',
        errMsg: error.message
      }
      return
    }
    let payments,
    cart_id,
    restaurant,
    deliver_time,
    delivery_reach_time
    let from = geohash
    try {
      payments = await PaymentsModel.find({}, '-_id')
      cart_id = await this.getId('cart_id')
      restaurant = await ShopModel.findOne({id: restaurant_id})
      const to = restaurant.latitude + ',' + restaurant.longitude
      deliver_time = await this.getDistance(from, to), 'timevalue'
      let time = new Date().getTime() + deliver_time*1000
      let hour = ('0' + new Date(time).getHours()).substr(-2)
      let minute = ('0' + new Date(time).getMinutes()).substr(-2)
      delivery_reach_time = hour + ':' + minute
    } catch (error) {
      ctx.body = {
        status: 'fail',
        errMsg: '添加购物车失败'
      }
      return
    }
    const deliver_amount = 4
    let price = 0
    entities[0].map(item => {
      price += item.price * item.quantity
      if (item.packing_fee) {
        this.extra[0].price += item.packing_fee*item.quantity
      }
      if (item.specs[0]) {
        return item.name = item.name + '-' + item.specs[0]
      }
    })
    const total = price + this.extra[0].price * this.extra[0].quantity + deliver_amount
    let invoice = {
      is_available: false,
      status_text: '商家不支持发票'
    }
  }
}

module.exports = new Carts()