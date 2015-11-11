/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

'use strict';
angular.module('wsweb.service').service('Session', ['$http',
    function($http) {
        /**
         * 加载session数据
         * @returns {HttpPromise}
         */
        this.load = function() {
            return $http({
                method: 'POST',
                url: 'api/session'
            }).then(function(response) {
                return response.data;
            });
        }
    }
]);