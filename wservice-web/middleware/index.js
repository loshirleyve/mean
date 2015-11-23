/**
 * Created by leon on 15/11/19.
 */
var debug = require("debug")("wservice-web-middleware-loader");
var fs = require('fs');
var path = require('path');

module.exports = function (app) {
    var files = fs.readdirSync(__dirname + "");

    files.forEach(function (file) {
        var fileStat = fs.statSync(path.join(__dirname, file));

        if (fileStat.isDirectory()) {
            debug("加载目录:/" + file);
            var router = require(path.join(__dirname, file))();
            app.use("/" + file, router);
        }
    });
};