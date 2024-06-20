const blogRouter = require('./src/router/blogRouter')
const userRouter = require('./src/router/userRouter')
const queryString = require('querystring')

const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({});
            return;
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({});
            return;
        }
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString();
        })
        req.on('end', () => {
            if (!postData) {
                resolve({});
                return;
            }
            resolve(JSON.parse(postData))
        })

    })

}

const serverHandle = (req, res) => {
    res.setHeader('Content-type', 'application/json');
    // const resData = {
    //     name: 'liping123',
    //     age: 18,
    //     // process是node内置的一个全局变量，可以添加环境，便于后面针对不同环境进行使用
    //     env: process.env.NODE_ENV
    // }
    const url = req.url;
    req.query = queryString.parse(url.split('?')[1])
    req.path = url.split('?')[0]

    getPostData(req).then(postData => {
        req.body = postData

        let blogData = blogRouter(req, res)
        if (blogData) {
            res.end(JSON.stringify(blogData))
            return;
        }

        let userData = userRouter(req, res)
        if (userData) {
            res.end(JSON.stringify(userData))
            return;
        }

        // 未命中路由的情况下，返回404
        res.writeHead(404, {
            'Content-type': 'text/plain'
        })
        res.write('404 not found\n')
        res.end()
    })

}

module.exports = serverHandle