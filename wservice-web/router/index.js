/*!
 * mars
 * Copyright(c) 2015 Leon Huang
 * MIT Licensed
 */

'use strict';

var main = require("./main");
var auth = require("./auth");
var order = require("./order");
var receivable=require("./receivable");
var product=require("./product");
var client = require("./client");
var file = require("./file");
var login=require("./login");

module.exports = function (app) {

    //使用主路由器
    app.use("/", main);

    //认证路由器
    app.use("/auth", auth);


    app.use("/order", order);


    //收款列表
    app.use("/receivable",receivable);

    //收款详情
    app.use("/receivable/receivalbeDetail",receivable);

    //收款确认
    app.use("/receivable/receivableConfirmation",receivable);

    //产品列表
    app.use("/product",product);

    //产品列表
    app.use("/product/productDetail",product);

    //客户
    app.use("/client", client);

    //文件
    app.use("/file", file);

    //登录
    app.use("/login", login);
};