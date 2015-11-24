/**
 * Created by leon on 15/11/20.
 */

/**根据参数或当前用户信息获取用户能够访问的菜单*/

'use strict';
var proxy = require("../../proxy");

exports = module.exports = function () {

    function queryNavByRoleIds(roles,req,res,next) {
        proxy.post("QueryInstRoleNaviService")
            .params({instroleids: roles, device: "web"})
            .launch(function (resp) {
                res.send(resp.body.data);
            }, function (error) {
                next(error);
            });
    }
    return function (req, res, next) {
        /** 获取请求参数*/
        var userId = req.body['userId'];
        var instId = req.body['instId'];

        /**如果没有如此则使用当前登录用户信息*/
        if (!userId && req.isAuthenticated()) {
            userId = req.user.id;
        }

        if (!instId && req.isExisInst()) {
            instId = req.inst.id;
        }

        if (userId && instId) {
            proxy.post("queryInstRolesByUseridAndInstid")
                .params({
                    instid:instId,
                    userid:userId
                }).launch(function (response) {
                    var roles = [];
                    response.body.data.forEach(function(role) {
                        roles.push(role.id);
                    });
                    queryNavByRoleIds(roles,req, res, next);
                }, function (error) {
                    next(error);
                });
        } else {
            res.send([]);
        }

    };
};

exports.type = "post";