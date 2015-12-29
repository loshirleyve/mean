/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

module.exports = function () {
    return function (req, res, next) {
        var path = req.query.path;
        if (req.isAuthenticated()) {
            res.statusCode = 302;
            res.setHeader('Location', path);
            res.setHeader('Content-Length', '0');
            res.end();
        } else {
            res.render("mobile/wx/redirectMenu", {
                path:path
            });
        }

    }
};