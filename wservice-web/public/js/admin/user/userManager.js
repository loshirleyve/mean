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
    }).factory("QueryUserByInst", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryUserByInst").params({
            instid: nptSessionManager.getSession().getInst().id
        });
    }).factory("QueryInstRoleNavi", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryInstRoleNaviByUseridAndInstidAndDevice").params({
            instid: nptSessionManager.getSession().getInst().id,
            device: "web"
        });
    }).factory("QueryUserInfoById", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryUserInfoById").params({
        });
    }).factory("queryInstRoles", function (nptRepository, nptSessionManager) {
        return nptRepository("queryInstRolesByUseridAndInstid").params({
            instid: nptSessionManager.getSession().getInst().id
        });
    }).factory("QueryUserContact", function (nptRepository) {
        return nptRepository("QueryUserContactByUserId").params({
        });
    }).factory("QueryUserInvite", function (nptRepository) {
        return nptRepository("QueryUserInviteByUserId").params({
        });
    }).factory("QueryUserWx", function (nptRepository) {
        return nptRepository("QueryUserWxByUserId").params({
        });
    })
    .service("userService", function (QueryUserByInst, Notification) {
        var self = this;
        self.queryUserByInst = QueryUserByInst;

        self.queryUserList = function (params) {
            self.queryUserByInst.post(params).then(function (response) {
            }, function (error) {
                Notification.error({
                    title: '获取用户失败',
                    message: error.data.cause,
                    replaceMessage: true,
                    delay: 5000
                });
            });
        };

        self.queryUserList(null);

    }).controller("userListController", function (userService, userListGrid,userSearchForm,nptMessageBox) {
        var vm = this;
        vm.queryService=userService;
        vm.queryUserByInst = userService.queryUserByInst;

        vm.userListGridOptions = {
            store: userListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.nptGridApi = nptGridApi;
            }
        };
        vm.userSearchFormOptions = {
            store: userSearchForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
            }
        };


        vm._showModal = function () {
            nptMessageBox.open({
                title: "资料列表",
                content: '<div npt-form="$$ms.userSearchFormOptions" model="$$ms.user"></div>',
                showCancel: true,
                scope: {
                    userSearchFormOptions: vm.userSearchFormOptions,
                    user: vm.user
                },
                action: {
                    success: {
                        label: "确定",
                        listens: [function (modalResult) {
                            vm.queryService.queryUserList(modalResult.scope.user);
                        }]
                    }
                }
            });
        };

    }).controller("detailController", function ($routeParams, $location, userService, QueryUserInfoById, QueryInstRoleNavi, queryInstRoles, QueryUserContact, QueryUserInvite, QueryUserWx, userRoleForm, nptCache, Notification, nptMessageBox) {
        var vm = this;
        //记录当前编辑的用户id
        vm.userid = $routeParams.id;
        vm.queryUserInfo = QueryUserInfoById;
        vm.queryInstRoleNavi = QueryInstRoleNavi;
        vm.queryInstRoles = queryInstRoles;
        vm.queryUserContact = QueryUserContact;
        vm.queryUserInvite = QueryUserInvite;
        vm.queryUserWx = QueryUserWx;
        vm.queryUserByInst = userService.queryUserByInst;

        vm.userRoleIds = {};
        vm.userRoleIds.ids = [];

        vm.userRoleFormOptions = {
            store: userRoleForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
            }
        };

        //用户详情
        vm.queryUserDetail = function () {
            vm.queryUserInfo.post({userid: vm.userid}).then(function (response) {
                vm.userInfo = response.data;
                vm.userInfo.userCache = nptCache.get("user", vm.userid);
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
            vm.queryInstRoles.post({userid: vm.userid})
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
            vm.queryInstRoleNavi.post({userid: vm.userid})
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

        //用户联系方式
        vm.queryContact = function () {
            vm.queryUserContact.post({id: vm.userid})
                .then(function (response) {
                    vm.contact = response.data;
                }, function (error) {
                    Notification.error({
                        title: '获取用户联系方式失败',
                        message: error.data.cause,
                        replaceMessage: true,
                        delay: 5000
                    });
                });
        };

        //用户邀请记录
        vm.queryInvite = function () {
            vm.queryUserInvite.post({id: vm.userid})
                .then(function (response) {
                    vm.invite = response.data;
                }, function (error) {
                    Notification.error({
                        title: '获取用户邀请记录失败',
                        message: error.data.cause,
                        replaceMessage: true,
                        delay: 5000
                    });
                });
        };

        //用户微信信息
        vm.queryWx = function () {
            vm.queryUserWx.post({id: vm.userid})
                .then(function (response) {
                    vm.wx=response.data;
                }, function (error) {
                    Notification.error({
                        title: '获取用户微信信息失败',
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
                title: "提示",
                content: '是否确定删除吗?',
                showCancel: true,
                action: {
                    success: {
                        label: "确定",
                        listens: [function (modalResult) {

                        }]
                    }
                },
                modal: {
                    size: "sm"
                }
            });
        };


        vm.queryUserDetail();
        vm.queryRole();
        vm.queryNavi();
        vm.queryContact();
        vm.queryInvite();
        vm.queryWx();
    });