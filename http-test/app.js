// get
// const http = require('http');
// const queryString = require('querystring')

// const server = http.createServer((req, res) => {
//     console.log(req.method);
//     req.query = queryString.parse(req.url.split('?')[1]);
//     res.end(JSON.stringify(req.query))
// })

// server.listen(8000)
// console.log('ok')

// post
const http = require('http')
const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        console.log('content-type', req.headers['content-type'])

        let postData = '';
        req.on('data', chunk => {
            postData += chunk;
        })
        req.on('end', () => {
            console.log('postData=', postData)
            res.end(JSON.stringify('收到over'))
        })
    }
})
server.listen(8000)

// const http = require('http')
// const queryString = require('querystring')
// const server = http.createServer((req, res) => {
//     const url = req.url;
//     const method = req.method;
//     const query = queryString.parse(url.split('?')[1]);
//     res.setHeader('Content-type', 'application/json')
//     const resData = {
//         method,
//         url,
//         query
//     }
//     if (method === 'GET') {
//         res.end(JSON.stringify(resData))
//     } else if (method === 'POST') {
//         let postData = '';
//         req.on('data', chunk => {
//             postData += chunk;
//         })
//         req.on('end', () => {
//             resData.postData = postData;
//             res.end(JSON.stringify(resData))
//         })
//     }
// })
// server.listen(8000)