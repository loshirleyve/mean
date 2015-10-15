/*!
 * mars
 * Copyright(c) 2015 Leon Huang
 * MIT Licensed
 */

'use strict';

var express = require("express");
var router = express.Router();
var debug = require("debug")("wservice-router-index");


router.get("/home", function (req, res, next) {
    res.render("home");
});


module.exports = router;