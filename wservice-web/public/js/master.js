/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

'use strict';
angular.module('master',[])
    .service('masterService',function() {
        if (window.parent && window.parent.$masterService) {
            angular.copy(window.parent.$masterService,this);
        }
    });