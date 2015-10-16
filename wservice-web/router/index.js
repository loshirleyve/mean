/*!
 * mars
 * Copyright(c) 2015 Leon Huang
 * MIT Licensed
 */

'use strict';

var main = require("./main");
var auth = require("./auth");
var order = require("./order");
<<<<<<< HEAD
var receivable=require("./receivable");
var product=require("./product");
=======
var client = require("./client");
var file = require("./file");
>>>>>>> dev-shirley

module.exports = function (app) {

    //使用主路由器
    app.use("/", main);

    //认证路由器
    app.use("/auth", auth);


    app.use("/order", order);

<<<<<<< HEAD
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

=======
    app.use("/client", client);

    app.use("/file", file);
>>>>>>> dev-shirley
};