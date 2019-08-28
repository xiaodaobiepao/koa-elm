const path = require('path')
module.exports = {
    DB_HOST: 'localhost',
    DB_USER: 'root',
    DB_PASS: '123456',
    DB_NAME: 'koa_elm',

    mongo_url: 'mongodb://localhost:27017/koa_elm',

    PORT: 8080,
    ADMIN_SUFFIX: '_?:L$"OPUIOSIFJ(*UPT:LKRFG',

    HTTP_ROOT: 'http://localhost:8080',
    //HTTP_ROOT: 'https://www.aaa.com',

    UPLOAD_DIR: path.resolve(__dirname, './public/upload'),
    session: {
      name: 'SID',
      secret: 'SID',
      cookie: {
        httpOnly: true,
        secure:   false,
        maxAge:   365 * 24 * 60 * 60 * 1000,
      }
    }
}