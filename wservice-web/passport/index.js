/**
 * Created by leon on 15/10/22.
 */

var passport = require("passport");
var PassportLocal = require("passport-local").Strategy;
var flash = require("express-flash");
var proxy = require("../proxy");
var y9MarsUtil = require("y9-mars-util");
var WeixinStrategy = require("y9-passport-weixin").Strategy;
var debug = require("debug")("y9-wservice-passport");

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

    //配置微信客户端登陆
    passport.use('loginByWeixinClient', new WeixinStrategy({
        clientID: 'wx3f12d479b0082446'
        , clientSecret: 'eb61f0db8aa0403d30e9f9f3fe569af0'
        , callbackURL: 'http://www.yun9.com/auth/loginByWeixinClient'
        , requireState: false
        , authorizationURL: 'https://open.weixin.qq.com/connect/oauth2/authorize' //[公众平台-网页授权获取用户基本信息]的授权URL 不同于[开放平台-网站应用微信登录]的授权URL
        , scope: 'snsapi_userinfo' //[公众平台-网页授权获取用户基本信息]的应用授权作用域 不同于[开放平台-网站应用微信登录]的授权URL
    }, function (accessToken, refreshToken, profile, done) {
        debug("微信单点登录策略回调数据.", accessToken, refreshToken, profile);
        done(null, profile);
    }));

    //配置用户持久化策略
    passport.serializeUser(function (user, done) {
        //TODO 持久化用户的登录日志,最新登录时间等等.
        done(null, user);
    });
    //配置用户读取策略
    passport.deserializeUser(function (user, done) {
        debug("登录获取用户数据.", user);
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

    //在微信客户端登录，使用/auth/loginByWeixinClient
    app.get("/auth/loginByWeixinClient",
        passport.authenticate('loginByWeixinClient', {
            successRedirect: '/app/home',
            failureRedirect: '/login'
        })
    );


    //app.post("/auth", passport.authenticate("local", {
    //    successRedirect: "/app/frame",
    //    failWithError: true, //登录失败后抛出错误
    //    //failureMessage: "登录失败!",
    //    failureFlash: {},
    //    "successReturnToOrRedirect": "/app/frame"
    //}));
};
