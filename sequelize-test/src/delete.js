const { Blog } = require('./model');
(async function () {
    const res = await Blog.destroy({
        where: {
            id: 2,
        }
    })
    console.log("res", res)
})()