const Cities = require('../../models/v1/cities')
const pinyin = require('pinyin')
const AddressComponent = require('../../prototype/addressComponent')

class City extends AddressComponent {
    constructor() {
        super()
        this.getCity = this.getCity.bind(this)
        // this.getCityName = this.getCityName.bind(this)
        // this.getCityById = this.getCityById.bind(this)
    }
    async getCity(ctx, next) {
        const type = ctx.query.type
        let cityInfo
        try {
            switch (type) {
                case 'guess':
                    const cityName = await this.getCityName(ctx)
                    console.log(cityName)
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
                        status: 'fail',
                        errmsg: '参数错误'
                    }
                    return
            }
            ctx.body = {
                status: 'success',
                cityInfo,
            }
        } catch (error) {
            console.log(error)
            ctx.body = {
                status: 'fail',
                errMsg: '获取数据失败'
            }
        }
    }

    async getCityById(ctx) {
        const cityid = ctx.params.id
        console.log(cityid)
        if (isNaN(cityid)) {
            ctx.body = {
                status: 'fail',
                errMsg: '参数错误'
            }
            return
        }
        try {
            const cityInfo = await Cities.getCityById(cityid)
            console.log(cityInfo)
            ctx.body = {
                status: 'success',
                cityInfo,
            }
        } catch (error) {
            ctx.body = {
                status: 'fail',
                errMsg: '获取数据失败'
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
            console.log(cityName)
            return cityName
        } catch (error) {
            console.log(error)
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
                    status: 'fail',
                    errMsg: '参数错误'
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
            ctx.body = {
                status: 'success',
                address,
            }
        } catch (error) {
            console.log(error)
            ctx.body = {
                status: 'fail',
                errMsg: '获取数据失败'
            }
        }
    }
}

module.exports = new City()