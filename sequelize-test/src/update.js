const { Blog } = require('./model');

(async function () {
    const res = await Blog.update(
        {
            title: '标题1',
            content: '内容1'
        },
        {
            where: {
                id: 1
            }
        })
    console.log("res", res)
})()