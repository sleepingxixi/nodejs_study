const { SuccessModel, ErrorModel } = require('../model/resModel');
const { getList, getDetail, createBlog, updateBlog, deleteBlog } = require('../controller/blog');
const router = require('koa-router')()
router.prefix('/api/blog')

const loginCheck = require('../middleware/loginCheck')

/* GET home page. */
router.get('/list', async (ctx, next) => {
    //   res.render('index', { title: 'Express' });
    let author = ctx.query.author || '';
    const keyword = ctx.query.keyword;
    if (ctx.query.isadmin) {
        if (!ctx.session.username) {
            ctx.body = new ErrorModel('未登录');
            return;
        }
        author = ctx.session.username;
    }

    const res = await getList(author, keyword);
    ctx.body = new SuccessModel(res)
});

router.get('/detail', async function (ctx, next) {
    const id = ctx.query.id;
    const data = await getDetail(id);
    ctx.body = new SuccessModel(data);
});
// 由于这个路由需要登录，因此可以直接把loginCheck中间件写在这里
router.post('/new', loginCheck, async function (ctx, next) {
    const body = ctx.request.body;
    body.author = ctx.session.username;
    const data = await createBlog(body);
    ctx.body = new SuccessModel(data);
});
router.post('/update', loginCheck, async function (ctx, next) {
    const id = ctx.query.id;
    const data = await updateBlog(id, ctx.request.body)
    ctx.body = data === true ? new SuccessModel('更新成功') : new ErrorModel('更新失败');
});
router.post('/del', loginCheck, async function (ctx, next) {
    const id = ctx.query.id;
    const data = deleteBlog(id, ctx.session.username)
    ctx.body = data === true ? new SuccessModel('删除成功') : new ErrorModel('删除失败')

})


module.exports = router
