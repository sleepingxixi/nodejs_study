const Sequelize = require('sequelize');
const { Blog, User } = require('./model');

(async function () {
    //模拟登录，查询一条数据
    const data = await User.findOne({
        where: {
            username: 'zhangsan',
            password: '123'
        }
    })
    console.log("data==", data?.dataValues)

    const blogList = await Blog.findAll({
        where: {
            author: 'zhangsan',
            title: {
                [Sequelize.Op.like]: '%title%'
            }
        },
        order: [
            ['id', 'desc']
        ]
    })
    console.log('blogList', blogList.map(item => item.dataValues))
})()