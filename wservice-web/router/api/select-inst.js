/*!
 * wservice-web
 * Copyright(c) 2015 Leon
 * MIT Licensed
 */

module.exports = function (router) {

    router.get("/select-inst", function (req, res, next) {
        res.render("system/select-inst");
    });
};