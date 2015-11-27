/**
 * Created by leon on 15/10/22.
 */

angular.module("workorderApp", ["ui.neptune", "workorderApp.WorkorderListGrid","wservice.common","ngRoute"])
    .config(function ($routeProvider) {
        //注册订单路由
        $routeProvider
            .when("/detail/:id", {
                controller: "WorkorderDetailController",
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
                controller: "WorkorderStartController",
                templateUrl: "startWorkorder.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/completeWorkorder/:id",{
                controller: "WorkorderCompleteController",
                templateUrl: "completeWorkorder.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/deliverWorkorder/:id",{
                controller: "WorkorderDeliverController",
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
    .controller("WorkorderListController", function ($scope, $http, $location, QueryWorkorderList, WorkorderListGrid) {
        var vm = this;

        //订单列表数据资源库
        vm.workorderList = QueryWorkorderList;

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

        /**
         * 根据状态查询当前用户机构的订单列表
         */
        vm.queryByState = function (state, name) {
            vm.state = QueryWorkorderList.post({
                state: state
            }).then(function () {
                vm.queryName = name;
            }, function (error) {
            });
        };

        //首先查询全部订单
        if (!QueryWorkorderList.data || QueryWorkorderList.data.length <= 0) {
            vm.queryByState("", '全部');
        }
    }).
    controller("WorkorderDetailController", function ($scope, $location, $routeParams, nptResource, nptSessionManager) {
        $scope.workorderid = $routeParams.id;
        $scope.org = workorderService.org;

        $scope.query = workorderService.query;

        //刷新界面动作按钮控制状态
        $scope.resetState = function () {
            if ($scope.data.workOrder.state === "unstart") {
                $scope.isUnstart = true;
            } else {
                $scope.isUnstart = false;
            }
            if ($scope.data.workOrder.state === "inservice") {
                $scope.isInservice = true;
            } else {
                $scope.isInservice = false;
            }
            if ($scope.data.workOrder.state === "complete") {
                $scope.isNotComplete = false;
            } else {
                $scope.isNotComplete = true;
            }
        };

        //查询工单信息
        workorderService.query.id($scope.workorderid, function (data) {
            $scope.data = data || {order: {}};
            $scope.resetState();
        }, function (data) {
            //TODO 提示信息
        });

        //打开用户选择模态框
        $scope.deliver = function () {
            $scope.selectAdviser.open();
        };

        //执行转交
        $scope.onSelect = function (type, item, index) {
            $scope.adviser = item;
            $scope.adviserName = item.name;

            var params = {};

            var workorderids = [];
            workorderids.push($scope.workorderid);

            params.workorderids = workorderids;
            params.targetprocessid = item.id;
            params.postscript = "ceshi";

            //调用服务
            nptResource.post("deliverWorkorder", params, function (data) {
                $location.path("/detail/"+$scope.workorderid);
            }, function (data) {

            });
        };
    }).
    controller("WorkorderStartController", function ($scope, $location, $routeParams, nptResource, nptSessionManager) {
        $scope.workorderid = $routeParams.id;

        //查询工单信息
        workorderService.query.id($scope.workorderid, function (data) {
            $scope.data = data || {order: {}};
        }, function (data) {
            //TODO 提示信息
        });

        //开始工单
        $scope.startWorkorder = function() {
            var params = {};
            var workorderids = [];

            workorderids.push($scope.workorderid);

            params.postscript = $scope.postscript;
            params.workorderids = workorderids;
            params.userid = nptSessionManager.getSession().getUser().id;

            nptResource
                .post("startWorkorder", params, function (data) {
                    workorderService.query.data = [];
                    $location.path("/detail/"+$scope.workorderid);
                }, function (data) {
                    //TODO 弹出提示检索错误通知窗口
                    error(data);
                });
        };
    }).
    controller("WorkorderCompleteController", function ($scope, $location, $routeParams, nptResource, nptSessionManager) {
        $scope.workorderid = $routeParams.id;

        //查询工单信息
        workorderService.query.id($scope.workorderid, function (data) {
            $scope.data = data || {order: {}};
        }, function (data) {
            //TODO 提示信息
        });

        //开始工单
        $scope.completeWorkorder = function() {
            var params = {};
            var workorderids = [];

            workorderids.push($scope.workorderid);

            params.postscript = $scope.postscript;
            params.workorderids = workorderids;
            params.userid = nptSessionManager.getSession().getUser().id;

            nptResource
                .post("completeWorkorder", params, function (data) {
                    workorderService.query.data = [];
                    $location.path("/detail/"+$scope.workorderid);
                }, function (data) {
                    //TODO 弹出提示检索错误通知窗口
                    error(data);
                });
        };
    }).
    controller("WorkorderDeliverController", function ($scope, $location, $routeParams, nptResource) {
        $scope.workorderid = $routeParams.id;
        var deliverid;
        $scope.postscript = "";

        //打开用户选择模态框
        $scope.openSelectUser = function () {
            $scope.selectAdviser.open();
        };

        //选择用户，表单显示选择人
        $scope.onSelect = function (type, item, index) {
            deliverid = item.id;
            $scope.deliverName = item.name;
        };


        $scope.deliver = function () {
            var params = {};

            var workorderids = [];
            workorderids.push($scope.workorderid);

            params.workorderids = workorderids;
            params.targetprocessid = deliverid;
            params.postscript = $scope.postscript;

            //调用服务
            nptResource.post("deliverWorkorder", params, function (data) {
                $location.path("/detail/"+$scope.workorderid);
            }, function (data) {

            });
        };
    });