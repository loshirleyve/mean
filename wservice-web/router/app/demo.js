/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

'use strict';
var express = require("express");
var router = express.Router();

/**
 * 测试界面
 */
router.get("/", function (req, res, next) {
    res.render("app/demo/demo");
});


module.exports = router;