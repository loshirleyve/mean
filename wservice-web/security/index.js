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
        failureRedirect: {
            default: "/auth/login",
            weixin: "/auth/loginByWeixinClient"
        }
    }));

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
    

    //角色检查过滤器
    filter.use(security.LocalRoleHandler({
        validRole: function (req, item, done) {
            var instInfo = req["inst"];
            if (item && item.role && item.role.length > 0) {
                if (instInfo && instInfo.role) {
                    if (y9util.Array.contains(item.role, instInfo.role)) {
                        done(true);
                    } else {
                        done(false);
                    }
                } else {
                    done(false);
                }
            } else {
                //当前页面没有限定访问角色
                done(true);
            }
        }
    }));


    //载入过滤配置
    filter.store(filterStore);

    //注册过滤
    filter(app);
}

