const { execSql } = require("../db/mysql");

const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1`;
    if (author) {
        sql += ` and author='${author}'`;
    }
    if (keyword) {
        sql += ` and title like '%${keyword}%'`
    }
    sql += ` order by createtime desc;`;
    return execSql(sql)
}

const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}';`;
    return execSql(sql).then(row => {
        return row[0];
    })
}

const createBlog = (data) => {
    const { author, title, content } = data;
    const time = Date.now();
    const sql = `
    insert into blogs (title,content,createtime,author) 
    values ('${title}','${content}',${time},'${author}');`
    return execSql(sql).then(data => {
        return {
            id: data.insertId
        }
    });
}

const updateBlog = (id, data) => {
    const { title, content } = data;
    const sql = `update blogs set title='${title}',content='${content}' where id=${id};`
    return execSql(sql).then(data => {
        if (data && data.changedRows > 0) {
            return true;
        } else {
            return false;
        }

    })
}

const deleteBlog = (id, author) => {
    const sql = `delete from blogs where id=${id} and author='${author}';`
    return execSql(sql).then(data => {
        if (data && data.affectedRows > 0) {
            return true;
        } else {
            return false;
        }

    })
}

module.exports = {
    getList,
    getDetail,
    createBlog,
    updateBlog,
    deleteBlog
}