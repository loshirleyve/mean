/**
 * Created by rxy on 16/1/7.
 */
angular.module("userManagerApp", ["ui.neptune",
    "userManagerApp.userListGrid",
    "userManagerApp.userForm",
    "wservice.common",
    "ngRoute",
    "ui-notification"])
    .config(function ($routeProvider) {
        //注册产品路由
        $routeProvider
            .when("/list", {
                controller: "userListController as vm",
                templateUrl: "list.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            }).when("/detail/:id", {
                controller: "detailController as vm",
                templateUrl: "detail.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .otherwise({
                redirectTo: "/list"
            });

    }).factory("QueryCities", function (nptRepository) {
        return nptRepository("queryCities").params({});
    }).factory("QueryMdProductGroup", function (nptRepository) {
        return nptRepository("QueryMdProductGroupBylocation").params({});
    }).factory("QueryUserByInst", function (nptRepository,nptSessionManager) {
        return nptRepository("QueryUserByInst").params({
            instid: nptSessionManager.getSession().getInst().id
        });
    }).factory("QueryInstRoleNavi", function (nptRepository,nptSessionManager) {
        return nptRepository("QueryInstRoleNaviByUseridAndInstidAndDevice").params({
            instid: nptSessionManager.getSession().getInst().id,
            device:"web"
        });
    }).factory("QueryUserInfoById", function (nptRepository,nptSessionManager) {
        return nptRepository("QueryUserInfoById").params({
        });
    }).factory("queryInstRoles", function (nptRepository,nptSessionManager) {
        return nptRepository("queryInstRolesByUseridAndInstid").params({
            instid: nptSessionManager.getSession().getInst().id
        });
    }).factory("AddOrgCardsByOrgid", function (nptRepository) {
        return nptRepository("AddOrgCardsByOrgid").params({
        });
    }).service("userService", function (QueryUserByInst,Notification) {
        var self = this;
        self.queryUserByInst=QueryUserByInst;

        self.queryUserList = function () {
            self.queryUserByInst.post().then(function (response) {
            }, function (error) {
                Notification.error({
                    title: '获取用户失败',
                    message: error.data.cause,
                    replaceMessage: true,
                    delay: 5000
                });
            });
        };

        self.queryUserList();

    }).controller("userListController", function (userService,userListGrid) {
        var vm = this;
        vm.queryUserByInst = userService.queryUserByInst;

        vm.userListGridOptions = {
            store: userListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.nptGridApi = nptGridApi;
            }
        };
    }).controller("detailController", function ($routeParams,$location,userService,QueryUserInfoById,QueryInstRoleNavi,queryInstRoles,userRoleForm,nptCache,Notification,nptMessageBox) {
        var vm = this;
        //记录当前编辑的用户id
        vm.userid = $routeParams.id;
        vm.queryUserInfo=QueryUserInfoById;
        vm.queryInstRoleNavi=QueryInstRoleNavi;
        vm.queryInstRoles=queryInstRoles;
        vm.queryUserByInst = userService.queryUserByInst;
        vm.userRoleIds={};
        vm.userRoleIds.ids=[];

        vm.userRoleFormOptions = {
            store: userRoleForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;

            }
        };

        //用户详情
        vm.queryUserDetail= function () {
            vm.queryUserInfo.post({userid:vm.userid}).then(function (response) {
                vm.userInfo=response.data;
                vm.userInfo.userCache = nptCache.get("user", vm.userid);
                vm.userInfo;
            }, function (error) {
                Notification.error({
                    title: '获取用户详情失败',
                    message: error.data.cause,
                    replaceMessage: true,
                    delay: 5000
                });
            });
        };

        //用户角色
        vm.queryRole = function () {
            vm.queryInstRoles.post({userid:vm.userid})
                .then(function (response) {
                    angular.forEach(response.data, function (value) {
                        vm.userRoleIds.ids.push(value.id);
                    });
            }, function (error) {
                Notification.error({
                    title: '获取用户角色失败',
                    message: error.data.cause,
                    replaceMessage: true,
                    delay: 5000
                });
            });
        };

        //用户导航
        vm.queryNavi = function () {
            vm.queryInstRoleNavi.post({userid:vm.userid})
                .then(function (response) {
            }, function (error) {
                Notification.error({
                    title: '获取用户角色导航失败',
                    message: error.data.cause,
                    replaceMessage: true,
                    delay: 5000
                });
            });
        };

        //下一个
        vm.next = function (user) {
            var nextUser = vm.queryUserByInst.next(user);
            if (nextUser) {
                $location.path("/detail/" + nextUser.id);
            }
        };

        //上一个
        vm.previous = function (user) {
            var previousUser = vm.queryUserByInst.previous(user);
            if (previousUser) {
                $location.path("/detail/" + previousUser.id);
            }
        };

        vm.isDeleteRole = function () {
            nptMessageBox.open({
                title:"提示",
                content: '是否确定删除吗?',
                showCancel: true,
                action: {
                    success: {
                        label: "确定",
                        listens: [function (modalResult) {

                        }]
                    }
                },
                modal:{
                    size:"sm"
                }
            });
        };



        vm.queryUserDetail();
        vm.queryRole();
        vm.queryNavi();

    });