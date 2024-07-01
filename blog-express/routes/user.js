const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");
var express = require('express');
var router = express.Router();

router.post('/login', function (req, res, next) {
    const { username, password } = req.body;
    return login(username, password).then(data => {
        if (data.username) {
            req.session.username = data.username;
            req.session.realname = data.realname;
            res.json(new SuccessModel('登录成功'))
        } else {
            res.json(new ErrorModel('登录失败'))
        }
    })
});

module.exports = router;
