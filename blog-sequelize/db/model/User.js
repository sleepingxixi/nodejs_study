const Sequelize = require("sequelize")
const seq = require("../seq")

// 定义User模型
const User = seq.define(
    'user', // 用户到数据库的users表（英文复数）
    {
        // id 不需要定义，sequelize 会帮我们增加上
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        realname: {
            type: Sequelize.STRING
        }
    }
);


module.exports = {
    User
}