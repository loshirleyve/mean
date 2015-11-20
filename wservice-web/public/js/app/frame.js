/**
 * Created by leon on 15/11/20.
 */

angular.module("wservice.web.home", ["ui.neptune", "ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/:id", {
                controller: "MainController as vm",
                templateUrl: "home.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/", {
                controller: "MainController as vm",
                templateUrl: "home.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            }).otherwise({
                redirectTo: "/"
            });

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
                });
            },
            navigateTo: function navigateTo(item) {
                self.moduleUrl = "/biz/order"
                $location.path("/" + item.no);
                self.setFocus(item);
            },
            findByName: function (name) {
                var tempMenuItem = undefined;
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

            },
            menus: [],
            moduleUrl: "/app/home"
        };

        return self;
    })
    .controller("MainController", function (sessionData, NavigateMenu) {
        var vm = this;


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
        vm.navigateMenu.init();
        vm.brand.init();
        vm.profile.init();

        // template中无法异步加载js，这里需要重新激活左侧菜单收起动画
        $.AdminLTE.pushMenu.activate($.AdminLTE.options.sidebarToggleSelector);

    });