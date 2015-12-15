/**
 * Created by leon on 15/11/20.
 */

angular.module("wservice.web.home", ["ui.neptune", "ngRoute", "wservice.common"])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/home/:id", {
                controller: "MainController as vm",
                templateUrl: "home.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/home", {
                controller: "MainController as vm",
                templateUrl: "home.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .otherwise({
                redirectTo: "/home"
            });

    })
    .factory("QueryMsgsUnReadByUserid", function(nptRepository, nptSessionManager){
        return nptRepository("QueryMsgsUnReadByUserid").params({
            "userid":nptSessionManager.getSession().getUser().id
        })
    })
    .factory("QueryWorkorderStateNum", function(nptRepository, nptSessionManager){
        return nptRepository("QueryWorkorderStateNum").params({
            "instid":nptSessionManager.getSession().getInst().id,
            "processid":nptSessionManager.getSession().getUser().id
        })
    })
    .factory("queryFileById", function(nptRepository){
        return nptRepository("QueryFileById");
    })
    .factory("NavigateMenu", function ($http, $location, $routeParams) {
        var self = {
            init: function () {
                //查询当前用户的菜单信息.
                $http.post("/api/menus", {}).then(function (response) {
                    self.menus = response.data;

                    //获取当前显示页面
                    var id = $routeParams.id;

                    if (id) {
                        //查找菜单
                        var menuItem = self.findByName(id);
                        if (menuItem) {
                            self.navigateTo(menuItem);
                        }
                    }
                }).then(function() {
                    //$.AdminLTE.layout.fixSidebarHeight(true);
                });
            },
            navigateTo: function navigateTo(item) {
                if (item && item.actionvalue && item.actiontype === "link") {
                    self.moduleUrl = item.actionvalue;
                    self.setFocus(item);
                    $location.path("/home/" + item.no,false);
                }
            },
            navigateToUrl: function navigateTo(url) {
                if (url) {
                    self.moduleUrl = url;
                    self.setFocus();
                }
            },
            findByName: function (name) {
                var tempMenuItem;
                angular.forEach(self.menus, function (menu) {
                    if (menu.items) {
                        angular.forEach(menu.items, function (menuItem) {
                            if (menuItem.no === name) {
                                tempMenuItem = menuItem;
                            }
                        });
                    }
                });
                return tempMenuItem;
            },
            setFocus: function (item) {
                //将所有设置为非选择状态
                angular.forEach(self.menus, function (menu) {
                    menu.selected = false;
                    if (menu.items) {
                        angular.forEach(menu.items, function (menuItem) {
                            menuItem.selected = false;
                        });
                    }
                });

                if (item) {
                    //设置当前选择项
                    angular.forEach(self.menus, function (menu) {
                        var parent = menu;
                        if (menu.items) {
                            angular.forEach(menu.items, function (menuItem) {
                                if (item.no === menuItem.no) {
                                    parent.selected = true;
                                    menuItem.selected = true;
                                }
                            });
                        }
                    });
                }
            },
            menus: [],
            moduleUrl: "/app/home"
        };
        //初始化菜单
        self.init();
        return self;
    })
    .controller("MainController", function ($scope, sessionData, NavigateMenu, queryFileById, QueryMsgsUnReadByUserid, QueryWorkorderStateNum) {
        var vm = this;

        vm.queryMsgsUnRead = QueryMsgsUnReadByUserid;
        vm.workorderStateNum = QueryWorkorderStateNum;

        vm.queryMsgsUnRead.post().then(function(response){
           vm.msgsUnRead = response.data.length;
        });

        vm.workorderStateNum.post().then(function(response){
           angular.forEach(response.data, function(value){
               switch (value.state){
                   case 'unstart':
                       vm.unStart = value.num;
                       break;
                   case 'inservice':
                       vm.inService = value.num;
                       break;
                   case 'complete':
                       vm.complete = value.num;
                       break;
               }
           })
        });

        vm.imageOptions = {
            repository: queryFileById,
            searchProp: "fileid",
            labelProp: "fileUrl"
        };

        vm.navigateMenu = NavigateMenu;

        vm.brand = {
            user: undefined,
            inst: undefined,
            init: function init() {
                var self = this;
                this.user = sessionData.getUser();
                this.inst = sessionData.getInst();
            }
        };

        vm.profile = {
            user: undefined,
            inst: undefined,
            init: function () {
                var self = this;
                this.user = sessionData.getUser();
                this.inst = sessionData.getInst();
            }
        };

        //初始化
        vm.brand.init();
        vm.profile.init();

        // template中无法异步加载js，这里需要重新激活左侧菜单收起动画
        $.AdminLTE.pushMenu.activate($.AdminLTE.options.sidebarToggleSelector);
    }).run(function($rootScope,$location,$route) {
        var original = $location.path;
        $location.path = function (path, reload) {
            if (reload === false) {
                var lastRoute = $route.current;
                var un = $rootScope.$on('$locationChangeSuccess', function () {
                    $route.current = lastRoute;
                    un();
                });
            }
            return original.apply($location, [path]);
        };

        //$("body").bind("expanded.pushMenu",function(event) {
        //    if ($.AdminLTE.options.popMenus){
        //        $.AdminLTE.layout.fixSidebarHeight(true);
        //    }
        //});
        //$("body").bind("collapsed.pushMenu",function(event) {
        //    if ($.AdminLTE.options.popMenus){
        //        $.AdminLTE.layout.fixSidebarHeight(false);
        //    }
        //});
    });