var express = require('express');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session")

var routes = require('./routes/index');
var users = require('./routes/users');

//自定义组件,存放常用公共组件

var common = require("./lib/common.js");
var security = require("./lib/mars-security.js")


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: '12345', saveUninitialized: true, resave: false}));

app.use(express.static(path.join(__dirname, 'public')));

//自定义公共组件
app.use(common({demo: "这是中间件初始化参数!"}));

//安全组件
app.use(security.configure());
app.use(security.filter(app));

app.use('/', routes);
app.use('/users', users);


// catch 404 and forward to error handler
//如果之前的路由都没有匹配表示无法找到页面
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
