/**
 * Created by Leon on 15/9/14.
 */
'use strict'

var config = require("./config.js")

module.exports = common;

function common(options) {
    return function (req, res, next) {
        res.locals.options = options;
        res.locals.platform = config.platform;
        res.locals.inst = builderInst(req, res);
        next();
    }
}

function builderInst(req, res) {
    var inst = {
        "id": "123456",
        "sn": "djkj",
        "name": "深圳市顶聚科技有限公司",
        "simpleName": "顶聚科技"
    };
    return inst;
}