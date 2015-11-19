/**
 * Created by leon on 15/10/19.
 */

var security = require("y9-mars-security");
var filter = security.Filter();
var filterStore = require("./filter-store");
var debug = require("debug")("wservice-web-security")

module.exports = function (app) {

    //注册过滤器处理策略
    //登录验证过滤器
    filter.use(security.LocalLoginHandler());

    //角色检查过滤器
    filter.use(security.LocalRoleHandler());

    //机构验证
    filter.use(security.LocalInstHandler({
        validInst: function (req, item, done) {
            debug("开始检查是机构信息.");
            done(true);
        }
    }));

    //载入过滤配置
    filter.store(filterStore);

    //注册过滤
    filter(app);
}

