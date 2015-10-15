/*!
 * mars
 * Copyright(c) 2015 Leon Huang
 * MIT Licensed
 */

'use strict';

var express = require("express");
var router = express.Router();
var debug = require("debug")("wservice-router-index");

router.get("/hello", function (req, res, next) {
    debug("访问/hello");
    res.send("Hello World!");
});




module.exports = router;