/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

'use strict';

var express = require("express");
var router = express.Router();
var fs = require('fs');

var files = fs.readdirSync(__dirname+'');
files.forEach(function(filePath){
    if (filePath != 'index.js' && filePath.indexOf(".js") > 0) {
        require('./'+filePath)(router);
    }
});

module.exports = router;