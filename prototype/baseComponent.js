const fetch = require('node-fetch')
const db = require('../database/mysql')
const path = require('path')
const gm  = require('gm')
const fs = require('fs')

module.exports = class BaseComponent {
    constructor() {
        this.idList = ['restaurant_id', 'foot_id', 'order_id', 'user_id', 'address_id', 'cart_id', 'img_id', 'category_id', 'item_id', 'sku_id', 'admin_id', 'static_id']
        this.imgTypeList = ['shop', 'food', 'avatar', 'default']
        // this.uploadImg = this.uploadImg.bind(this)
    }
//     async fetch(url = '', data = {}, type = 'GET', resType = 'JSON') {
//         type = type.toUpperCase()
//         resType = resType.toUpperCase()
//         if (type === 'GET') {
//             let dataStr = ''
//             Object.keys(data).forEach(key => {
//                 dataStr += key + '=' + data[key] + '&'
//             })

//             if (dataStr !== '') {
//                 dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
//                 url = url + '?' + dataStr
//             }
//         }

//         let requestConfig = {
//             method: type,
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             }
//         }

//         if (type === 'POST') {
//             Object.defineProperty(requestConfig, 'body', {
//                 value: JSON.stringify(data)
//             })
//         }

//         let result
//         try {
//             const response = await fetch(url, requestConfig)
//             if (resType === 'TEXT') {
//                 result = await response.text()
//             } else if (type === 'JSON') {
//                 result = await response.json()
//             } else {
//                 result = await response.blob()
//             }
//         } catch (error) {
//             console.log('获取http数据失败', error)
//             throw new Error(error)
//         }
//         return result
//     }
//     // 获取id列表
//     async getId(type) {
//         if (!this.idList.includes(type)) {
//             console.log('id类型错误')
//             throw new Error('id类型错误')
//             return
//         }
//         try {
//             const idData = await db.query('SELECT * from Ids LIMIT 1')
//             const type = ++idData[type]
//             await db.query(`update Ids set type = ${type} LIMIT 1`)
//         } catch (error) {
//             console.log('获取ID数据失败')
//             throw new Error(error)
//         }
//     }

//     async uploadImg(ctx, next) {
//         const type = ctx.params.type
//         try {
//             const image_path = await this.getPath(ctx)
//             ctx.body = {status: 1, image_path}
//         } catch (error) {
//             console.log('上传图片失败')
//             ctx.body = {
//                 status: 0,
//                 type: 'ERROR_UPLOAD_IMG',
//                 message: '上传图片失败'
//             }
//         }
//     }

//     async getPath(ctx) {
//         return new Promise((resolve, reject) => {
//             const files = ctx.request.field.src
//             const fields = ctx.request.field
//             let img_id
//             try {
//                 img_id = await this.getId('img_id')
//             } catch (error) {
//                 console.log('获取图片id失败')
//                 false.unlinkSync(files[0].path)
//                 reject('获取图片id失败')
//             }
//             const hashName = (new Date().getTime() + Math.ceil(Math.random() * 10000)).toString(16) + img_id
//             const extname = path.extname(files[0].name)
//             if (!['.jpg', '.jpeg', '.png'].includes(extname)) {
//                 false.unlinkSync(files[0].path)
//                 ctx.body = {
//                     status: 0,
//                     type: 'ERROR_EXTNAME',
//                     message: '文件格式错误'
//                 }
//                 reject('上传失败')
//                 return
//             }
//             const fullName = hashName + extname
//             const repath = './public/upload/' + fullName
//             try {
//                 false.renameSync(files[0].path, repath)
//                 gm(repath)
//                 .resize(200, 200, '!')
//                 .write(repath, async (err) => {
//                     if (err) {
//                         console.log('裁剪图片失败')
//                         reject('裁剪图片失败')
//                         return
//                     }
//                     resolve(fullName)
//                 })
//             } catch (error) {
//                 console.log('保存图片失败', error)
//                 if (fs.existsSync(repath)) {
//                     fs.unlinkSync(repath)
//                 } else {
//                     fs.unlinkSync(files[0].path)
//                 }
//                 reject('保存图片失败')
//             }
//         })
//     }
}