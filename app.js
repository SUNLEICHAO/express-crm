var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

// 模板引擎
var nunjucks = require('nunjucks');
var favicon = require('serve-favicon')

// 中间件
var auth  = require('./middlewares/auth')

var app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// view engine setup
nunjucks.configure('views', {
  autoescape: true,
  express: app
}).addFilter('statusMap', function(status) { // 添加自定义过滤器
  let statusList = {
    "0": '不明',
    "1": '未进店用户',
    "2": '购买意愿强烈',
    "3": '暂无购买意愿'
  }
  return statusList[status || "0"]
}).addFilter('roleMap', function(role) { // 添加自定义过滤器；添加RABC系统后该过滤器无用
  let roleList = {
    "0": '未知身份',
    "admin": '管理员',
    "saler": '销售'
  }
  return roleList[role || "0"]
});

app.set('view engine', 'njk');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 问题，为什么中间件的位置要在路由前面
app.use(auth.loginAuth)

app.use('/',indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
