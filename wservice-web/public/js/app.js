/**
 * Created by Leon on 15/9/11.
 */

'use strict';

angular.module('wsweb', ['ngRoute', 'wsweb.service','ui-notification'])
    .controller('launchCtrl',
        function ($scope, Menus, Session, menuService, navigationMaster,Notification,wswebProvider,initData) {

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
            };

            if (!initData) {
                return;
            }
            $scope.session = initData[0];
            var self = this;
            // 初始化菜单
            $scope.menus = initData[1];
            navigationMaster.init($scope.menus);
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
                // template中无法异步加载js，这里需要重新激活左侧菜单收起动画
                $.AdminLTE.pushMenu.activate($.AdminLTE.options.sidebarToggleSelector);
                $scope.$apply(function() {
                    self.reloadFromLocal();
                });
            }, 300);


            // 创建Master
            window.$masterService = {
                menuService:menuService,
                notificationService:Notification
            };

        })
    .provider('wswebProvider', function () {
        var config = {

        };
        this.setup = function(cfg) {
            config = cfg||config;
        }
        this.$get = function() {
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
    .config(function(wswebProviderProvider,$routeProvider) {

        $routeProvider.when("/", {
            controller: "launchCtrl as launchCtrl",
            templateUrl: "index.html",
            resolve:{
                initData: ['Menus','Session','$q','Notification',
                    function(Menus,Session,$q,Notification) {
                        return $q.all([Session.load(),Menus.query()]).then(function(data) {
                                return data;
                            }
                            ,function(error) {
                                Notification
                                    .error({message:"请先登录！",delay:2000,positionY:"top",positionX:"center"});
                                setTimeout(function() {
                                    location.href = '/login';
                                },1500);
                                throw error;
                        });
                    }
                ]
            }
        }).otherwise({
            redirectTo: "/"
        });

        /**
         * 配置wsweb
         */
        wswebProviderProvider.setup({
            limitSubWindow:3,
            reloadFromLocal:true
        });
    });

