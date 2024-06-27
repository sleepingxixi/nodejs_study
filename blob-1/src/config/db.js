const env = process.env.NODE_ENV;
let MYSQL_CONF;
let REDIS_CONF;
if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'sleeping123Xi@',
        port: '3306',
        database: 'myBlog'
    };
    REDIS_CONF = {
        url: 'redis://127.0.0.1:6379'
    }
    // REDIS_CONF =
    // {
    //     host: '127.0.0.1',
    //     port: 6379
    // }
}

if (env === 'production') {
    // 线上连接数据库的配置应该和开发环境不一样，不过这里暂时demo
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'sleeping123Xi@',
        port: '3306',
        database: 'myBlog'
    };
    REDIS_CONF = {
        url: 'redis://127.0.0.1:6379'
    }

}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}