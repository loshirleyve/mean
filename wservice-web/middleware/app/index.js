/**
 * Created by leon on 15/11/19.
 */

var express = require("express");
var router = express.Router();
var fs = require('fs');
var path = require('path');


module.exports = function () {

    var files = fs.readdirSync(__dirname + "");

    files.forEach(function (file) {
        var fileStat = fs.statSync(path.join(__dirname, file));

        if (fileStat.isFile()) {
            var name = path.basename(file, ".js");
            var extName = path.extname(file);

            if (extName === ".js" && name && name !== "index") {
                router.get("/" + name, require(path.join(__dirname, file)));
            }
        }
    });
    return router;
};