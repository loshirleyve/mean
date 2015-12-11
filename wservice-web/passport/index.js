/**
 * Created by leon on 15/10/22.
 */

var passport = require("passport");
var PassportLocal = require("passport-local").Strategy;
var flash = require("express-flash");
var proxy = require("../proxy");
var y9MarsUtil = require("y9-mars-util");

module.exports = function (app) {

    //初始化验证环境
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    //配置登录验证策略,此处为本地验证策略

    passport.use("local", new PassportLocal({
            "usernameField": "userno",
            "passwordField": "password"
        },
        function (username, password, done) {
            proxy.post("QueryIdentificationByUsernoAndPasswd")
                .params({userno: username, passwd: password})
                .launch(function (response) {
                    done(null, response.body.data);
                }, function (error) {
                    done(null, false, {
                        message: error.message
                    });
                });
        }));

    //配置用户持久化策略
    passport.serializeUser(function (user, done) {
        //TODO 持久化用户的登录日志,最新登录时间等等.
        done(null, user);
    });
    //配置用户读取策略
    passport.deserializeUser(function (user, done) {
        var dUser = y9MarsUtil.Merge({}, user.user);
        dUser.insts = user.insts;
        done(null, dUser);
    });

    //配置登录访问路由,对应本地登录策略
    app.post("/auth", passport.authenticate("local", {
        successRedirect: "/app/frame",
        failureRedirect: "/auth/login",
        failureFlash: {},
        "successReturnToOrRedirect": "/app/frame"
    }));

    //app.post("/auth", passport.authenticate("local", {
    //    successRedirect: "/app/frame",
    //    failWithError: true, //登录失败后抛出错误
    //    //failureMessage: "登录失败!",
    //    failureFlash: {},
    //    "successReturnToOrRedirect": "/app/frame"
    //}));
};