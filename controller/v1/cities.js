const Cities = require('../../models/v1/cities')
const pinyin = 'pinyin'
const AddressComponent = require('../../prototype/addressComponent')

class City extends AddressComponent {
    constructor() {
        super()
    }
    async getCity(ctx, next) {
        const type = ctx.query.type
        let cityInfo
        try {
            switch (type) {
                case 'guess':
                    const cityName = await this.getCityName(ctx)
                    cityInfo = await Cities.cityGuess(cityName)
                    break
                case 'hot':
                    cityInfo = await Cities.cityHot()
                    break
                case 'group':
                    cityInfo = await Cities.cityGroup()
                    break
                default:
                    ctx.body = {
                        name: 'ERROR_QUERY_TYPE',
                        message: '参数错误'
                    }
                    return
            }
            ctx.body = cityInfo
        } catch (error) {
            ctx.body = {
                name: 'ERROR_DATA',
                message: '获取数据失败'
            }
        }
    }
}