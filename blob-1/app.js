const handleblogRouter = require('./src/router/blogRouter')
const handleUserRouter = require('./src/router/userRouter')
const queryString = require('querystring')
const { get, set } = require('./src/db/redis')



const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    return d.toGMTString();
}

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

    // 解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || '';
    cookieStr.split(';').forEach(element => {
        if (!element) {
            return;
        }
        const arr = element.split('=');
        const key = arr[0].trim();
        const value = arr[1].trim();
        req.cookie[key] = value;
    });

    let needSetCookie = false;
    let userId = req.cookie.userid;
    if (!userId) {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.floor(Math.random() * 10)}`;
        set(userId, {})
    }
    req.sessionId = userId;
    get(req.sessionId).then(data => {
        if (!data) {
            set(req.sessionId, {})
            req.session = {};
        } else {
            req.session = data;
        }
        return getPostData(req);
    }).then(postData => {
        req.body = postData
        let blogResult = handleblogRouter(req, res);
        if (blogResult) {
            if (needSetCookie) {
                res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
            }
            blogResult.then((data) => {
                res.end(JSON.stringify(data))
            })
            return;
        }

        let userResult = handleUserRouter(req, res)
        if (userResult) {
            if (needSetCookie) {
                res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
            }
            userResult.then((data) => {
                res.end(JSON.stringify(data))
            })
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