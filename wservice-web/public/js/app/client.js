/**
 * Created by shirley on 15/11/3.
 */

angular.module("clientApp", ["datatable", "clientConfig", "bizModule", "resource", "ngRoute"])
    .config(function ($routeProvider) {
        //注册客户路由
        $routeProvider
            .when("/detail/:id", {
                controller: "BizPageDetailController",
                templateUrl: "detail.html"
            })
            .when("/detail", {
                redirectTo: "/detail/add"
            })
            .when("/list", {
                controller: "BizPageListController",
                templateUrl: "list.html"
            })
            .otherwise({
                redirectTo: "/list"
            });

    })
    .service("clientService", function ($http, $location, resourceConfig) {
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
                    self.checkNew.text = "检查新订单"
                }
            }
        };

        this.query = {
            state: "all",
            data: [],
            isCollapsed: false,
            toggle: function() {
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
                params["userid"] = "10000001498059";

                resourceConfig
                    .post("queryInstClients", params, function (data) {
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
                resourceConfig.post("queryInstClientById", {"instClient": id}, success, error);
            },
            loading: function (state) {
                $("#all").button(state);
               /* $("#waitconfirm").button(state);
                $("#inservice").button(state);
                $("#buy").button(state);*/
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
            next: function (clientid) {
                var newId = self.query.nextId(clientid);
                if (newId) {
                    $location.path("/detail/" + newId);
                }
            },
            previous: function (clientid) {
                var newId = self.query.previousId(clientid);
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
    controller("BizPageListController", function ($scope, $http, $location, clientService, bizModuleConfig) {
        $scope.data = [];

        var config = bizModuleConfig.getModuleConfig("client");
        $scope.header = config.header;
        $scope.action = config.action;

        $scope.clientAction = function (type, item, index) {
            console.info(type);
            if (item && type === "view") {
                $location.path("/detail/" + item.id);
                //$location.replace();
            }
        };

        //设置自定义查询以及检查新订单
        $scope.query = clientService.query;
        $scope.checkNew = clientService.checkNew;

        /**
         * 根据状态查询当前用户机构的订单列表
         */
        $scope.queryByState = function () {
            clientService.query.list($scope.query.state, function (data) {
                $scope.data = data;
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            })
        };


        //首先查询全部客户
        if (clientService.query.data.length <= 0) {
            $scope.queryByState();
        } else {
            $scope.data = clientService.query.data;
        }
    })
    .controller("BizPageDetailController", function ($scope, $location, $routeParams, clientService, bizModuleConfig) {
        $scope.clientid = $routeParams.id;

        $scope.query = clientService.query;

/*        var orderProductConfig = bizModuleConfig.getModuleConfig("orderProduct");
        $scope.productHeader = orderProductConfig.header;
        $scope.productAction = [];

        var orderWorkOrder = bizModuleConfig.getModuleConfig("orderWorkOrder");
        $scope.workOrderHeader = orderWorkOrder.header;
        $scope.workOrderAction = orderWorkOrder.action;

        $scope.doOrderProducts = function (type, item, index) {
        };

        $scope.doWorkorders = function (type, item, index) {
        };

        //刷新界面动作按钮控制状态
        $scope.resetState = function () {
            if ($scope.data.client.state === "waitconfirm") {
                $scope.isConfirm = true;
            } else {
                $scope.isConfirm = false;
            }
        };*/

        //查询客户信息
        clientService.query.id($scope.clientid, function (data) {
            $scope.data = data || {client: {}};
            $scope.resetState();
        }, function (data) {
            //TODO 提示信息
        });
    });