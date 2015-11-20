/*!
 * mars
 * Copyright(c) 2015 Leon Huang
 * MIT Licensed
 */

'use strict';

var main = require("./main");
var file = require("./file");

module.exports = function (app) {

    //使用主路由器
    app.use("/", main);

    //文件
    app.use("/file", file);

};