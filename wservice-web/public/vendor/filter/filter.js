/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

'use strict';
angular.module('y9.filter',['resource'])
    .filter('bizFilter',function($filter,resourceConfig) {
        return function(input,bizConfig) {
            if (angular.isDefined(input) && angular.isDefined(bizConfig)) {
                bizConfig = angular.isObject(bizConfig)?bizConfig:angular.fromJson(bizConfig);
                var bizName = bizConfig.bizName;
                var bizParams = bizConfig.bizParams;
                var filterName = bizConfig.filterName;
                var filterExpression = bizConfig.filterExpression;
                resourceConfig.post(bizName,bizParams,function(data) {
                    //console.log(angular.toJson(data));
                },function(error) {

                });
            }
            return input;
        }
    });