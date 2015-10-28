/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

'use strict';

var WorkorderAnalysisUser = require('./model/WorkorderAnalysisUser');

var rep = require('y9-mars-repository');
var repository = rep.Repository();

repository.use(WorkorderAnalysisUser);

module.exports = repository;