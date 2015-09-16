/**
 * 安全管理器，主要负责用户验证、角色检查、路由拦截
 *
 * Created by Leon on 15/9/15.
 */

var express = require('express');
var router = express.Router();
var debug = require('debug')('mars-security');
var FilterStore = require("./mars-security-filter-fs.js");
var FilterHandler = require("./mars-security-filter-handler.js");

var filterStore;
var filterHandler;

exports = module.exports = {
    configure: configure,
    filter: filter
}

function configure(options) {
    debug("安全框架配置加载");
    var options = options || {}
        , root = options.root || "/";

    //记录过滤存储器
    filterStore = options.filterStore || new FilterStore();

    //初始化处理器
    filterHandler = options.filterHandler || new FilterHandler();

    return function (req, res, next) {
        next();
    }
}

//过滤检查用户是否登录，以及当前访问路径是否服务安全规范
function filter(app, options) {
    //初始化验证器
    debug("安全框架过滤器加载。");

    //注册配置的路由过滤
    var config = filterStore.filterConfig;

    if (config.all) {
        config.all.forEach(function (item) {
            debug("开始注册all安全过滤路径:" + item.path);
            router.all(item.path, function (req, res, next) {
                filterHandler.handler(req, res, next, item);
            });
        });
    }

    if (config.get) {
        config.get.forEach(function (item) {
            debug("开始注册get安全过滤路径:" + item.path);
            router.get(item.path, function (req, res, next) {
                filterHandler(req, res, next, item);
            });
        });
    }

    if (config.post) {
        config.post.forEach(function (item) {
            debug("开始注册post安全过滤路径:" + item.path);
            router.post(item.path, function (req, res, next) {
                filterHandler(req, res, next, item);
            });
        });
    }

    //路由添加到应用
    app.use("/", router);

    return function (req, res, next) {
        //初始化用户信息，如果没有用户信息则默认设置user角色
        debug("进入验证器!当前访问路径:" + req.originalUrl);
        next();
    }


}

