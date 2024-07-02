const Sequelize = require('sequelize')

const conf = {
    host: 'localhost',
    dialect: 'mysql' // 设置方言，
}

// 生产环境下使用连接池（process.env.NODE_ENV）
// conf.pool = {
//     max: 5,
//     min: 0,
//     idle: 10 * 1000 // 如果一个连接10s内没有被使用，则释放
// }

const seq = new Sequelize(
    'seqBlog', // 数据库名称
    'root', // 用户名
    'sleeping123Xi@', // 密码
    conf
)

// 测试连接
// seq.authenticate().then(() => {
//     console.log('sequelize connect success!')
// }).catch((err) => {
//     console.error('sequelize connect failed...')
// })

module.exports = seq;