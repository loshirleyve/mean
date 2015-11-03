/*!
 * mars
 * Copyright(c) 2015 Leon Huang
 * MIT Licensed
 */

'use strict';

var main = require("./main");
var auth = require("./auth");
var order = require("./app/order");
var workorder = require("./workorder");
var receivable = require("./receivable");
var product = require("./app/product");
var client = require("./client");
var file = require("./file");
var login = require("./login");
var api = require("./api");

module.exports = function (app) {

    //使用主路由器
    app.use("/", main);

    //认证路由器
    app.use("/auth", auth);

    app.use("/app/order", order);

    app.use("/order", order);

    //工单
    app.use("/workorder", workorder);

    //收款列表
    app.use("/receivable", receivable);

    //产品列表
    app.use("/app/product", product);

    //客户
    app.use("/client", client);

    //文件
    app.use("/file", file);

    //登录
    app.use("/login", login);

    //API
    app.use("/api", api);
};