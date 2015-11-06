/*!
 * mars
 * 这是为了简单测试一些js功能所使用的demo
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

'use strict';

angular.module('demoApp',['y9.filter','y9.validate','ui.bootstrap.showErrors'])
.controller('demo1',function($scope) {
        $scope.ordersn = 123;
        $scope.session = {"userid": "10000001498059","instid": "10000001463017"};
        this.submit  = function() {
            $scope.$broadcast('show-errors-check-validity');
            if ($scope.userForm.$valid) {
                console.log($scope.userForm);
            }
        }
});