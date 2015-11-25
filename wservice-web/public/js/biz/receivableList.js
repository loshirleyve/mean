/**
 * Created by rxy on 15/11/3.
 */
angular.module("receivableApp", ["wservice.dt.store.receivable", "wservice.form.store.receivable", "wservice.common", "ngRoute"])
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
                controller: "receivableDetailController",
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
    })
    .controller("receivableListController", function ($scope, $http, $location, QueryReceivableList) {
        var vm = this;

        vm.receivableList = QueryReceivableList;

        vm.receivableAction = function (action, item, index) {
            console.info(action);
            if (item && action.type === "view") {
                $location.path("/detail/" + item.id);
            }
        };

        /**
         * 根据状态查询当前用户机构的订单列表
         */
        vm.queryByState = function (state, name) {
            vm.state = QueryReceivableList.post({
                state: state
            }).then(function () {
                vm.queryName = name;
            }, function (error) {
            });
        };

        //首先查询全部订单
        if (!QueryReceivableList.data || QueryReceivableList.data.length <= 0) {
            vm.queryByState("", '全部');
        }
    }).controller("receivableDetailController", function ($scope, $location, $routeParams, receivableService) {
        $scope.productid = $routeParams.id;
        $scope.query = receivableService.query;


    });