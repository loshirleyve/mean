/**
 * Created by leon on 15/10/22.
 */

angular.module("workorderApp", ["workorderApp.workorderListDatatable", "ngRoute"])
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
                controller: "WorkorderListController",
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
    .service("workorderService", function ($http, $location, nptResource, nptSessionManager, QueryWorkorderList) {
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
                    self.checkNew.text = "检查新工单";
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
            },
            list: function (state, success, error) {
                //将按钮设置为查询中
                self.query.loading('loading');
                //如果当前查询状态不是全部类型则将状态作为参数传递到服务器查询
                var params = {};

                if (state !== "all") {
                    params.state = state;
                }
                //总是加入当前用户以及机构作为查询参数
                params.instid = nptSessionManager.getSession().getInst().id;
                params.processid = nptSessionManager.getSession().getUser().id;
                QueryWorkorderList.post( params).then(function (response) {
                    self.query.data = response.data;
                    self.query.state = state;
                    self.query.loading('reset');
                    success(response.data);
                }, function (data) {
                    self.query.loading('reset');
                    //TODO 弹出提示检索错误通知窗口
                    error(data);
                });
            },
            id: function (id, success, error) {
                nptResource.post("queryWorkorderDetail", {"workorderid": id}, success, error);
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

        this.org = {
            queryUserByOrgId: function (orgid, success, error) {
                //根据组织ID查询用户列表
                nptResource.post("queryUsersByOrgid", {
                    "orgid": orgid
                }, success, error);

            },
            queryOrgTreeAndBuilderNode: function (instid, success, error) {
                //根据机构id查询组织结构,并重新构建为适应tree指令的数据结构
                nptResource.post("queryOrgTree", {
                    "instid": instid,
                    "dimtype": "hr"
                }, function (data) {
                    var orgNodes = [{
                        id: data.id,
                        title: data.simplename
                    }];
                    self.org.builderOrgTreeNode(orgNodes[0], data.children);
                    if (success) {
                        success(orgNodes);
                    }
                }, function (data) {
                    if (error) {
                        error(data);
                    }
                });

            },
            builderOrgTreeNode: function (nodes, data) {
                if (data) {
                    nodes.nodes = [];
                    for (var i = 0; i < data.length; i++) {
                        var node = {
                            id: data[i].id,
                            title: data[i].name
                        };
                        self.org.builderOrgTreeNode(node, data[i].children);
                        nodes.nodes.push(node);
                    }
                }
            }
        };

        //默认状态为关闭自定义查询
        this.query.toggle();
        //默认状态为启动检查新单据
        this.checkNew.toggle();

    })
    .controller("WorkorderListController", function ($scope, $http, $location, QueryWorkorderList) {
        var vm = this;

        //订单列表数据资源库
        vm.workorderList = QueryWorkorderList;

        vm.workorderListGridOptions = {
            store: WorkorderListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.nptGridApi = nptGridApi;
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
    controller("WorkorderDetailController", function ($scope, $location, $routeParams, workorderService, nptResource, nptSessionManager) {
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
    controller("WorkorderStartController", function ($scope, $location, $routeParams, workorderService, nptResource, nptSessionManager) {
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
    controller("WorkorderCompleteController", function ($scope, $location, $routeParams, workorderService, nptResource, nptSessionManager) {
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
    controller("WorkorderDeliverController", function ($scope, $location, $routeParams, workorderService, nptResource) {
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
    }).factory("QueryWorkorderList",function(nptRepository) {
        return nptRepository("queryWorkorderList");
    });