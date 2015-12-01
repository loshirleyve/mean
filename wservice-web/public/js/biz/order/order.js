/**
 * Created by leon on 15/10/22.
 */

angular.module("orderApp", ["ui.neptune", "orderApp.OrderListGrid", "orderApp.OrderProductGrid", "orderApp.OrderWorkorderGrid", "orderApp.orderForm", "wservice.common", "ngRoute"])
    .config(function ($routeProvider) {
        //注册订单路由
        $routeProvider
            .when("/detail/:id", {
                controller: "OrderDetailController as vm",
                templateUrl: "detail.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/detail/add", {
                redirectTo: "/detail/add"
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
                controller: "ConfirmOrderController as vm",
                templateUrl: "confirm.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/adviser/:id", {
                controller: "AdviserOrderController as vm",
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
    .controller("OrderListController", function ($scope, $http, $location, $interval, QueryOrderList, OrderListGrid, OrderForm) {
        var vm = this;

        //订单列表数据资源库
        vm.orderList = QueryOrderList;

        vm.orderListGridOptions = {
            store: OrderListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.nptGridApi = nptGridApi;
            },
            formlyStore: {
                "OrderForm": OrderForm
            }
        };

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
            }).then(function () {
                vm.queryName = name;
            }, function (error) {
            });
        };

        //首先查询全部订单
        if (!QueryOrderList.data || QueryOrderList.data.length <= 0) {
            vm.queryByState("", '全部');
        }

        //周期检查新订单配置
        vm.schedules = [{
            label: "不检查",
            millisecond: 0
        }, {
            label: "每10秒检查",
            millisecond: 1000 * 10
        }, {
            label: "每30秒检查",
            millisecond: 1000 * 30
        }, {
            label: "每分钟检查",
            millisecond: 1000 * 60
        }];

        var stop;
        vm.count = 0;

        //执行检查
        function checkNewOrders() {
            vm.count++;
            console.info("执行第" + vm.count + "次检查!");
        }

        //开始执行任务
        vm.startCheck = function (millis) {
            //如果已经存在任务则返回
            if (angular.isDefined(stop)) return;
            stop = $interval(checkNewOrders, millis);
        };

        //停止检查
        vm.stopCheck = function () {
            if (angular.isDefined(stop)) {
                $interval.cancel(stop);
                stop = undefined;
            }
        };

        //选择设置
        vm.selectSchedule = function (schedule) {
            if (angular.isDefined(schedule)) {

                //先停止之前的任务
                vm.stopCheck();

                //设置显示选项
                vm.scheduleLabel = schedule.label;

                //如果本次配置大于0毫秒则开始执行任务
                if (schedule.millisecond > 0) {
                    vm.startCheck(schedule.millisecond);
                }
            }
        };

        //设置默认检查项
        vm.selectSchedule(vm.schedules[2]);

        //销毁时关闭订单检查任务
        $scope.$on("$destroy", function () {
            vm.stopCheck();
        });
    })
    .controller("OrderDetailController", function ($scope, $location, $routeParams, OrderForm, QueryOrderList, QueryOrderInfo, OrderProductGrid, OrderWorkorderGrid) {
        var vm = this;

        //订单列表资源库
        vm.orderList = QueryOrderList;
        //订单信息资源库
        vm.orderInfo = QueryOrderInfo;
        //数据模型
        vm.model = {};
        vm.modelProducts = [];
        vm.modelWorkorders = [];

        //表单配置
        vm.orderFormOptions = {
            store: OrderForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
            }
        };

        //产品表格配置项
        vm.orderProductGridOptions = {
            store: OrderProductGrid,
            onRegisterApi: function (nptGridApi) {
                vm.orderProductGridApi = nptGridApi;
            }
        };

        //产品工单列表配置
        vm.orderWorkorderOptions = {
            store: OrderWorkorderGrid,
            onRegisterApi: function (nptGridApi) {
                vm.orderWorkorderGridApi = nptGridApi;
            }
        };

        //转到下一单
        vm.next = function (order) {
            var nextOrder = vm.orderList.next(order);
            if (nextOrder) {
                $location.path("/detail/" + nextOrder.id);
            }
        };

        //转到上一单
        vm.previous = function (order) {
            var previousOrder = vm.orderList.previous(order);
            if (previousOrder) {
                $location.path("/detail/" + previousOrder.id);
            }
        };

        //查询订单
        vm.query = function () {
            var id = $routeParams.id;

            if (id) {
                vm.orderInfo.post({
                    orderid: id
                }).then(function (response) {
                    vm.modelOrder = response.data.order;
                    vm.modelProducts = response.data.orderproducts;
                    vm.modelWorkorders = response.data.workorders;
                }, function (error) {
                    var de = error;
                });
            }

        };

        //当前单据是否能够确认
        vm.isConfirm = function () {
            if (vm.orderInfo.data && vm.orderInfo.data.order.state === "waitconfirm") {
                return true;
            } else {
                return false;
            }
        };

        //初始化查询(由于可能在点击确认订单后返回,需要重新刷新界面,所以每次都刷新订单)
        vm.query();


    }).
    controller("ConfirmOrderController", function ($scope, $routeParams, $location, QueryOrderInfo, OrderConfirmForm) {
        var vm = this;
        vm.orderid = $routeParams.id;

        //订单信息资源库
        vm.orderInfo = QueryOrderInfo;

        vm.model = {};

        //查询订单
        vm.query = function () {
            if (vm.orderid) {
                vm.orderInfo.post({
                    "orderid": vm.orderid
                }).then(function (response) {
                    vm.modelOrder = response.data.order;
                }, function (error) {

                });
            }

        };

        vm.confirm = function () {
            console.info(vm.model);
        };

        vm.toDetail = function () {
            $location.path("/detail/" + vm.orderid);
        };

        //表单配置
        vm.orderConfirmFormOptions = {
            store: OrderConfirmForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
            }
        };

        //执行查询
        vm.query();

    }).controller("AdviserOrderController", function (QueryOrderInfo, OrderAdviserForm, $routeParams, $location) {
        var vm = this;
        vm.orderid = $routeParams.id;

        //订单信息资源库
        vm.orderInfo = QueryOrderInfo;

        vm.model = {};

        vm.adviser = function () {

        };

        //表单配置
        vm.orderAdviserFormOptions = {
            store: OrderAdviserForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
            }
        };

        vm.toDetail = function () {
            $location.path("/detail/" + vm.orderid);
        };

        //查询订单
        vm.query = function () {
            if (vm.orderid) {
                vm.orderInfo.post({
                    "orderid": vm.orderid
                }).then(function (response) {
                    vm.modelOrder = response.data.order;
                    vm.model.adviser = vm.modelOrder.adviser;
                }, function (error) {
                });
            }
        };

        //执行查询
        vm.query();
    });