const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getList, getDetail, createBlog, updateBlog, deleteBlog } = require('../controller/blog')

const handleblogRouter = (req, res) => {
    const method = req.method;
    const path = req.path;

    if (method === 'GET' && path === '/api/blog/list') {
        const author = req.query.author;
        const keyword = req.query.keyword;
        const data = getList(author, keyword)
        return new SuccessModel(data)
    }
    if (method === 'GET' && path === '/api/blog/detail') {
        const id = req.query.id;
        const data = getDetail(id)
        return new SuccessModel(data)
    }
    if (method === 'POST' && path === '/api/blog/new') {
        console.log(req.body)
        const data = createBlog(req.body)
        return new SuccessModel(data)
    }
    if (method === 'POST' && path === '/api/blog/update') {
        const id = req.query.id;
        const data = updateBlog(id, req.body)
        return data === true ? new SuccessModel('更新成功') : new ErrorModel('更新失败')
    }
    if (method === 'POST' && path === '/api/blog/del') {
        const id = req.query.id;
        const data = deleteBlog(id)
        return data === true ? new SuccessModel('删除成功') : new ErrorModel('删除失败')
    }
}

module.exports = handleblogRouter;