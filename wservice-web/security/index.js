/**
 * Created by leon on 15/10/19.
 */

var security = require("y9-mars-security");
var filter = security.Filter();
var filterStore = require("./filter-store");
var debug = require("debug")("y9-wservice-web-security")

module.exports = function (app) {

    //注册过滤器处理策略
    //登录验证过滤器
    filter.use(security.LocalLoginHandler({
        validLogin: function (req, item, done) {
            if (req.isAuthenticated()) {
                done(true);
            } else {
                //检查登录没有通过,记录原始路径,在登录成功后跳转回原访问路径
                if (req.session) {
                    req.session.returnTo = req.originalUrl;
                }
                done(false);
            }
        },
        failureRedirect: "/auth/login"
    }));

    //角色检查过滤器
    filter.use(security.LocalRoleHandler());

    //机构验证
    filter.use(security.LocalInstHandler({
        validInst: function (req, item, done) {
            debug("开始检查是机构信息.");
            if (req.isExisInst()) {
                done(true);
            } else {
                //检查机构没有通过,记录原始路径,在登录成功后跳转回原访问路径
                if (req.session) {
                    req.session.returnTo = req.originalUrl;
                }
                done(false);
            }
        },
        failureRedirect: "/inst/select"
    }));

    //载入过滤配置
    filter.store(filterStore);

    //注册过滤
    filter(app);
}

