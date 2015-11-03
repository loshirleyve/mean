/**
 * Created by Leon on 15/9/11.
 */

'use strict';

angular.module('wsweb', ['ngRoute', 'wsweb.service'])
    .controller('launchCtrl', ['$scope', 'Menus', 'Session', 'menuService', 'navigationMaster',
        function ($scope, Menus, Session, menuService, navigationMaster) {

            this.navigateTo = function (menuNo) {
                menuService.navigateTo(menuNo);
            }

            this.changeTab = function (menuNo) {
                navigationMaster.navigateTo(menuNo);
            }

            this.closeWindow = function (menuNo,$event) {
                if ($event.stopPropagation) {
                    $event.stopPropagation();
                }
                navigationMaster.closeWindow(menuNo);
            }

            Menus.query({userId: '10086', instId: '2'}).then(function (response) {
                navigationMaster.init(response.data);
                $scope.menus = response.data;
                $scope.singleWindow = navigationMaster.singleWindow;
                $scope.subWindows = navigationMaster.subWindows;
                // 如果获取界面绘制完成的事件？
                setTimeout(function() {
                    $scope.subWindows.forEach(function(win) {
                        $("#" + win.sid).load(function () {
                            $("#" + win.sid).contents().find("body").attr("onclick",
                                "window.parent.document.body.click();");
                        });
                    });
                },300);
            });

            Session.load().then(function (response) {
                $scope.session = response.data;
            }, function (response) {
                // 查询登录信息错误，跳转到登录界面
                location.href = '/login';
            });

        }]);

