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
    res.render("workorder/workorderList",{
        "title": "工单列表",
        "demo": "你好！"
    });
});

router.get("/workorderDetail", function (req, res, next) {
    res.render("workorder/workorderDetail",{
        "title": "工单详细",
        "demo": "你好！"
    });
});


module.exports = router;