/**
 * Created by leon on 15/10/22.
 */

var passport = require("passport");
var PassportLocal = require("passport-local").Strategy;

module.exports = function (app) {

    //初始化验证环境
    app.use(passport.initialize());
    app.use(passport.session());

    //配置登录验证策略,此处为本地验证策略
    passport.use("local", new PassportLocal({
            "usernameField": "userno",
            "passwordField": "password"
        },
        function (username, password, done) {
            //TODO 此处验证用户密码是否正确,目前写入伪代码

            var user = {
                id: "1",
                username: "admin",
                password: "pass",
                role: ["user", "admin"]
            }

            if (username !== user.username) {
                return done(null, false, {
                    message: "登录失败!你输入的用户编号不存在."
                });
            }

            if (password !== user.password) {
                return done(null, false, {
                    message: "登录失败!你输入的用户密码错误."
                });
            }

            done(null, user);
        }));

    //配置用户持久化策略
    passport.serializeUser(function (user, done) {
        //TODO 持久化用户的登录日志,最新登录时间等等.
        done(null, user);
    });
    //配置用户读取策略
    passport.deserializeUser(function (user, done) {
        //TODO 根据用户编号,检索用户信息,相关机构信息等.
        done(null, user);
    });

    //配置登录访问路由,对应本地登录策略
    app.post("/auth", passport.authenticate("local", {
        successRedirect: "/home",
        failureRedirect: "/login",
        failureFlash: true
    }));
}