/**
 * Created by leon on 15/11/19.
 */
var debug = require("debug")("y9-wservice-web-middleware-loader");
var fs = require('fs');
var path = require('path');

module.exports = function (app) {
    function builder(dirname, parentPath) {
        var files = fs.readdirSync(dirname);

        files.forEach(function (file) {
            var fileStat = fs.statSync(path.join(dirname, file));

            if (fileStat.isDirectory()) {
                debug("加载目录:/" + file);
                var router = require(path.join(dirname, file));
                var routerFn = router();
                var paths = [];
                var childPath = undefined;

                //如果存在上级目录则加入上级目录
                if (parentPath) {
                    paths.push(parentPath + "/" + file);
                    childPath = parentPath + "/" + file;
                } else {
                    paths.push("/" + file);
                    childPath = "/" + file;
                }

                if (router.otherPaths) {
                    paths = paths.concat(router.otherPaths);
                }

                paths.forEach(function (pathValue) {
                    debug("载入中间件:" + pathValue);
                    app.use(pathValue, routerFn);
                });

                //加载子目录
                builder(dirname + "/" + file, childPath);
            }
        });
    }

    //递归加载子目录
    builder(__dirname + "");
};