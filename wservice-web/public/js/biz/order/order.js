/**
 * Created by leon on 15/10/22.
 */

angular.module("orderApp", [
    "ui.neptune",
    "orderApp.OrderListGrid",
    "orderApp.OrderProductGrid",
    "orderApp.OrderWorkorderGrid",
    "orderApp.orderForm",
    "wservice.common",
    "ngRoute",
    "ui-notification"])
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
            .when("/changeprice/:id", {
                controller: "ChangePriceController as vm",
                templateUrl: "changePrice.html",
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
            instid: nptSessionManager.getSession().getInst().id
            //userid: nptSessionManager.getSession().getUser().id
        });
    })
    .factory("QueryOrderInfo", function (nptRepository) {
        return nptRepository("queryOrderInfo");
    })
    .factory("QueryOrdersIsUnread", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryOrdersIsUnread").params({
            instid: nptSessionManager.getSession().getInst().id
        });
    })
    .factory("UpdateOrderReadState", function (nptRepository) {
        return nptRepository("UpdateOrderReadState");
    })
    .factory("UpdateOrderPrice", function (nptRepository, nptSessionManager) {
        return nptRepository("UpdateOrderPrice").params({
            userid: nptSessionManager.getSession().getUser().id
        });
    })
    .factory("UpdateOrderByConfirm", function (nptRepository) {
        return nptRepository("UpdateOrderByConfirm").params({});
    }).factory("UpdateOrderAdviser", function (nptRepository) {
        return nptRepository("UpdateOrderAdviser");
    })
    .factory("UpdateWorkOrderProcess", function (nptRepository, nptSessionManager) {
        return nptRepository("UpdateWorkOrderProcess").params({
            assignedid: nptSessionManager.getSession().getUser().id
        });
    })
    .service("OrderListQueryService", function (Notification, QueryOrderList) {
        var self = this;

        self.orderList = QueryOrderList;

        self.query = function (params) {
            params = params || {};
            self.orderList.post(params).then(function (response) {
                console.info("查询订单成功.", response);
            }, function (error) {
                Notification.error({
                    title: "查询订单错误.",
                    message: error.data.cause, delay: 2000
                });
            });
        };

        //建立待查询列表
        self.queryList = [{
            label: "全部",
            type: "all",
            callback: function () {
                self.query();
            }
        }, {
            label: "待确认",
            type: "waitconfirm",
            callback: function () {
                self.query({
                    states: ["waitconfirm"]
                });
            }
        }, {
            label: "待支付",
            type: "buy",
            callback: function () {
                self.query({
                    states: ["buy"]
                });
            }
        }, {
            label: "服务中",
            type: "inservice",
            callback: function () {
                self.query({
                    states: ["inservice"]
                });
            }
        }, {
            label: "未分配专属顾问",
            type: "unAdviser",
            callback: function () {
                self.query({
                    adviser: "none"
                });
            }
        }, {
            label: "未分配工单",
            type: "unWorkorder",
            callback: function () {
                self.query({
                    sourcevalue: "none"
                });
            }
        }];

        //选择查询列表
        self.selectQuery = function (query) {
            if (query) {
                self.currQuery = query;
                if (query.callback) {
                    query.callback();
                }
            }
        };

        //选择一个默认查询
        self.selectQuery(self.queryList[1]);
    })
    .service("OrderUnreadService", function (QueryOrdersIsUnread, Notification, $interval) {
        var self = this;
        //检查新订单资源
        self.ordersIsUnread = QueryOrdersIsUnread;

        //周期检查新订单配置
        self.schedules = [{
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
        self.count = 0;

        //执行检查
        function checkNewOrders() {
            self.count++;
            self.hasNewOrders = false;
            //执行服务器检查
            self.ordersIsUnread.post().then(function (response) {
                if (response.data && response.data.length > 0) {
                    self.hasNewOrders = true;

                    Notification.success({
                        message: '检查到' + response.data.length + '张最新的订单,点击显示新订单按钮立即查看!',
                        title: '检查到新订单',
                        replaceMessage: true,
                        delay: 5000
                    }).then(function () {
                    });
                } else {
                    self.hasNewOrders = false;
                }
            }, function (error) {
                self.hasNewOrders = false;
                Notification.error({message: '检查新订单出现错误.', delay: 2000});
            });
        }

        //开始执行任务
        self.startCheck = function (millis) {
            //如果已经存在任务则返回
            if (angular.isDefined(stop)) return;
            stop = $interval(checkNewOrders, millis);
        };

        //停止检查
        self.stopCheck = function () {
            if (angular.isDefined(stop)) {
                $interval.cancel(stop);
                stop = undefined;
            }
        };

        //选择设置
        self.selectSchedule = function (schedule) {
            if (angular.isDefined(schedule)) {
                //先停止之前的任务
                self.stopCheck();
                //设置显示选项
                self.currSchedule = schedule;

                //如果本次配置大于0毫秒则开始执行任务
                if (schedule.millisecond > 0) {
                    self.startCheck(schedule.millisecond);
                }
            }
        };

        //获取新订单
        self.getNewOrder = function () {
            if (self.ordersIsUnread && self.ordersIsUnread.data) {
                return self.ordersIsUnread.data;
            }
        };
    })
    .controller("OrderListController", function ($scope, $http, $location, QueryOrderList, OrderListGrid, OrderForm, UpdateOrderReadState, Notification, OrderUnreadService, OrderListQueryService) {
        var vm = this;

        vm.queryService = OrderListQueryService;
        vm.orderUnreadService = OrderUnreadService;

        //订单列表grid
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

        //显示新订单,并同时设置为已读
        vm.showNewOrders = function () {
            var newOrders = vm.orderUnreadService.getNewOrder();
            if (newOrders) {
                //vm.model = vm.ordersIsUnread.data.orderList;
                //将列表模型数据改为当前检索的新订单数据,用于详情界面的上下单移动
                //TODO 使用返回的订单ID集合重新检索
                var params = {orderids: newOrders};

                vm.queryService.query(params);

                //将显示后的订单设置为已读状态
                UpdateOrderReadState.post(params).then(function (response) {
                    console.log("设置已读成功.", response);
                }, function (error) {
                    Notification.error({
                        title: "设置状态出错.",
                        message: error.data.cause, delay: 2000
                    });
                });
            }
        };

        //如果存在当前检查项则使用当前项触发检查,否则选择一个特定项触发
        if (angular.isDefined(vm.orderUnreadService.currSchedule)) {
            vm.orderUnreadService.selectSchedule(vm.orderUnreadService.currSchedule);
        } else {
            vm.orderUnreadService.selectSchedule(vm.orderUnreadService.schedules[2]);
        }
        //销毁时关闭订单检查任务
        $scope.$on("$destroy", function () {
            vm.orderUnreadService.stopCheck();
        });
    })
    .controller("OrderDetailController", function ($scope, $location, $routeParams, OrderForm, QueryOrderList, QueryOrderInfo, OrderProductGrid, OrderWorkorderGrid, Notification, UpdateWorkOrderProcess, UserListBySelectTree, OrgListBySelectTree) {
        var vm = this;
        vm.orderid = $routeParams.id;
        //订单列表资源库
        vm.orderList = QueryOrderList;
        //订单信息资源库
        vm.orderInfo = QueryOrderInfo;
        //分配工单员
        vm.updateWorkOrderProcess = UpdateWorkOrderProcess;
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

        //选择工单
        vm.selectWorkorder = function (workorder) {
            if (workorder) {
                workorder.selected = !workorder.selected || false;
            }
        };

        //选择全部
        vm.selectWorkorderAll = function (state) {
            angular.forEach(vm.modelWorkorders, function (value) {
                value.selected = state;
            })
        };

        vm.selectTreeSetting = {
            onRegisterApi: function (selectTreeApi) {
                vm.selectTreeApi = selectTreeApi;
            },
            treeRepository: OrgListBySelectTree,
            listRepository: UserListBySelectTree
        };

        //执行分配工单员
        vm.adviser = function () {
            //获取待分配工单选择
            var workordernos = [];
            angular.forEach(vm.modelWorkorders, function (value) {
                if (value && value.selected) {
                    workordernos.push(value.no);
                }
            });

            if (workordernos.length > 0) {
                //弹出用户选择窗口
                vm.selectTreeApi.open().then(function (response) {
                    if (response && response.length > 0) {
                        vm.updateWorkOrderProcess.post({
                            workordernos: workordernos,
                            processid: response[0].id
                        }).then(function () {
                            Notification.error({message: '分配工单员成功.', delay: 2000});

                            //分配完成后需要刷新单据
                            vm.query();
                        }, function (error) {
                            Notification.error({
                                title: "分配工单员错误",
                                message: error.data.cause, delay: 2000
                            });
                        })
                    }
                }, function () {
                });


            } else {
                Notification.info({message: '请先选择需要分配的工单.', delay: 2000});
            }
        };

        //查询订单
        vm.query = function () {
            if (vm.orderid) {
                vm.orderInfo.post({
                    orderid: vm.orderid
                }).then(function (response) {
                    vm.modelOrder = response.data.order;
                    vm.modelProducts = response.data.orderproducts;
                    vm.modelWorkorders = response.data.workorders;
                }, function (error) {
                    Notification.error({
                        title: "查询订单错误",
                        message: error.data.cause, delay: 2000
                    });
                });
            }

        };

        //当前单据是否能够确认
        vm.isConfirm = function () {
            if (vm.orderInfo.data && vm.orderInfo.data.order.state === "waitconfirm" && vm.orderInfo.data.order.paystate === "complete") {
                return true;
            } else {
                return false;
            }
        };

        //当前单据是否能够进行改价操作
        vm.isChangePrice = function () {
            if (vm.orderInfo.data && vm.orderInfo.data.order.paystate === "waitingpay") {
                return true;
            } else {
                return false;
            }
        };

        //检查单据是否能够进行分配顾问
        vm.isAdviser = function () {
            if (vm.orderInfo.data && vm.orderInfo.data.order.state === "inservice") {
                return true;
            } else {
                return false;
            }
        };

        //初始化查询(由于可能在点击确认订单后返回,需要重新刷新界面,所以每次都刷新订单)
        vm.query();


    }).
    controller("ConfirmOrderController", function ($scope, $routeParams, $location, QueryOrderInfo, OrderConfirmForm, Notification, UpdateOrderByConfirm) {
        var vm = this;
        vm.orderid = $routeParams.id;

        //订单信息资源库
        vm.orderInfo = QueryOrderInfo;

        vm.orderByConfirm = UpdateOrderByConfirm;

        vm.model = {};

        //查询订单
        vm.query = function () {
            if (vm.orderid) {
                vm.orderInfo.post({
                    "orderid": vm.orderid
                }).then(function (response) {
                    vm.modelOrder = response.data.order;
                    vm.model.adviser = response.data.order.adviser;
                    vm.model.salemanid = response.data.order.salesmanid;
                    vm.model.begindate = response.data.order.begindate;
                    vm.model.enddate = response.data.order.enddate;
                }, function (error) {
                    Notification.error({message: '查询订单出现错误.', delay: 2000});
                });
            }

        };

        vm.confirm = function () {
            if (vm.nptFormApi.form.$invalid) {
                Notification.error({message: '请输入正确的确认订单信息.', delay: 2000});
            } else {
                vm.model.orderid = vm.orderid;
                vm.orderByConfirm.post(vm.model).then(function (response) {
                    Notification.success({
                        message: "确认订单成功.",
                        delay: 2000
                    });
                    vm.toDetail();

                }, function (error) {
                    Notification.error({
                        title: "确认订单错误.",
                        message: error.data.cause, delay: 2000
                    });
                });
            }

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

    }).controller("AdviserOrderController", function (QueryOrderInfo, OrderAdviserForm, $routeParams, $location, Notification, UpdateOrderAdviser) {
        var vm = this;
        vm.orderid = $routeParams.id;

        //订单信息资源库
        vm.orderInfo = QueryOrderInfo;
        vm.orderAdviser = UpdateOrderAdviser;
        vm.model = {};

        vm.adviser = function () {
            if (vm.nptFormApi.form.$invalid) {
                Notification.error({message: '请正确输入专属顾问信息.', delay: 2000});
            } else {
                vm.orderAdviser.post({
                    orderid: vm.orderid,
                    adviserid: vm.model.adviser
                }).then(function (response) {
                    Notification.success({message: '分配专属顾问成功!', delay: 2000});
                    vm.toDetail();
                }, function (error) {
                    Notification.error({
                        title: "分配专属顾问错误.",
                        message: error.data.cause, delay: 2000
                    });
                });
            }
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

                    Notification.error({
                        title: "查询订单错误",
                        message: error.data.cause, delay: 2000
                    });
                });
            }
        };

        //执行查询
        vm.query();
    }).controller("ChangePriceController", function ($scope, $routeParams, QueryOrderInfo, Notification, $location, OrderChangePriceForm, UpdateOrderPrice) {
        var vm = this;
        vm.orderid = $routeParams.id;
        vm.model = {};

        //订单信息资源库
        vm.orderInfo = QueryOrderInfo;
        vm.updateOrderPrice = UpdateOrderPrice;

        vm.toDetail = function () {
            $location.path("/detail/" + vm.orderid);
        };

        vm.changePrice = function () {
            if (vm.nptFormApi.form.$invalid) {
                Notification.error({message: '请输入正确的新订单价格..', delay: 2000});
            } else {
                vm.updateOrderPrice.post({
                    orderid: vm.orderid,
                    factamount: vm.model.newprice,
                    reason: vm.model.reason
                }).then(function (response) {
                    Notification.success({message: '改价成功!', delay: 2000});
                    vm.toDetail();
                }, function (error) {
                    Notification.error({
                        title: "改价错误.",
                        message: error.data.cause,
                        delay: 2000
                    });
                });

            }
        };

        //表单配置
        vm.orderChangePriceFormOptions = {
            store: OrderChangePriceForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
            }
        };

        //查询订单
        vm.query = function () {
            if (vm.orderid) {
                vm.orderInfo.post({
                    "orderid": vm.orderid
                }).then(function (response) {
                    vm.modelOrder = response.data.order;
                }, function (error) {
                    Notification.error({
                        title: "查询订单错误",
                        message: error.data.cause, delay: 2000
                    });
                });
            }
        };

        //执行查询
        vm.query();
    });