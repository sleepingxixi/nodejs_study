const { loginCheck } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleUserRouter = (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0]
    if (method === 'POST' && path === '/api/user/login') {
        const { usename, password } = req.body;
        const flag = loginCheck(usename, password);
        if (flag) {
            return new SuccessModel()
        } else {
            return new ErrorModel('登录失败')
        }
    }
}
module.exports = handleUserRouter;