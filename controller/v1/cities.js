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
                        errmsg: '参数错误'
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

    async getCityById(ctx) {
        const cityid = ctx.params.id
        if (isNaN(cityid)) {
            ctx.body = {
                status: 0,
                name: 'ERROR_PARAM_TYPE',
                errmsg: '参数错误'
            }
            return
        }
        try {
            const cityInfo = await Cities.getCityById(cityid)
            ctx.body = cityInfo
        } catch (error) {
            ctx.body = {
                status: 0,
                name: 'ERROR_DATA',
                errmsg: '获取数据失败'
            }
        }
    }

    async getCityName(ctx) {
        try {
            const cityInfo = await this.guessPosition(ctx) // 根据ip获取到城市名
            const pinyinArr = pinyin(cityInfo.city, {
                style: pinyin.STYLE_NORMAL,
            })
            let cityName = ''
            pinyinArr.forEach(item => {
                cityName += item[0]
            })
            return cityName
        } catch (error) {
            return 'beijing'
        }
    }

    async getExactAddress (ctx) {
        try {
            const position = await this.geocoder(ctx) // 获取到了地址信息
            ctx.body = position
        } catch (error) {
            console.log(error)
            ctx.body = {
                name: 'ERROR_DATA',
                errmsg: '获取精确位置信息失败'
            }
        }
    }

    async pois (ctx) {
        try {
            const geohash = ctx.params.geohash || ''
            if (geohash.indexOf(',') === -1) {
                ctx.body = {
                    status: 0,
                    type: 'ERROR_PARAMS',
                    errmsg: '参数错误'
                }
                return
            }
            const poisArr = geohash.split(',')
            const result = await this.getpois(poisArr[0], poisArr[1])
            const address = {
                address: result.result.address,
                city: result.result.address_component.province,
                geohash,
                latitude: poisArr[0],
                longitude: poisArr[1],
                name: result.result.formatted_adresses.recommend
            }
            ctx.body = address
        } catch (error) {
            console.log(error)
            ctx.body = {
                status: 0,
                type: 'ERROR_DATA',
                errmsg: '获取数据失败'
            }
        }
    }
}

module.exports = new City()