/*!
 * mars
 * Copyright(c) 2015 Leon Huang
 * MIT Licensed
 */

'use strict';

var main = require("./main");
var auth = require("./auth");

module.exports = function (app) {

    //使用主路由器
    app.use("/", main);

    //认证路由器
    app.use("/auth", auth);


};