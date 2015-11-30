/**
 * Created by rxy on 15/11/3.
 */
angular.module("receivableApp", ["ui.neptune", "receivableApp.receivableListGrid","receivableApp.receivableCollectionListGrid","receivableApp.receivableForm", "wservice.common", "ngRoute"])
    .config(function ($routeProvider) {
        //注册产品路由
        $routeProvider
            .when("/list", {
                controller: "receivableListController as vm",
                templateUrl: "list.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/detail/:id", {
                controller: "receivableDetailController as vm",
                templateUrl: "detail.html"
            })
            .otherwise({
                redirectTo: "/list"
            });
    }).factory("QueryReceivableList", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryPayRegisters").params({
            instid: "10000001468002",//nptSessionManager.getSession().getInst().id,
            createby: "10000001519061"//nptSessionManager.getSession().getUser().id
        });
    }).factory("QueryPayRegisterInfo", function (nptRepository) {
        return nptRepository("QueryPayRegisterByid").params({
        });
    })
    .controller("receivableListController", function ($scope, $http, $location, QueryReceivableList, receivableListGrid) {
        var vm = this;

        vm.receivableList = QueryReceivableList;

        vm.receivableListGridOptions = {
            store: receivableListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.nptGridApi = nptGridApi;
            }
        };


        vm.receivableAction = function (action, item, index) {
            console.info(action);
            if (item && action.type === "view") {
                $location.path("/detail/" + item.id);
            }
        };

        /**
         * 根据状态查询当前用户机构的订单列表
         */
        vm.queryByState = function (complete, name) {
            if (complete == "all") {
                vm.complete = QueryReceivableList.post({
                }).then(function () {
                    vm.queryName = name;
                }, function (error) {
                });
            }
            else {
                vm.complete = QueryReceivableList.post({
                    complete: complete
                }).then(function () {
                    vm.queryName = name;
                }, function (error) {
                });
            }
        };

        //首先查询全部订单
        if (!QueryReceivableList.data || QueryReceivableList.data.length <= 0) {
            vm.queryByState("all", '全部');
        }
    }).controller("receivableDetailController", function ($scope, $location, $routeParams,QueryReceivableList, QueryPayRegisterInfo,receivableForm,receivableCollectionListGrid) {

        var vm=this;

        vm.receivableList = QueryReceivableList;
        vm.receivableInfo = QueryPayRegisterInfo;
        //数据模型
        vm.model = {};
        vm.modelCollections = [];

        //表单配置
        vm.receivableFormOptions = {
            store: receivableForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;

            }
        };

        vm.receivableCollectionListGridOptions = {
            store: receivableCollectionListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.receivableCollectionListGridApi = nptGridApi;
            }
        };

        vm.query = function () {
            var id = $routeParams.id;

            if (id) {
                vm.receivableInfo.post({
                    payRegisterId: id
                }).then(function (response) {
                    vm.model = response.data;
                    vm.modelCollections=response.data.payRegisterCollects;
                }, function (error) {
                    var de = error;
                });
            }
        };
        vm.query();
    });