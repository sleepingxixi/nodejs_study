const seq = require('./db');

// 需要同步的模型
require('./model');

seq.authenticate().then(() => {
    console.log('sequelize connect success!')
}).catch((err) => {
    console.error('sequelize connect failed...')
})

// 同步数据
seq.sync({ force: true }).then(() => {
    process.exit(); // 退出进程
})