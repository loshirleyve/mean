/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

'use strict';
angular.module('wsweb.service',['ngResource']).factory('Menus', ['$resource',
    function($resource) {
        return $resource('api/menu/:name', {
            name: '@name',
            defaultMenu: '@defaultMenu'
        });
    }
]);