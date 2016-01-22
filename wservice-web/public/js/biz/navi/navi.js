/**
 * Created by leon on 15/10/22.
 */

angular.module("naviApp", ["ui.neptune"
    ,"wservice.common"
    ,"ngRoute"
    ,"ui-notification"
    ,"naviApp.naviForm"
    ,"naviApp.selectInstForm"])
    .config(function ($routeProvider) {
        //注册订单路由
        $routeProvider
            .when("/list", {
                controller: "NaviListController as vm",
                templateUrl: "list.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/add/:id", {
                controller: "NaviAddController as vm",
                templateUrl: "add.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .otherwise({
                redirectTo: "/list"
            });

    })
    .factory("QueryMdNavi", function (nptRepository) {
        return nptRepository("QueryMdNavi").params({
        });
    })
    .factory("AddOrUPdateMdNavi", function (nptRepository) {
        return nptRepository("AddOrUPdateMdNavi").params({
        });
    })
    .factory("AddInstNavi", function (nptRepository) {
        return nptRepository("AddInstNavi").params({
        });
    })
    .factory("QueryInstNavis", function (nptRepository) {
        return nptRepository("QueryInstNavis").params({
        });
    })
    .factory("QueryInstRole", function (nptRepository) {
        return nptRepository("QueryInstRole").params({
        });
    })
    .factory("AddInstRoleNavi", function (nptRepository) {
        return nptRepository("AddInstRoleNavi").params({
        });
    })
    .controller("NaviListController", function ($scope, $http, $location, QueryMdNavi, selectInstForm, Notification, nptSessionManager, AddInstNavi,  QueryInstNavis, QueryInstRole, AddInstRoleNavi) {
        var vm = this;

        //订单列表数据资源库
        vm.queryMdNavi = QueryMdNavi;
        vm.instNavis = [];
        vm.instRoles = [];

        //数据模型
        vm.navis = [];

        vm.query = function() {
            vm.queryMdNavi.post().then(function(response){
                vm.navis = response.data;
            }, function (error) {
                Notification.error({message: '查询导航数据出现错误,请稍后再试.', delay: 2000});
            })
        };

        vm.query();

        vm.toAddView = function(parentid) {
            $location.path("/add/" + parentid);
        };


        vm.selectNavi = function(navi) {
            if (navi) {
                navi.selected = !navi.selected || false;
            }
        };

        vm.relateInstAndNavi = function(inst){
            if(inst) {
                if(vm.navis) {
                    var params = {};
                    params.naviids = [];
                    //遍历导航构造参数
                    for(var i =0 ;i<vm.navis.length;i++) {
                        if(vm.navis[i].selected) {
                            params.naviids.push(vm.navis[i].id);
                        }

                        if(vm.navis[i].children) {
                            for(var m =0 ;m<vm.navis[i].children.length;m++) {
                                if(vm.navis[i].children[m].selected) {
                                    params.naviids.push(vm.navis[i].children[m].id);
                                }
                            }
                        }
                    }

                    params.instid = inst.instid;
                    params.userid = nptSessionManager.getSession().getUser().id;

                    AddInstNavi.post(params).then(function() {
                        $location.path("#/list");
                        Notification.success({message: '添加机构导航成功', delay: 2000});
                    },function(error) {
                        Notification.error({message: '添加机构导航出现错误,请稍后再试.', delay: 2000});
                    });
                }


            }else {
                Notification.error({message: '请选择机构.', delay: 2000});
            }


        };

        vm.selectInstFormOptions = {
            store: selectInstForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
            }
        };


        $scope.$watch("vm.inst.instid",function(newV,oldV) {
            QueryInstNavis.post({
                "instid":newV
            }).then(function(response) {
                vm.instNavis = response.data;
            },function(error) {
                Notification.error({message: '查询机构导航出现错误,请稍后再试.', delay: 2000});
            });

            if(newV) {
                QueryInstRole.post({
                    "instid":newV
                }).then(function(response) {
                    vm.instRoles = response.data;
                },function(error) {
                    Notification.error({message: '查询机构导航出现错误,请稍后再试.', delay: 2000});
                });
            }

        });

        vm.relateRoleInstNavi = function() {
            var params = [];
            params.instnaviids =[];
            params.instroleids =[];
            params.userid = nptSessionManager.getSession().getUser().id;

            if(vm.instNavis) {
                for(var i =0 ;i<vm.instNavis.length;i++) {
                    if(vm.instNavis[i].selected) {
                        params.instnaviids.push(vm.instNavis[i].instnaviid);
                    }
                }
            }
            if(vm.instRoles) {
                for(var i =0 ;i<vm.instRoles.length;i++) {
                    if(vm.instRoles[i].selected) {
                        params.instroleids.push(vm.instRoles[i].id);
                    }
                }
            }

            if(params.instroleids) {
                if(params.instnaviids) {
                    AddInstRoleNavi.post(params).then(function(response) {
                        $location.path("/list");
                        Notification.success({message: '关联机构角色与机构导航成功.', delay: 2000});
                    },function(error) {
                        Notification.error({message: '查询机构导航出现错误,请稍后再试.', delay: 2000});
                    });
                }else {
                    Notification.error({message: '请选择机构导航.', delay: 2000});
                }
            }else {
                Notification.error({message: '请选择机构角色.', delay: 2000});
            }
        };

    })
    .controller("NaviAddController", function ($scope, $http, $location,$routeParams, NaviForm, AddOrUPdateMdNavi, nptSessionManager, Notification) {
        var vm = this;
        vm.parentid = $routeParams.id;

        vm.addOrUPdateMdNavi = AddOrUPdateMdNavi;

        //表单配置
        vm.addNaviOptions = {
            store: NaviForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
            }
        };

        vm.reset = function() {
            vm.navi = {};
        };

        vm.save = function(navi) {
            vm.nptFormApi.form.$commitViewValue();
            if(vm.nptFormApi.form.$invalid){
                var errorText = "";
                angular.forEach(vm.nptFormApi.getErrorMessages(), function(value){
                    errorText = errorText + value + "</br>";
                });
                Notification.error({
                    title:"请输入正确的新增合同信息",
                    message: errorText, delay:2000
                });
            }else{

                if(navi.id) {

                }else {
                    navi.createby = nptSessionManager.getSession().getUser().id;
                    navi.parentid = vm.parentid;
                    vm.addOrUPdateMdNavi.post(navi).then(function() {
                        $location.path("/list");
                    },function(error) {
                        Notification.error({message: '添加导航数据出现错误,请稍后再试.', delay: 2000});
                    });

                }


            }


        };


    });