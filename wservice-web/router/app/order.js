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
    res.render("app/order/order");
});


module.exports = router;