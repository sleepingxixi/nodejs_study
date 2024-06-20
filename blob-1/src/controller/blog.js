const getList = (author, keyword) => {
    return [
        {
            id: 1,
            title: '博客',
            content: '内容',
            author: 'zhangsan',
            createTime: 1718870527045
        },
        {
            id: 2,
            title: '博客2',
            content: '内容2',
            author: 'lisi',
            createTime: 1718870527045
        }
    ]
}

const getDetail = (id) => {
    return {
        id: 1,
        title: '博客',
        content: '内容',
        author: 'zhangsan',
        createTime: 1718870527045
    };
}

const createBlog = (data) => {
    return {
        id: 3
    }
}

const updateBlog = (id, data) => {

    return true;
}

const deleteBlog = (id) => {
    return true;
}

module.exports = {
    getList,
    getDetail,
    createBlog,
    updateBlog,
    deleteBlog
}