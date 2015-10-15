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
    res.render("order/orderList",{
        "title": "订单列表",
        "demo": "你好！"
    });
});


module.exports = router;