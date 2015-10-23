/*!
 * mars
 * Copyright(c) 2015 Leon Huang
 * MIT Licensed
 */

'use strict';

var express = require("express");
var router = express.Router();

/**
 * 订单列表路由
 */
router.get("/", function (req, res, next) {

    //查询订单列表
    req.y9proxy
        .post("queryOrderList")
        .params({
            "instid": "10000001468002",
            "userid": "10000001498059"
        })
        .launch(function (result) {
            res.render("app/order/orderList", result.body);
        }, function (error) {
            res.render("app/order/orderList", {
                "title": "订单列表",
                "demo": "你好！"
            });
        }, function () {

        });
});


module.exports = router;