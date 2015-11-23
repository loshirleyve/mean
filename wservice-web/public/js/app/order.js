/**
 * Created by leon on 15/10/22.
 */

angular.module("orderApp", ["wservice.dt.store.order", "wservice.form.store.order", "wservice.common", "ngRoute"])
    .config(function ($routeProvider) {
        //注册订单路由
        $routeProvider
            .when("/detail/:id", {
                controller: "OrderDetailController",
                templateUrl: "detail.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/detail", {
                redirectTo: "/detail/add",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/list", {
                controller: "OrderListController as vm",
                templateUrl: "list.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/confirm/:id", {
                controller: "ConfirmOrderController",
                templateUrl: "confirm.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/adviser/:id", {
                controller: "AdviserOrderController",
                templateUrl: "adviser.html",
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
    .factory("QueryOrderList", function (nptRepository, nptSessionManager) {
        return nptRepository("queryOrderList").params({
            instid: nptSessionManager.getSession().getInst().id,
            userid: nptSessionManager.getSession().getUser().id
        });
    })
    .factory("QueryOrderInfo", function (nptRepository) {
        return nptRepository("queryOrderInfo");
    })
    .controller("OrderListController", function ($scope, $http, $location, QueryOrderList) {
        var vm = this;

        vm.orderAction = function (action, item, index) {
            console.info(action);
            if (item && action.type === "view") {
                $location.path("/detail/" + item.id);
            }
        };

        /**
         * 根据状态查询当前用户机构的订单列表
         */
        vm.queryByState = function (state, name) {
            vm.state = QueryOrderList.post({
                state: state
            }).then(function (response) {
                vm.data = response.data;
                vm.queryName = name;
            }, function (error) {
                //查询失败
                vm.data = [];
            });
        };

        //首先查询全部订单
        if (!QueryOrderList.data || QueryOrderList.data.length <= 0) {
            vm.queryByState("", '全部');
        } else {
            vm.data = QueryOrderList.data;
        }
    })
    .controller("OrderDetailController", function ($scope, $location, $routeParams, QueryOrderList) {
        var vm = this;

        vm.next = function (order) {
            var nextOrder = QueryOrderList.next(order);
            if (nextOrder) {
                $location.path("/detail/" + nextOrder.id);
            }
        };

        vm.previous = function (order) {
            var previousOrder = QueryOrderList.previous(order);
            if (previousOrder) {
                $location.path("/detail/" + previousOrder.id);
            }
        };

        vm.orderid = $routeParams.id;

        vm.query = function () {

        };

        //刷新界面动作按钮控制状态
        vm.resetState = function () {
            if (vm.data.order.state === "waitconfirm") {
                vm.isConfirm = true;
            } else {
                vm.isConfirm = false;
            }
        };
    }).controller("ConfirmOrderController", function ($scope, $routeParams, $location, $timeout, orderService) {
        $scope.orderid = $routeParams.id;
        $scope.org = orderService.org;
        $scope.query = orderService.query;

        $scope.confirm = function () {
            $location.path("/detail/" + $scope.orderid);
        };

        $scope.openSelectUser = function () {
            $scope.selectAdviserByConfirm.open();
        };

        $scope.onSelect = function (type, item, index) {
            $scope.adviser = item;
            $scope.adviserName = item.name;
        };

        //查询订单信息
        orderService.query.id($scope.orderid, function (data) {
            $scope.data = data || {order: {}};
        }, function (data) {
            //TODO 提示信息
        });

    });