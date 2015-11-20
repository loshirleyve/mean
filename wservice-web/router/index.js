/*!
 * mars
 * Copyright(c) 2015 Leon Huang
 * MIT Licensed
 */

'use strict';

var main = require("./main");
var receivable = require("./receivable");
var product = require("./product");
var client = require("./client");
var file = require("./file");

module.exports = function (app) {

    //使用主路由器
    app.use("/", main);

    //收款列表
    app.use("/receivable", receivable);

    //产品列表
    app.use("/product", product);

    //客户
    app.use("/client", client);

    //文件
    app.use("/file", file);

};