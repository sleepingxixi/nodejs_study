const { execSql } = require("../db/mysql");
const xss = require('xss');

const getList = async (author, keyword) => {
    let sql = `select * from blogs where 1=1`;
    if (author) {
        sql += ` and author='${author}'`;
    }
    if (keyword) {
        sql += ` and title like '%${keyword}%'`
    }
    sql += ` order by createtime desc;`;
    return await execSql(sql)
}

const getDetail = async (id) => {
    const sql = `select * from blogs where id='${id}';`;
    const row = await execSql(sql)
    return row[0];
}

const createBlog = async (data) => {
    let { author, title, content } = data;
    title = xss(title);
    const time = Date.now();
    const sql = `
    insert into blogs (title,content,createtime,author) 
    values ('${title}','${content}',${time},'${author}');`
    const initData = await execSql(sql)
    return {
        id: initData.insertId
    }

}

const updateBlog = async (id, data) => {
    console.log("data=", data)
    const { title, content } = data;
    const sql = `update blogs set title='${title}',content='${content}' where id=${id};`
    const resData = await execSql(sql)
    if (resData && resData.changedRows > 0) {
        return true;
    } else {
        return false;
    }
}

const deleteBlog = async (id, author) => {
    const sql = `delete from blogs where id=${id} and author='${author}';`
    const resData = await execSql(sql);
    if (resData && resData.affectedRows > 0) {
        return true;
    } else {
        return false;
    }

}

module.exports = {
    getList,
    getDetail,
    createBlog,
    updateBlog,
    deleteBlog
}