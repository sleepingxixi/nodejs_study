const { login } = require("../controller/user");
const { set } = require("../db/redis");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleUserRouter = (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0]
    if (method === 'POST' && path === '/api/user/login') {
        const { username, password } = req.body;
        return login(username, password).then(data => {
            if (data.username) {
                req.session.username = data.username;
                req.session.realname = data.realname;
                set(req.sessionId, req.session)
                return new SuccessModel('登录成功')
            } else {
                return new ErrorModel('登录失败')
            }
        })
    }
    // if (method === 'GET' && path === '/api/user/login-test') {
    //     if (req.session.username) {
    //         return Promise.resolve(new SuccessModel({
    //             session: req.session
    //         }))
    //     } else {
    //         return Promise.resolve(new ErrorModel('登录失败'))
    //     }
    // }
}
module.exports = handleUserRouter;