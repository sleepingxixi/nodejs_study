const http = require('http')
const PORT = 8000;

const server = http.createServer((req, res) => {
    console.log("测试一下正常的日志");
    console.error("测试一下错误的日志");
    res.setHeader('Content-type', 'application/json');
    res.end(JSON.stringify({
        data: 'success'
    }))
})

server.listen(PORT)