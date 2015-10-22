/**
 * Created by leon on 15/10/19.
 */

var security = require("y9-mars-security");
var filter = security.Filter();

module.exports = function (app) {

    //注册过滤器处理策略
    //登录验证过滤器
    filter.use(security.LocalLoginHandler());

    //角色检查过滤器
    filter.use(security.LocalRoleHandler());



}

