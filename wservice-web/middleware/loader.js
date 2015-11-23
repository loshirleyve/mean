var express = require("express");
var fs = require('fs');
var path = require('path');
var debug = require("debug")("wservice-web-middleware-loader");

module.exports = function (currDir) {

    var files = fs.readdirSync(currDir + "");
    var router = express.Router();

    files.forEach(function (file) {
        var fileStat = fs.statSync(path.join(currDir, file));

        if (fileStat.isFile()) {
            var name = path.basename(file, ".js");
            var extName = path.extname(file);

            if (extName === ".js" && name && name !== "index") {
                var middleware = require(path.join(currDir, file));
                var type = middleware.type || "get";
                var types = [];
                var paths = ["/" + name];

                if (type instanceof Array) {
                    types = types.concat(type);
                } else {
                    types.push(type);
                }

                if (middleware.otherPaths) {
                    paths = paths.concat(middleware.otherPaths);
                }

                types.forEach(function (itemType) {
                    if (itemType === "get") {
                        paths.forEach(function (pathValue) {
                            debug("正在加载中间件(get):" + pathValue);
                            router.get(pathValue, middleware());
                        });
                    } else if (itemType === "post") {
                        paths.forEach(function (pathValue) {
                            debug("正在加载中间件(post):" + pathValue);
                            router.post(pathValue, middleware());
                        });
                    }
                });
            }
        }
    });
    return router;
};