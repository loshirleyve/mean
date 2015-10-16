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

module.exports = function (app) {

    //使用主路由器
    app.use("/", main);

    //认证路由器
    app.use("/auth", auth);


    app.use("/order", order);

    //收款
    app.use("/receivable",receivable);

};