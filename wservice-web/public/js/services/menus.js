/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

'use strict';
angular.module('wsweb.service').service('Menus', ['$http',
    function($http) {
        /**
         * 查询菜单
         * @param param 能够传递userId，instId；
         * 可以不传，不传将使用服务器session中的用户信息
         * @returns {HttpPromise}
         */
        this.query = function (param) {
            return $http.post('api/menus',param||{});
        }
    }
]);