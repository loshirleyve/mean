/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

'use strict';
var proxy = require("../../proxy");
module.exports = function (router) {

    /**根据参数或当前用户信息获取用户能够访问的菜单*/
    router.all('/menus', function (req, res, next) {
        /** 获取请求参数*/
        var userId = req.body['userId'];
        var instId = req.body['instId'];
        /**如果没有如此则使用当前登录用户信息*/
        if (!userId && req.isAuthenticated()){
            userId = req.user.id;
            instId = req.user.instId||'2';// TODO 现在没有缓冲机构信息
        }
        if (!userId || !instId) {
            throw new Error('无法获取参数：userId跟instId');
        }
        proxy.post("QueryInstRoleNaviService")
            .params({instroleids:["10000001468003"],device:"web"})
            .launch(function(response) {
                res.json(response.body.data);
            },function(error) {
                next(error);
            });
    });

};