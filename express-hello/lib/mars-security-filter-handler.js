/**
 * Created by Leon on 15/9/15.
 */

var debug = require("debug")("mars-security")

module.exports = FilterHandler

function FilterHandler() {

}

FilterHandler.prototype.handler = function (req, res, next, item) {
    debug("安全过滤处理器." + req.originalUrl);

    //检查是否要求登录系统
    if (item.needLogin) {
        debug("路径:" + item.path + ",要求登录系统，开始检查登录信息.");
    } else {
        debug("路径:" + item.path + ",不要求登录系统，跳过检查.")
    }

    next();
}