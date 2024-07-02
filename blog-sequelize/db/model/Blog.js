const Sequelize = require("sequelize")
const seq = require("../seq")


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
    Blog
}