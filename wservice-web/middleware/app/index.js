/**
 * Created by leon on 15/11/19.
 */

var loader = require("../loader");

exports = module.exports = function () {
    return loader(__dirname);
};

exports.otherPaths = ["/"];