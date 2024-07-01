var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

const session = require('express-session');
const RedisStore = require('connect-redis').default;


var app = express();

// 因为我们这个项目是纯后端，所以把这块前端想端的内容注释了
// // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 用于格式化日志
const ENV = process.env.NODE_ENV;
if (ENV === 'production') {
  // combined 类型的日志比较全面，适合线上记录
  const fileName = path.join(__dirname, 'logs', 'access.log');
  const writeStream = fs.createWriteStream(fileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }));
} else {
  app.use(logger('dev'));
}


// 用来处理一些post请求传入的内容（可能是json格式，也可能是其他格式，所以通过json和urlencoded的函数进行处理）
// 后续可以直接通过req.body获取数据
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 用来解析cookie的内容
app.use(cookieParser());

// 这个也是与前端相关，所以临时注释一下
app.use(express.static(path.join(__dirname, 'public')));

const redisClient = require('./db/redis');
const sessionStore = new RedisStore({
  client: redisClient,
})
app.use(session({
  secret: 'smile_ping123#',
  cookie: {
    // path: '/', // 默认配置
    // httpOnly: true,// 默认配置
    maxAge: 24 * 60 * 60 * 1000
  },
  // 设置了这个地方，session就会自动存储到redis重
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}))

// 注册路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
