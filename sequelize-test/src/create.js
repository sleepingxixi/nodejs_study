// 创建数据库记录
const { User, Blog } = require('./model');

(async function () {
    // 创建user记录
    // await User.create({
    //     username: 'zhangsan',
    //     password: '123',
    //     realname: '张三'
    // });

    // 创建blog记录
    const data = await Blog.create({
        title: 'title1',
        content: 'content1',
        author: 'zhangsan'
    });
    console.log("data==", data)
    // 创建blog记录
    // await Blog.create({
    //     title: 'title2',
    //     content: 'content2',
    //     author: 'lisi'
    // })
})();