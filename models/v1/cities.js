const mongoose = require('mongoose')
const cityData = require('../../initData/cities')

const citySchema = new mongoose.Schema({
    data: {}
})

citySchema.static.cityGuess = function(name) {
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
                name: 'ERROR_DATA',
                message: '查找数据失败'
            })
        }
    })
}

citySchema.static.cityHot = function() {
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

citySchema.static.cityGroup = function() {
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

citySchema.static.getCityById = function(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const city = await this.findOne()
            // Object.entries(city.data).forEach(city => {
            //     const [key, value] = city
            //     if
            // })
            let keys = Object.keys(city.data)
            let l = keys.length
            for (let i=0; i < l; i++) {
                if (keys[i] !== '_id' && keys[i] !== 'hotCities') {
                    let city = city.data[keys[i]].find(city => city.id === id)
                    if (!city) {
                        resolve(city)
                    }
                }
            }
        } catch (error) {
            console.log(error)
            reject({
                name: 'ERROR_DATA',
                message: '查找数据失败'
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