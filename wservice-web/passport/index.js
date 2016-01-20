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
var WxAuthenticationerror = require("../errors/WxAuthenticationerror");

var __by_secret_code_param_name = "secretCode";

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

            // 将加密串解析成json
            function secretCodeToJson(secretCode) {
                if (!secretCode) {
                    return {};
                }
                try {
                    var json = JSON.parse(new Buffer(secretCode, 'base64').toString());
                    if (json.userno && json.date &&
                        json.date.substring(0,8) == (new Date().getTime()+'').substring(0,8)) {
                        return json;
                    }
                } catch (e) {
                    debug(e);
                    return {};
                }
                return {};
            }

            if (username == __by_secret_code_param_name) { // 如果使用加密串登录
                var json = secretCodeToJson(password);
                if (!json.userno) {
                    done(null, false, {
                        message: "无效的加密串"
                    });
                    return;
                }
                proxy.post("QueryUserByUserNo")
                    .params({userno: json.userno})
                    .launch(function (response) {
                        done(null, response.body.data);
                    }, function (error) {
                        done(null, false, {
                            message: error.message
                        });
                    });
            } else {
                proxy.post("QueryIdentificationByUsernoAndPasswd")
                    .params({userno: username, passwd: password})
                    .launch(function (response) {
                        var user = response.body.data.user;
                        user.insts = response.body.data.insts;
                        done(null, user);
                    }, function (error) {
                        done(null, false, {
                            message: error.message
                        });
                    });
            }


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
        debug("微信客户端登录回调数据.", accessToken, refreshToken, profile);
        //通过openid查找用户信息,如果找不到用户信息,则抛出异常,需要用户绑定微信.
        proxy.post("QueryUserByWxInfo")
            .params({unionid: profile.id})
            .launch(function (response) {
                if (response.body.data) {
                    debug("通过微信Unionid获取的用户信息.", response.body.data);
                    done(null, response.body.data);
                } else {
                    done(new WxAuthenticationerror("无法获取用户信息", profile), profile);
                }
            }, function (error) {
                debug("无法通过微信unionid获取用户信息.", error)
                done(new WxAuthenticationerror("无法获取用户信息", profile), profile);
            });
    }));

    //配置用户持久化策略
    passport.serializeUser(function (user, done) {
        //TODO 持久化用户的登录日志,最新登录时间等等.
        done(null, user);
    });
    //配置用户读取策略
    passport.deserializeUser(function (user, done) {
        debug("登录获取用户数据.", user);
        done(null, user);
    });

    //配置登录访问路由,对应本地登录策略
    app.post("/auth", passport.authenticate("local", {
        successRedirect: "/app/frame",
        failureRedirect: "/auth/login",
        failureFlash: {},
        "successReturnToOrRedirect": "/"
    }));

    //在微信客户端登录，使用/auth/loginByWeixinClient
    app.get("/auth/loginByWeixinClient",
        passport.authenticate('loginByWeixinClient', {
            successRedirect: '/app/home',
            failureRedirect: '/auth/login',
            "successReturnToOrRedirect": "/app/home"
        })
    );

    //检查是否发生了微信认证错误
    app.use(function (err, req, res, next) {
        if (err.name === 'WxAuthenticationerror') {
            debug("微信认证失败,转发到绑定微信页面", err);
            //微信认证失败,转发到绑定微信页面
            //将微信认证信息记录到Session
            if (err.wxprofile) {
                req.session.y9WxProfile = err.wxprofile;
                res.redirect("/mobile/wx/bind");
            } else {
                next(error);
            }

        } else {
            next(err);
        }
    });
};
