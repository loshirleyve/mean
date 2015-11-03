/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

'use strict';

module.exports = function (router) {

    /**根据参数或当前用户信息获取用户能够访问的菜单*/
    router.all('/menus', function (req, res, next) {
        /** 获取请求参数*/
        var userId = req.body['userId'];
        var instId = req.body['instId'];
        /**如果没有如此则使用当前登录用户信息*/
        if (!userId && req.isAuthenticated()){
            userId = req.user.id;
            instId = req.user.instId;
        }
        if (!userId || !instId) {
            throw new Error('无法获取参数：userId跟instId');
        }
        var menus = [{
            "id": "100",
            "name": "订单管理",
            "no": "orderManagement",
            "mainurl": "#",
            "type": "external",
            "sort": 6,
            "navigationItems": [
                {
                    "id": "102",
                    "name": "订单列表",
                    "no": "orderList",
                    "mainurl": "/order",
                    "type": "link",
                    "sort": 2
                }, {
                    "id": "103",
                    "name": "订单列表2",
                    "no": "orderList2",
                    "mainurl": "/order",
                    "type": "link",
                    "sort": 2
                }, {
                    "id": "104",
                    "name": "订单列表3",
                    "no": "orderList3",
                    "mainurl": "/order",
                    "type": "link",
                    "sort": 2
                }
            ]
        }, {
            "id": "101",
            "name": "客户管理",
            "no": "clientManagement",
            "mainurl": "#",
            "type": "external",
            "sort": 6,
            "navigationItems": [
                {
                    "id": "102",
                    "name": "客户列表",
                    "no": "clientList",
                    "mainurl": "/client",
                    "type": "link",
                    "sort": 2
                }
            ]
        }, {
            "id": "101",
            "name": "工单管理",
            "no": "workorderManagement",
            "mainurl": "#",
            "type": "external",
            "sort": 6,
            "navigationItems": [
                {
                    "id": "102",
                    "name": "工单列表列表",
                    "no": "workorderList",
                    "mainurl": "/workorder",
                    "type": "link",
                    "sort": 2
                }, {
                    "id": "102",
                    "name": "工单列表列表2",
                    "no": "workorderList2",
                    "mainurl": "/workorder",
                    "type": "link",
                    "sort": 2
                }, {
                    "id": "102",
                    "name": "工单列表列表3",
                    "no": "workorderList3",
                    "mainurl": "/workorder",
                    "type": "link",
                    "sort": 2
                }
            ]
        }];
        res.json(menus);
    });

};