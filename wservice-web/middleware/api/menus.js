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

        /**如果没有如此则使用当前登录用户信息*/

        if (!userId && req.isAuthenticated()) {
            userId = req.user.id;
            instId = req.user.instId || '2';// TODO 现在没有缓冲机构信息
        }
        if (userId && instId) {
            proxy.post("QueryInstRoleNaviService")
                .params({instroleids: ["10000001468003"], device: "web"})
                .launch(function (response) {
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