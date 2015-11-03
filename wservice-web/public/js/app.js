/**
 * Created by Leon on 15/9/11.
 */

'use strict';

angular.module('wsweb', ['ngRoute', 'wsweb.service'])
    .controller('launchCtrl', ['$scope', 'Menus', 'Session'
        , function ($scope, Menus, Session) {
            console.log('launchCtrl....');
            Session.load().then(function (response) {
                $scope.session = response.data;
            }, function (response) {
                // 查询登录信息错误，跳转到登录界面
                location.href = '/login';
            });
        }]);

