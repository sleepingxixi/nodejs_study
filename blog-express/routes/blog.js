
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { getList, getDetail, createBlog, updateBlog, deleteBlog } = require('../controller/blog');
var express = require('express');
var router = express.Router();
const loginCheck = require('../middleware/loginCheck')

/* GET home page. */
router.get('/list', function (req, res, next) {
    //   res.render('index', { title: 'Express' });
    let author = req.query.author || '';
    const keyword = req.query.keyword;
    if (req.query.isadmin) {
        if (!req.session.username) {
            res.json(new ErrorModel('未登录'));
            return;
        }
        author = req.session.username;
    }

    return getList(author, keyword).then((data) => {
        res.json(new SuccessModel(data))
    })
});

router.get('/detail', function (req, res, next) {
    const id = req.query.id;
    return getDetail(id).then(data => {
        res.json(new SuccessModel(data))
    })
});
// 由于这个路由需要登录，因此可以直接把loginCheck中间件写在这里
router.post('/new', loginCheck, function (req, res, next) {
    req.body.author = req.session.username;
    return createBlog(req.body).then(data => {
        res.json(new SuccessModel(data))
    })

});
router.post('/update', loginCheck, function (req, res, next) {
    const id = req.query.id;
    return updateBlog(id, req.body).then(data => {
        res.json(data === true ? new SuccessModel('更新成功') : new ErrorModel('更新失败'));
    })

});
router.post('/del', loginCheck, function (req, res, next) {
    const id = req.query.id;
    return deleteBlog(id, req.session.username).then(data => {
        res.json(data === true ? new SuccessModel('删除成功') : new ErrorModel('删除失败'))
    })
})


module.exports = router;
