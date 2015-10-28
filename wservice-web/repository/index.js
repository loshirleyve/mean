/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

'use strict';


var fs = require('fs');
var rep = require('y9-mars-repository');
var repository = rep.Repository();

var files = fs.readdirSync(__dirname+'/model');
files.forEach(function(filePath){
    var modelFactory = require('./model/'+filePath);
    repository.use(modelFactory)
});

module.exports = repository;