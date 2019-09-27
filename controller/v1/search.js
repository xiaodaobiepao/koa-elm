const AddressComponent = require('../../prototype/addressComponent')
const Cities = require('../../models/v1/cities')
const City = require('./cities')

class SearchPlace extends AddressComponent {
  constructor() {
    super()
    this.search = this.search.bind(this)
  }

  async search(ctx, next) {
    let { type = 'search', city_id, keyword } = ctx.query
    if (!keyword) {
      ctx.body = {
        status: 'fail',
        errMsg: '参数错误'
      }
      return
    }
    if (isNaN(city_id)) { // 如果city_id出错，则给ip地址所在城市id
      try {
        const cityName = await City.getCityName(ctx)
        const cityInfo = await Cities.cityGuess(cityName)
        city_id = cityInfo.id
      } catch (error) {
        ctx.body = {
          status: 'fail',
          errMsg: '获取数据失败'
        }
      }
    }
    try {
      const cityInfo = await Cities.getCityById(city_id)
      const result = await this.searchPlace(keyword, cityInfo.name, type)
      const placeList = []
      console.log(result)
      result.data.forEach((item, index) => {
        placeList.push({
          name: item.title,
          address: item.address,
          latitude: item.location.lat,
          longitude: item.location.lng,
          geohash: item.location.lat + ',' + item.location.lng,
        })
      })
      ctx.body = {
        status: 'success',
        placeList,
      }
    } catch (error) {
      ctx.body = {
        status: 'fail',
        errMsg: '获取地址信息失败'
      }
    }
  }
}

module.exports = new SearchPlace()