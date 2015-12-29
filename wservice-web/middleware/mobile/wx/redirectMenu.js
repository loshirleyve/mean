/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

module.exports = function () {
    return function (req, res, next) {
        var path = req.param('path');
        res.statusCode = 302;
        res.setHeader('Location', path);
        res.setHeader('Content-Length', '0');
        res.end();
    }
};