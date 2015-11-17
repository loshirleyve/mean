/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

angular.module('wservice.service').service('Session', ['$http',
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