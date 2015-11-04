/**
 * Created by Leon on 15/9/11.
 */

'use strict';

angular.module('wsweb', ['ngRoute', 'wsweb.service'])
    .controller('launchCtrl', ['$scope', 'Menus', 'Session', 'menuService', 'navigationMaster',
        function ($scope, Menus, Session, menuService, navigationMaster,message) {

            this.navigateTo = function (menuNo) {
                menuService.navigateTo(menuNo);
            }

            this.changeTab = function (menuNo) {
                menuService.changeTab(menuNo);
            }

            this.closeWindow = function (menuNo, $event) {
                if ($event.stopPropagation) {
                    $event.stopPropagation();
                }
                menuService.closeWindow(menuNo);
            }

            Menus.query().then(function (response) {
                navigationMaster.init(response.data);
                $scope.menus = response.data;
                $scope.singleWindow = navigationMaster.singleWindow;
                $scope.subWindows = navigationMaster.subWindows;
                // 如果获取界面绘制完成的事件？
                setTimeout(function () {
                    $scope.subWindows.forEach(function (win) {
                        $("#" + win.sid).load(function () {
                            $("#" + win.sid).contents().find("body").attr("onclick",
                                "window.parent.document.body.click();");
                        });
                    });
                }, 300);
            }, function (response) {
                // 查询登录信息错误，跳转到登录界面
                location.href = '/login';
            });

            Session.load().then(function (response) {
                $scope.session = response.data;
            }, function (response) {
                // 查询登录信息错误，跳转到登录界面
                location.href = '/login';
            });

            // 创建Master
            window.$masterService = {
                menuService:menuService,
                messageService:message
            };

        }])
    .provider('wswebProvider', function () {
        var config = {

        };
        this.setup = function(cfg) {
            config = cfg||config;
        }
        this.$get = function($http) {
            var service = {
                getConfig:function() {
                    return angular.copy(config);
                },
                get:function(key) {
                    return config[key];
                }
            };
            return service;
        }
    })
    .config(function(wswebProviderProvider) {
        /**
         * 配置wsweb
         */
        wswebProviderProvider.setup({
            limitSubWindow:3,
            messageDiv:'message_alert',
            autoDismissMessage:true,
            dismissMessageTimeout:3000
        });
    });

