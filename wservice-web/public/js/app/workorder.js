/**
 * Created by leon on 15/10/22.
 */

angular.module("workorderApp", ["datatable", "workorderConfig", "bizModule", "resource", "ngRoute"])
    .config(function ($routeProvider) {
        //注册订单路由
        $routeProvider
            .when("/detail/:id", {
                controller: "WorkorderDetailController",
                templateUrl: "detail.html"
            })
            //.when("/detail", {
            //    redirectTo: "/detail/add"
            //})
            .when("/list", {
                controller: "WorkorderListController",
                templateUrl: "list.html"
            })
            .otherwise({
                redirectTo: "/list"
            })
            .when("/startWorkorder/:id",{
                controller: "WorkorderStartController",
                templateUrl: "startWorkorder.html"
            })
            .when("/completeWorkorder/:id",{
                controller: "WorkorderCompleteController",
                templateUrl: "completeWorkorder.html"
            });

    })
    .service("workorderService", function ($http, $location, resourceConfig) {
        var self = this;

        /**
         * 切换是否执行检查新订单
         */
        this.checkNew = {
            isCollapsed: false,
            toggle: function () {
                self.checkNew.isCollapsed = !self.checkNew.isCollapsed;
                if (self.checkNew.isCollapsed) {
                    self.checkNew.text = "停止检查";
                    if (self.query.isCollapsed) {
                        self.query.toggle();
                    }
                }
                else {
                    self.checkNew.text = "检查新工单"
                }
            }
        };

        this.query = {
            state: "all",
            data: [],
            isCollapsed: false,
            toggle: function
                () {
                self.query.isCollapsed = !self.query.isCollapsed;
                if (self.query.isCollapsed) {
                    self.query.text = "关闭查询";
                    if (self.checkNew.isCollapsed) {
                        self.checkNew.toggle();
                    }
                } else {
                    self.query.text = "打开查询";
                }
            }
            ,
            list: function (state, success, error) {
                //将按钮设置为查询中
                self.query.loading('loading');
                //如果当前查询状态不是全部类型则将状态作为参数传递到服务器查询
                var params = {};

                if (state !== "all") {
                    params["state"] = state;
                }

                //总是加入当前用户以及机构作为查询参数
                params["instid"] = "10000001463017";
                params["processid"] = "10000001498059";

                resourceConfig
                    .post("queryWorkorderList", params, function (data) {
                        self.query.data = data;
                        self.query.state = state;
                        self.query.loading('reset')
                        success(data);
                    }, function (data) {
                        self.query.loading('reset')
                        //TODO 弹出提示检索错误通知窗口
                        error(data);
                    });
            },
            id: function (id, success, error) {
                resourceConfig.post("queryWorkorderDetail", {"workorderid": id}, success, error);
            },
            loading: function (state) {
                $("#all").button(state);
                $("#unstart").button(state);
                $("#inservice").button(state);
                $("#complete").button(state);
            },
            nextId: function (id) {
                if (id && self.query.data.length > 0) {
                    for (var i = 0; i < self.query.data.length; i++) {
                        if (id === self.query.data[i].id && i + 1 < self.query.data.length) {
                            return self.query.data[i + 1].id;
                        }
                    }
                }
            },
            previousId: function (id) {
                if (id && self.query.data.length > 0) {
                    for (var i = 0; i < self.query.data.length; i++) {
                        if (id === self.query.data[i].id && i - 1 >= 0) {
                            return self.query.data[i - 1].id;
                        }
                    }
                }
            },
            next: function (workorderid) {
                var newId = self.query.nextId(workorderid);
                if (newId) {
                    $location.path("/detail/" + newId);
                }
            },
            previous: function (workorderid) {
                var newId = self.query.previousId(workorderid);
                if (newId) {
                    $location.path("/detail/" + newId);
                }
            }
        };


        //默认状态为关闭自定义查询
        this.query.toggle();
        //默认状态为启动检查新单据
        this.checkNew.toggle();

    }).
    controller("WorkorderListController", function ($scope, $http, $location, workorderService, bizModuleConfig) {
        $scope.data = [];

        var config = bizModuleConfig.getModuleConfig("workorder");
        $scope.header = config.header;
        $scope.action = config.action;

        $scope.workorderAction = function (type, item, index) {
            console.info(type);
            if (item && type === "view") {
                $location.path("/detail/" + item.id);
                //$location.replace();
            }
        };

        //设置自定义查询以及检查新订单
        $scope.query = workorderService.query;
        $scope.checkNew = workorderService.checkNew;

        /**
         * 根据状态查询当前用户机构的订单列表
         */
        $scope.queryByState = function () {
            workorderService.query.list($scope.query.state, function (data) {
                $scope.data = data;
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            })
        };


        //首先查询全部订单
        if (workorderService.query.data.length <= 0) {
            $scope.queryByState();
        } else {
            $scope.data = workorderService.query.data;
        }
    }).
    controller("WorkorderDetailController", function ($scope, $location, $routeParams, workorderService, bizModuleConfig) {
        $scope.workorderid = $routeParams.id;

        $scope.query = workorderService.query;

        //加载工单资料的表头
        var orderAttachmentConfig = bizModuleConfig.getModuleConfig("orderAttachment");
        $scope.orderAttachmentHeader = orderAttachmentConfig.header;

        //加载工单评价的表头
        var workorderCommentConfig = bizModuleConfig.getModuleConfig("workorderComment");
        $scope.workorderCommentHeader = workorderCommentConfig.header;

        //刷新界面动作按钮控制状态
        $scope.resetState = function () {
            if ($scope.data.workOrder.state === "unstart") {
                $scope.isUnstart = true;
            } else {
                $scope.isUnstart = false;
            };
            if ($scope.data.workOrder.state === "inservice") {
                $scope.isInservice = true;
            } else {
                $scope.isInservice = false;
            };
        };

        //查询工单信息
        workorderService.query.id($scope.workorderid, function (data) {
            $scope.data = data || {order: {}};
            $scope.resetState();
        }, function (data) {
            //TODO 提示信息
        });

        $scope.doOrderAttachments = function(type,item,index) {

        };

        $scope.doWorkorderComment = function(type,item,index) {

        };
    }).
    controller("WorkorderStartController", function ($scope, $location, $routeParams, workorderService, bizModuleConfig) {
        $scope.workorderid = $routeParams.id;

        //查询工单信息
        workorderService.query.id($scope.workorderid, function (data) {
            $scope.data = data || {order: {}};
            $scope.resetState();
        }, function (data) {
            //TODO 提示信息
        });

        //开始工单
        $scope.startWorkorder = function() {
            alert($scope.postscript);
            $location.path("/detail/"+$scope.workorderid);
        };
    }).
    controller("WorkorderCompleteController", function ($scope, $location, $routeParams, workorderService, bizModuleConfig) {
        $scope.workorderid = $routeParams.id;

        //查询工单信息
        workorderService.query.id($scope.workorderid, function (data) {
            $scope.data = data || {order: {}};
            $scope.resetState();
        }, function (data) {
            //TODO 提示信息
        });

        //开始工单
        $scope.startWorkorder = function() {
            alert($scope.postscript);
            $location.path("/detail/"+$scope.workorderid);
        };
    });