/**
 * Created by leon on 15/10/22.
 */

angular.module("workorderApp", ["ui.neptune", "workorderApp.WorkorderListGrid", "workorderApp.workorderForm","workorderApp.WorkorderAttachmentGrid","workorderApp.WorkorderCommentGrid","wservice.common","ngRoute","ui-notification"])
    .config(function ($routeProvider) {
        //注册订单路由
        $routeProvider
            .when("/detail/:id", {
                controller: "WorkorderDetailController as vm",
                templateUrl: "detail.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            //.when("/detail", {
            //    redirectTo: "/detail/add"
            //})
            .when("/list", {
                controller: "WorkorderListController as vm",
                templateUrl: "list.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/startWorkorder/:id",{
                controller: "WorkorderStartController as vm",
                templateUrl: "startWorkorder.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/completeWorkorder/:id",{
                controller: "WorkorderCompleteController as vm",
                templateUrl: "completeWorkorder.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/deliverWorkorder/:id",{
                controller: "WorkorderDeliverController as vm",
                templateUrl: "deliverWorkorder.html",
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
    .factory("QueryWorkorderList",function(nptRepository, nptSessionManager) {
        return nptRepository("queryWorkorderList").params({
            instid: nptSessionManager.getSession().getInst().id,
            userid: nptSessionManager.getSession().getUser().id
        });
    })
    .factory("QueryWorkorderInfo",function(nptRepository) {
        return nptRepository("queryWorkorderDetail");
    })
    .factory("StartWorkorder",function(nptRepository) {
        return nptRepository("startWorkorder");
    })
    .factory("CompleteWorkorder", function(nptRepository) {
        return nptRepository("completeWorkorder");
    })
    .factory("DeliverWorkorder", function(nptRepository) {
        return nptRepository("deliverWorkorder");
    })
    .factory("QueryWorkordersIsUnread", function (nptRepository, nptSessionManager) {
        return nptRepository("queryWorkordersUnread").params({
            instid: nptSessionManager.getSession().getInst().id,
            processid: nptSessionManager.getSession().getUser().id
        });
    })
    .service("WorkorderUnreadService", function (QueryWorkordersIsUnread, Notification, $interval) {
        var self = this;
        //检查新订单资源
        self.workordersIsUnread = QueryWorkordersIsUnread;

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
        function checkNewWorkorders() {
            self.count++;
            self.hasNewWorkorders = false;
            //执行服务器检查
            self.workordersIsUnread.post().then(function (response) {
                if (response.data && response.data.length > 0) {
                    self.hasNewWorkorders = true;

                    Notification.success({
                        message: '检查到' + response.data.length + '张最新的工单,点击显示新订单按钮立即查看!',
                        title: '检查到新工单',
                        replaceMessage: true,
                        delay: 5000
                    }).then(function () {
                    });
                } else {
                    self.hasNewWorkorders = false;
                }
            }, function (error) {
                self.hasNewWorkorders = false;
                Notification.error({message: '检查新工单出现错误.', delay: 2000});
            });
        }

        //开始执行任务
        self.startCheck = function (millis) {
            //如果已经存在任务则返回
            if (angular.isDefined(stop)) return;
            stop = $interval(checkNewWorkorders, millis);
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
        self.getNewWorkorder = function () {
            if (self.workordersIsUnread && self.workordersIsUnread.data) {
                return self.workordersIsUnread.data;
            }
        };
    })
    .service("WorkorderListQueryService", function (Notification, QueryWorkorderList) {
        var self = this;

        self.workorderList = QueryWorkorderList;

        self.query = function (params) {
            params = params || {};
            self.workorderList.post(params).then(function (response) {
            }, function (error) {
                Notification.error({message: '查询工单数据出现错误,请稍后再试.', delay: 2000});
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
            label: "未开始",
            type: "unstart",
            callback: function () {
                self.query({
                    state: "unstart"
                });
            }
        }, {
            label: "处理中",
            type: "inservice",
            callback: function () {
                self.query({
                    state: "inservice"
                });
            }
        }, {
            label: "已完成",
            type: "complete",
            callback: function () {
                self.query({
                    state: "complete"
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
    .controller("WorkorderListController", function ($scope, $http, $location, QueryWorkorderList, WorkorderListGrid, WorkorderListQueryService, WorkorderUnreadService) {
        var vm = this;

        //订单列表数据资源库
        //vm.workorderList = QueryWorkorderList;
        vm.queryService = WorkorderListQueryService;
        vm.workorderUnreadService = WorkorderUnreadService;

        vm.workorderListGridOptions = {
            store: WorkorderListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.nptGridApi = nptGridApi;
            }
        };

        vm.workorderAction = function (action, item, index) {
            console.info(action);
            if (item && action.type === "view") {
                $location.path("/detail/" + item.id);
            }
        };

        //显示新订单,并同时设置为已读
        vm.showNewWorkorders = function () {
            var newWorkorders = vm.workorderUnreadService.getNewWorkorder();
            if (newWorkorders) {
                //vm.model = vm.ordersIsUnread.data.orderList;
                //将列表模型数据改为当前检索的新订单数据,用于详情界面的上下单移动
                vm.queryService.workorderList.data = newWorkorders;
                //将显示后的订单设置为已读状态
                //UpdateOrderReadState.post(newOrders).then(function (response) {
                //}, function (error) {
                //    Notification.error({message: '设置订单为已读状态出现错误.', delay: 2000});
                //});
            }
        };

        //如果存在当前检查项则使用当前项触发检查,否则选择一个特定项触发
        if (angular.isDefined(vm.workorderUnreadService.currSchedule)) {
            vm.workorderUnreadService.selectSchedule(vm.workorderUnreadService.currSchedule);
        } else {
            vm.workorderUnreadService.selectSchedule(vm.workorderUnreadService.schedules[2]);
        }
        //销毁时关闭订单检查任务
        $scope.$on("$destroy", function () {
            vm.workorderUnreadService.stopCheck();
        });

    }).
    controller("WorkorderDetailController", function ($scope, $location, $routeParams, nptResource, nptSessionManager, QueryWorkorderInfo, QueryWorkorderList, WorkorderForm, WorkorderAttachmentGrid,WorkorderCommentGrid) {
        var vm = this;

        //工单列表资源库
        vm.workorderList = QueryWorkorderList;

        //工单信息资源库
        vm.workorderInfo = QueryWorkorderInfo;

        //数据模型
        vm.model = {};
        vm.modelAttachment = [];
        vm.modelComment = [];

        //配置表单
        vm.workorderFormOptions = {
            store: WorkorderForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;

            }
        };

        //配置工单资料
        vm.workorderAttachmentOptions = {
            store: WorkorderAttachmentGrid,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
            }
        };

        //配置工单评价
        vm.workorderAttachmentOptions = {
            store: WorkorderCommentGrid,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
            }
        };

        //转到下一单
        vm.next = function (workorder) {
            var nextWorkorder = vm.workorderList.next(workorder);
            if (nextWorkorder) {
                $location.path("/detail/" + nextWorkorder.id);
            }
        };

        //转到上一单
        vm.previous = function (workorder) {
            var previousWorkorder = vm.workorderList.previous(workorder);
            if (previousWorkorder) {
                $location.path("/detail/" + previousWorkorder.id);
            }
        };

        //查询工单
        vm.query = function () {
            var id = $routeParams.id;

            if (id) {
                vm.workorderInfo.post({
                    workorderid: id
                }).then(function (response) {
                    vm.model.data = response.data;
                    vm.modelAttachment = response.data.orderAttachments;
                    vm.modelComment = response.data.workorderComment;
                }, function (error) {
                    var de = error;
                });
            }

        };

        //工单开始标识
        vm.isUnstart = function() {
            if (vm.workorderInfo.data && vm.workorderInfo.data.workOrder.state === "unstart") {
                return true;
            } else {
                return false;
            }
        };

        //工单开始标识
        vm.isInservice = function() {
            if (vm.workorderInfo.data && vm.workorderInfo.data.workOrder.state === "inservice") {
                return true;
            } else {
                return false;
            }
        };

        //工单转交标识
        vm.isNotComplete = function() {
            if (vm.workorderInfo.data && (vm.workorderInfo.data.workOrder.state === "inservice" || vm.workorderInfo.data.workOrder.state === "unstart")) {
                return true;
            } else {
                return false;
            }
        };

        vm.query();

    }).
    controller("WorkorderStartController", function ($scope, $location, $routeParams, QueryWorkorderInfo, nptSessionManager, nptResource, StartWorkorder, StartWorkorderForm) {

        var vm = this;
        $scope.workorderid = $routeParams.id;

        //工单信息资源库
        vm.workorderInfo = QueryWorkorderInfo;

        //数据模型
        vm.model = {};

        //表单配置
        vm.startWorkorderOptions = {
            store: StartWorkorderForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
            }
        };

        //查询工单
        vm.query = function () {
            var id = $routeParams.id;
            if (id) {
                vm.workorderInfo.post({
                    workorderid: id
                }).then(function (response) {
                    vm.modelWorkorder = response.data.workOrder;
                }, function (error) {
                    var de = error;
                });
            }

        };

        vm.query();

        vm.startWorkorder = function() {
            var id = $routeParams.id;

            var params = {};
            var workorderids = [];

            workorderids.push(id);

            console.info(vm.model);

            params.postscript = vm.model.postscript;
            params.workorderids = workorderids;
            params.userid = nptSessionManager.getSession().getUser().id;

            StartWorkorder.post(params).then(function (response) {
                $location.path("/detail/" + id);
            }, function (err) {
                var de = err;
            });

        };

        vm.toDetail = function () {
            $location.path("/detail/" + $scope.workorderid);
        };
    }).
    controller("WorkorderCompleteController", function ($scope, $location, $routeParams, nptResource, nptSessionManager, CompleteWorkorder, QueryWorkorderInfo, CompleteWorkorderForm) {
        var vm = this;
        $scope.workorderid = $routeParams.id;

        //工单信息资源库
        vm.workorderInfo = QueryWorkorderInfo;

        //数据模型
        vm.model = {};

        //表单配置
        vm.completeWorkorderOptions = {
            store: CompleteWorkorderForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
            }
        };

        //查询工单
        vm.query = function () {
            var id = $routeParams.id;

            if (id) {
                vm.workorderInfo.post({
                    workorderid: id
                }).then(function (response) {
                    vm.modelWorkorder = response.data.workOrder;
                }, function (error) {
                    var de = error;
                });
            }

        };

        vm.query();

        vm.completeWorkorder = function() {
            var id = $routeParams.id;

            var params = {};
            var workorderids = [];

            workorderids.push(id);

            console.info(vm.model);

            params.postscript = vm.model.postscript;
            params.workorderids = workorderids;
            params.userid = nptSessionManager.getSession().getUser().id;

            CompleteWorkorder.post(params).then(function (response) {
                $location.path("/detail/" + id);
            }, function (err) {
                var de = err;
            });

        };

        vm.toDetail = function () {
            $location.path("/detail/" + $scope.workorderid);
        };
    }).
    controller("WorkorderDeliverController", function ($scope, $location, $routeParams, nptResource, QueryWorkorderInfo, deliverWorkorderForm, DeliverWorkorder) {
        var vm = this;
        $scope.workorderid = $routeParams.id;

        //工单信息资源库
        vm.workorderInfo = QueryWorkorderInfo;

        //数据模型
        vm.model = {};

        //表单配置
        vm.deliverWorkorderOptions = {
            store: deliverWorkorderForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
            }
        };

        //查询工单
        vm.query = function () {
            var id = $routeParams.id;

            if (id) {
                vm.workorderInfo.post({
                    workorderid: id
                }).then(function (response) {
                    vm.modelWorkorder = response.data.workOrder;
                }, function (error) {
                    var de = error;
                });
            }

        };

        vm.query();

        vm.deliverWorkorder = function() {
            var id = $routeParams.id;

            var params = {};
            var workorderids = [];

            workorderids.push(id);

            console.info(vm.model);

            params.postscript = vm.model.postscript;
            params.targetprocessid = vm.model.assignedid;
            params.workorderids = workorderids;

            DeliverWorkorder.post(params).then(function (response) {
                $location.path("/detail/" + id);
            }, function (err) {
                var de = err;
            });

        };

        vm.toDetail = function () {
            $location.path("/detail/" + $scope.workorderid);
        };
    });