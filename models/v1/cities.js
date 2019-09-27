const mongoose = require('mongoose')
const cityData = require('../../initData/cities')

const citySchema = new mongoose.Schema({
    data: {}
})

citySchema.statics.cityGuess = function(name) {
    // 根据拼音找城市
    return new Promise(async (resolve, reject) => {
        const firstWord = name.substr(0, 1).toUpperCase()
        try {
            const city = await this.findOne()
            Object.entries(city.data).forEach(item => {
                // item ==> Array 0: key, 1:value
                const [key, value] = item
                if(key === firstWord) {
                    value.forEach(city => {
                        if (city.pinyin === name) {
                            resolve(city)
                        }
                    })
                }
            })
        } catch (error) {
            console.log(error)
            reject({
                status: 'fail',
                errMsg: '获取数据失败'
            })
        }
    })
}

citySchema.statics.cityHot = function() {
    return new Promise(async (resolve, reject) => {
        try {
            const city = await this.findOne()
            resolve(city.data.hotCities)
        } catch (error) {
            console.log(error)
            reject({
                name: 'ERROR_DATA',
                message: '查找数据失败'
            })
        }
    })
}

citySchema.statics.cityGroup = function() {
    return new Promise(async (resolve, reject) => {
        try {
            const city = await this.findOne()
            const cityObj = city.data
            console.log(cityObj)
            delete(cityObj._id)
            delete(cityObj.hotCities)
            resolve(cityObj)
        } catch (error) {
            console.log(error)
            reject({
                name: 'ERROR_DATA',
                message: '查找数据失败'
            })
        }
    })
}

citySchema.statics.getCityById = function(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const city = await this.findOne()
            let keys = Object.keys(city.data)
            let result
            for (let i=0, l = keys.length; i < l; i++) {
                if (keys[i] !== '_id' && keys[i] !== 'hotCities') {
                    let cityInfo = city.data[keys[i]].find(city => city.id + '' === id)
                    if (cityInfo) {
                        result = cityInfo
                        break
                    }
                }
            }
            if (result) {
                resolve(result)
            } else {
                throw new Error('找不到')
            }
        } catch (error) {
            console.log(error)
            reject({
                status: 'fail',
                errMsg: '查找数据失败'
            })
        }
    })
}

const Cities = mongoose.model('Cities', citySchema)

Cities.findOne((err, data) => {
    if (!data) {
        Cities.create({data: cityData})
    }
})

module.exports = Cities