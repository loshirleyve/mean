/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

module.exports = function () {
    return function (req, res, next) {
        var path = req.body['path'];
        next(path);
    }
};