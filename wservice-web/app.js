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
var session = require("express-session");
var passport = require("./passport");
var security = require("./security");
var proxy = require("./proxy");
//var repository = require("./repository");
var instPassport = require("./inst");
var middleware = require("./middleware");
var wx = require("./wx");

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
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use("/dist", express.static(path.join(__dirname, "dist")));

app.use(flash());

//0.加载服务代理
app.use(proxy());
app.use("/service", proxy.service());


//1.加载session管理
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "2a93c70ba62540dfa362a0fa6fe1c293"
}));

//2.加载登录验证管理
passport(app);

//加载机构管理器
instPassport(app);

//3.加载安全过滤器,注意安全过滤器一定要在业务路由器之前加载.
security(app);

//4.载入中间件
middleware(app);

//加载微信API
wx(app);

// 找不到页面
app.use(function (req, res, next) {
    var err = new Error('Not Found ' + req.url);
    err.status = 404;
    next(err);
});

// 错误处理
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        errorHandler(err, req, res, next);
    });
}

app.use(function (err, req, res, next) {
    errorHandler(err, req, res, next);
});

function errorHandler(err, req, res, next) {
    res.status(err.status || 500);
    if (err.name === 'WxAuthenticationerror') {
        //微信认证失败,转发到绑定微信页面
        res.redirect("/mobile/wx/bind");
    } else {
        res.render('sys/error', {
            message: err.message,
            error: {}
        });
    }
}

module.exports = app;
