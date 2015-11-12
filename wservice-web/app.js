/*!
 * mars
 * Copyright(c) 2015 Leon Huang
 * MIT Licensed
 */

'use strict';

var express = require("express");
var app = express();
var path = require("path");
var favicon = require("serve-favicon");
var logger = require('morgan');
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var flash = require("express-flash");
var router = require("./router");
var session = require("express-session");
var passport = require("./passport");
var security = require("./security");
var proxy = require("./proxy");
var repository = require("./repository");

//设置视图引擎
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//设置应用程序图图标
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

//设置public目录为前端资源公共目录,包括前端js、css、image都存放此目录
app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules",express.static(path.join(__dirname, "node_modules")));


//0.加载服务代理
app.use(proxy());
app.use("/service", proxy.service());

// 载入资源服务
app.use(repository());
app.use("/model", repository.service());

//1.加载session管理
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "y9-wservice-web"
}));
app.use(flash());

//2.加载登录验证管理
passport(app);

//3.加载安全过滤器,注意安全过滤器一定要在业务路由器之前加载.
security(app);

//4.载入路由
router(app);

// 找不到页面
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 错误处理
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('system/error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('system/error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;