/**
 * Created by leon on 15/11/20.
 */

/**根据参数或当前用户信息获取用户能够访问的菜单*/

'use strict';
var proxy = require("../../proxy");

exports = module.exports = function () {

    return function (req, res, next) {
        /** 获取请求参数*/
        var userId = req.body['userId'];
        var instId = req.body['instId'];
        var device = req.body['device'] || "web";

        /**如果没有如此则使用当前登录用户信息*/
        if (!userId && req.isAuthenticated()) {
            userId = req.user.id;
        }

        if (!instId && req.isExisInst()) {
            instId = req.inst.id;
        }

        if (userId && instId) {
            proxy.post("QueryInstRoleNaviByUseridAndInstidAndDevice")
                .params({
                    instid:instId,
                    userid:userId,
                    device:device
                }).launch(function (response) {
                    res.send(response.body.data);
                }, function (error) {
                    next(error);
                });
        } else {
            res.send([]);
        }

    };
};

exports.type = "post";