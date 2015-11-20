/**
 * Created by leon on 15/11/19.
 */

var fs = require('fs');
var path = require('path');

module.exports = function (app) {
    var files = fs.readdirSync(__dirname + "");

    files.forEach(function (file) {
        var fileStat = fs.statSync(path.join(__dirname, file));

        if (fileStat.isDirectory()) {
            app.use("/" + file, require(path.join(__dirname, file))());
        }
    });
};