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
var session = require("./session");
var passport = require("./passport");
var security = require("./security");
var proxy = require("./proxy");

//设置视图引擎
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//设置应用程序图图标
//app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

//设置public目录为前端资源公共目录,包括前端js、css、image都存放此目录
app.use(express.static(path.join(__dirname, "public")));

//0.加载服务代理
app.use(proxy());

//TODO 测试发布服务,需要进行整合,同步开发angularjs客户端调用组件
app.use("/service", function (req, res, next) {
    //查询订单列表
    req.y9proxy
        .post("queryOrderList")
        .params({
            "instid": "10000001468002",
            "userid": "10000001498059"
        })
        .launch(function (result) {
            res.send(result.body);
        }, function (error) {
            res.send(error);
        }, function () {

        });
});

//1.加载session管理
session(app);
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