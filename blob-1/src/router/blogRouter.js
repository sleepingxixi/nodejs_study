const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getList, getDetail, createBlog, updateBlog, deleteBlog } = require('../controller/blog')

const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(new ErrorModel('登录失败'))
    }
}

const handleblogRouter = (req, res) => {
    const method = req.method;
    const path = req.path;

    if (method === 'GET' && path === '/api/blog/list') {
        let author = req.query.author || '';
        const keyword = req.query.keyword;
        const checkResult = loginCheck(req);
        if (req.query.isadmin) {
            if (checkResult) {
                return checkResult;
            }
            author = req.session.username;
        }

        return getList(author, keyword).then((data) => {
            return new SuccessModel(data)
        })
    }
    if (method === 'GET' && path === '/api/blog/detail') {
        const id = req.query.id;
        return getDetail(id).then(data => {
            return new SuccessModel(data)
        })
    }
    if (method === 'POST' && path === '/api/blog/new') {
        const checkResult = loginCheck(req);
        if (checkResult) {
            return checkResult;
        }
        req.body.author = req.session.username;
        return createBlog(req.body).then(data => {
            return new SuccessModel(data)
        })

    }
    if (method === 'POST' && path === '/api/blog/update') {
        const checkResult = loginCheck(req);
        if (checkResult) {
            return checkResult;
        }
        const id = req.query.id;
        return updateBlog(id, req.body).then(data => {
            return data === true ? new SuccessModel('更新成功') : new ErrorModel('更新失败')
        })

    }
    if (method === 'POST' && path === '/api/blog/del') {
        const checkResult = loginCheck(req);
        if (checkResult) {
            return checkResult;
        }
        const id = req.query.id;
        return deleteBlog(id, req.session.username).then(data => {
            return data === true ? new SuccessModel('删除成功') : new ErrorModel('删除失败')
        })
    }
}

module.exports = handleblogRouter;