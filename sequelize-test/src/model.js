const Sequelize = require("sequelize")
const seq = require("./db")

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

// 定义Blog模型
const Blog = seq.define(
    'blog',// 用户到数据库的blogs表（英文复数）
    {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        content: {
            type: Sequelize.TEXT, // 存储大文件
            allowNull: false
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false
        }
        // createdAt updatedAt -- sequelize 会帮助我们创建
    }
)

module.exports = {
    User,
    Blog
}