/**
 * Created by rxy on 15/12/3.
 */

angular.module("instApp", ["ui.neptune", "instApp.instListGrid", "instApp.instForm", "wservice.common", "ngRoute", "ui-notification"])
    .config(function ($routeProvider) {
        //注册产品路由
        $routeProvider
            .when("/list", {
                controller: "instListController as vm",
                templateUrl: "list.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/detail/:id", {
                controller: "instDetailController as vm",
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
    }).factory("queryInstList", function (nptRepository) {
        return nptRepository("queryInsts").params({
        });
    }).factory("queryInstInfo", function (nptRepository) {
        return nptRepository("queryInstDetail").params({
        });
    }).factory("updateInst", function (nptRepository) {
        return nptRepository("updateInst").params({
        });
    })
    .service("instListQueryService", function (Notification, queryInstList) {
        var self = this;

        self.instList = queryInstList;

        self.query = function (name) {
            self.instList.post(name).then(function (response) {
                console.info(response.data);
            }, function (error) {
                Notification.error({message: '查询订单数据出现错误,请稍后再试.', delay: 2000});
            });
        };
        //选择一个默认查询
        self.query(null);

    }).controller("instListController", function ($scope, $http, $location,instListGrid,instSearchForm,instListQueryService) {
        var vm = this;


        vm.queryService = instListQueryService;

        vm.instListGridOptions = {
            store: instListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.nptGridApi = nptGridApi;
            }
        };

        vm.instSearchFormOptions = {
            store: instSearchForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
            }
        };

        vm.search=function()
        {
            vm.queryService.query(vm.name);
        };

    }).controller("instDetailController", function ($scope, $routeParams, $location,queryInstList,queryInstInfo,updateInst,editInstForm,nptSessionManager) {
        var vm = this;

        vm.instId = $routeParams.id;
        vm.instList = queryInstList;
        vm.instInfo = queryInstInfo;
        vm.updateInst=updateInst;
        //数据模型
        vm.model = {};

        vm.editInstFormOptions = {
            store: editInstForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;

            }
        };

        vm.query = function () {
            if (vm.instId ) {
                vm.instInfo.post({
                    instid:  vm.instId
                }).then(function (response) {
                    vm.model = response.data;
                }, function (error) {
                    var de = error;
                });
            }
        };

        vm.updateInstInfo=function()
        {
            var params={};
            params.instid=vm.model.id;
            params.simplename=vm.model.simplename;
            params.homepath=vm.model.homepath;
            params.tel=vm.model.tel;
            vm.updateInst.post(params).then(function(response){
            },function(error)
            {
                var de = error;
            });
        };

        vm.show=function()
        {
            vm.roles = nptSessionManager.getSession().getInst().roles;
            angular.forEach(vm.roles, function (value) {
                if (vm.roles.equals("admin")) {
                    angular.forEach(vm.nptFormApi.fields(),function(field,$index) {
                        if ($index !== 0) {
                            field.templateOptions.disabled = false;
                        }
                    });
                }
                return true;
            });
            return false;
        }


        //转到下一单
        vm.next = function (inst) {
            var nextInst = vm.instList.next(inst);
            if (nextInst) {
                $location.path("/detail/" + nextInst.id);
            }
        };

        //转到上一单
        vm.previous = function (inst) {
            var previousInst = vm.instList.previous(inst);
            if (previousInst) {
                $location.path("/detail/" + previousInst.id);
            }
        };

        vm.query();


    });