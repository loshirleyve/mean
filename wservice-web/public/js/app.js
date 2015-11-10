/**
 * Created by Leon on 15/9/11.
 */

'use strict';

angular.module('wsweb', ['ngRoute', 'wsweb.service','ui-notification'])
    .controller('launchCtrl',
    ['$scope', 'Menus', 'Session', 'menuService', 'navigationMaster','Notification','wswebProvider','$q',
        function ($scope, Menus, Session, menuService, navigationMaster,Notification,wswebProvider) {

            this.navigateTo = function (menuNo) {
                menuService.navigateTo(menuNo);
            }

            this.changeTab = function (menuNo) {
                menuService.navigateTo(menuNo);
            }

            this.closeWindow = function (menuNo, $event) {
                if ($event.stopPropagation) {
                    $event.stopPropagation();
                }
                menuService.closeWindow(menuNo);
            }

            /**
             * 从缓存中获取配置，加载程序
             */
            this.reloadFromLocal = function() {
                if (wswebProvider.get('reloadFromLocal')
                    && store) {
                    var self = this;
                    // 恢复打开的菜单
                    var storeMenu = menuService.getStoreMenus()||{};
                    if (storeMenu && storeMenu.menus) {
                        storeMenu.menus.forEach(function(menuNo) {
                            self.navigateTo(menuNo);
                        });
                        if (storeMenu.focusMenu) {
                            self.changeTab(storeMenu.focusMenu);
                        }
                    }
                }
            }

            var self = this;
            wswebProvider.loadMenu()
            .then(function (response) {
                navigationMaster.init(response.data);
                $scope.menus = response.data;
                $scope.singleWindow = navigationMaster.singleWindow;
                $scope.tabs = navigationMaster.subWindows;
                $scope.iframes = angular.copy(navigationMaster.subWindows);// 取消关联
                $scope.$watch(function() {
                    return navigationMaster.currentFocus;
                },function() {
                    menuService.focusMenus();
                });
                // 如果获取界面绘制完成的事件？
                setTimeout(function () {
                    $scope.iframes.forEach(function (win) {
                        $("#" + win.sid).load(function () {
                            $("#" + win.sid).contents().find("body").attr("onclick",
                                "window.parent.document.body.click();");
                        });
                    });
                }, 300);
            }).then(function() {
                return wswebProvider.loadSession() .then(function (response) {
                    $scope.session = response.data;
                });
            }).then(function() {
                self.reloadFromLocal();
            },function () {
                // 跳转到登录界面
                location.href = '/login';
            });



            // 创建Master
            window.$masterService = {
                menuService:menuService,
                notificationService:Notification
            };

        }])
    .provider('wswebProvider', function () {
        var config = {

        };
        this.setup = function(cfg) {
            config = cfg||config;
        }
        this.$get = function(Menus,Session) {
            var service = {
                getConfig:function() {
                    return angular.copy(config);
                },
                get:function(key) {
                    return config[key];
                },
                loadMenu:function() {
                    return Menus.query();
                },
                loadSession:function() {
                    return Session.load();
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
            reloadFromLocal:true
        });
    });

