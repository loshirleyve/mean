/*!
 * mars
 * Copyright(c) 2015 Leon Huang
 * MIT Licensed
 */

'use strict';

var main = require("./main");
var workorder = require("./workorder");
var receivable = require("./receivable");
var product = require("./product");
var file = require("./file");
var inst = require("./inst");

module.exports = function (app) {

    //使用主路由器
    app.use("/", main);

    //工单
    app.use("/workorder", workorder);

    //收款列表
    app.use("/receivable", receivable);

    //产品列表
    app.use("/product", product);

    //文件
    app.use("/file", file);


    //机构
    app.use("/inst", inst);
};