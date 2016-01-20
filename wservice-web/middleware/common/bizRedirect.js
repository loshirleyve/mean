/*!
 * mars
 * Copyright(c) 2016 huangbinglong
 * MIT Licensed
 */
var passport = require("passport");

var __by_secret_code_param_name = "secretCode";

exports = module.exports = function () {
    var bizMap = {
        "order":"/biz/order#/detail/",
        "contract":"/biz/contract#/detail/"
    };
    return function (req, res, next) {
        var bizType = req.query.bizType;
        var bizPk = req.query.bizPk;
        var secretCode = req.query.secretCode;

        req.query.userno = __by_secret_code_param_name;
        req.query.password = secretCode;
        passport.authenticate("local", {
            successRedirect: bizMap[bizType]+bizPk,
            failureRedirect: "/auth/login",
            failureFlash: {},
            "successReturnToOrRedirect": bizMap[bizType]+bizPk
        })(req,res,next);
    }
};