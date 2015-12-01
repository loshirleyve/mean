/**
 * Created by leon on 15/10/22.
 */

angular.module("workorderApp", ["ui.neptune", "workorderApp.WorkorderListGrid", "workorderApp.workorderForm","workorderApp.WorkorderAttachmentGrid","workorderApp.WorkorderCommentGrid","wservice.common","ngRoute"])
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
        }

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
        }

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
        }

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