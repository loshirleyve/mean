/**
 * Created by leon on 15/10/22.
 */

angular.module("orderApp", ["ui.neptune", "ngRoute", 'ui.tree'])
    .config(function ($routeProvider, DatatableStoreProvider) {
        //注册订单路由
        $routeProvider
            .when("/detail/:id", {
                controller: "OrderDetailController",
                templateUrl: "detail.html"
            })
            .when("/detail", {
                redirectTo: "/detail/add"
            })
            .when("/list", {
                controller: "OrderListController",
                templateUrl: "list.html"
            })
            .when("/confirm/:id", {
                controller: "ConfirmOrderController",
                templateUrl: "confirm.html"
            })
            .when("/adviser/:id", {
                controller: "AdviserOrderController",
                templateUrl: "adviser.html"
            })
            .otherwise({
                redirectTo: "/list"
            });

        DatatableStoreProvider.store("order", {
            "header": [
                {
                    "name": "buyerinstid",
                    "label": "客户名称"
                },
                {
                    "name": "ordersn",
                    "label": "订单号"
                },
                {
                    "name": "name",
                    "label": "订单名称"
                },
                {
                    "name": "purchase",
                    "label": "购买人"
                },
                {
                    "name": "adviser",
                    "label": "专属顾问"
                },
                {
                    "name": "salesmanid",
                    "label": "销售顾问"
                },
                {
                    "name": "orderamount",
                    "label": "金额"
                },
                {
                    "name": "factamount",
                    "label": "实际金额"
                },
                {
                    "name": "state",
                    "label": "订单状态"
                },
                {
                    "name": "createdate",
                    "label": "创建日期"
                }
            ],
            "action": [
                {
                    "name": "view",
                    "label": "查看"
                }
            ]
        }).store("orderProduct", {
            header: [
                {
                    name: "productname",
                    label: "产品名称"
                }, {
                    name: "productIntroduce",
                    label: "产品简介"
                },
                {
                    name: "goodsamount",
                    label: "产品价格"
                }, {
                    name: "productclassifyname",
                    label: "已选分类"
                }
            ]
        }).store("orderWorkOrder", {
            header: [
                {
                    name: "descr",
                    label: "工单名称"
                }, {
                    name: "inserviceName",
                    label: "服务状态"
                }, {
                    name: "descr",
                    label: "进度"
                }, {
                    name: "assignedInfo",
                    label: "分配信息"
                }
            ],
            action: [
                {
                    name: "view",
                    label: "查看"
                }
            ]
        }).store("userList", {
            header: [
                {
                    name: "name",
                    label: "姓名"
                }],
            action: [
                {
                    name: "select",
                    label: "选择"
                }
            ]
        });
    })
    .service("orderService", function ($http, $location, Resource) {
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

        this.org = {
            queryUserByOrgId: function (orgid, success, error) {
                //根据组织ID查询用户列表
                Resource.post("queryUsersByOrgid", {
                    "orgid": orgid
                }, success, error);

            },
            queryOrgTreeAndBuilderNode: function (instid, success, error) {
                //根据机构id查询组织结构,并重新构建为适应tree指令的数据结构
                Resource.post("queryOrgTree", {
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
                            id: data[i]["id"],
                            title: data[i]["name"]
                        };
                        self.org.builderOrgTreeNode(node, data[i].children);
                        nodes.nodes.push(node);
                    }
                }
            }
        };

        this.query = {
            state: "all",
            data: [],
            currPage: 0,
            isCollapsed: false,
            toggle: function () {
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
                    params["state"] = state;
                }

                //总是加入当前用户以及机构作为查询参数
                params["instid"] = "10000001463017";
                params["userid"] = "10000001498059";

                Resource
                    .post("queryOrderList", params, function (data) {
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
                Resource.post("queryOrderInfo", {"orderid": id}, success, error);
            },
            loading: function (state) {
                $("#all").button(state);
                $("#waitconfirm").button(state);
                $("#inservice").button(state);
                $("#buy").button(state);
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
            next: function (orderid) {
                var newId = self.query.nextId(orderid);
                if (newId) {
                    $location.path("/detail/" + newId);
                }
            },
            previous: function (orderid) {
                var newId = self.query.previousId(orderid);
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
    controller("OrderListController", function ($scope, $http, $location, orderService) {
        $scope.data = [];
        $scope.orderAction = function (type, item, index) {
            console.info(type);
            if (item && type === "view") {
                $location.path("/detail/" + item.id);
            }
        };

        //设置自定义查询以及检查新订单
        $scope.query = orderService.query;
        $scope.checkNew = orderService.checkNew;

        /**
         * 根据状态查询当前用户机构的订单列表
         */
        $scope.queryByState = function () {
            orderService.query.list($scope.query.state, function (data) {
                $scope.data = data;
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            })
        };

        //首先查询全部订单
        if (orderService.query.data.length <= 0) {
            $scope.queryByState();
        } else {
            $scope.data = orderService.query.data;
        }
    })
    .controller("OrderDetailController", function ($scope, $location, $routeParams, orderService) {
        $scope.orderid = $routeParams.id;

        $scope.query = orderService.query;


        $scope.doOrderProducts = function (type, item, index) {
        };

        $scope.doWorkorders = function (type, item, index) {
        };

        //刷新界面动作按钮控制状态
        $scope.resetState = function () {
            if ($scope.data.order.state === "waitconfirm") {
                $scope.isConfirm = true;
            } else {
                $scope.isConfirm = false;
            }
        };

        //查询订单信息
        orderService.query.id($scope.orderid, function (data) {
            $scope.data = data || {order: {}};
            $scope.resetState();
        }, function (data) {
            //TODO 提示信息
        });
    }).controller("ConfirmOrderController", function ($scope, $routeParams, $location, $timeout, orderService) {
        $scope.orderid = $routeParams.id;
        $scope.org = orderService.org;
        $scope.query = orderService.query;

        $scope.confirm = function () {
            $location.path("/detail/" + $scope.orderid);
        };

        $scope.openSelectUser = function () {
            orderService.org.queryOrgTreeAndBuilderNode("10000001468002", function (data) {
                $scope.orgData = data;
                $('#selectUserId').modal('show');
            }, function (data) {
                //TODO 提示查询组织失败的信息
            });

        };

        $scope.closeSelectUser = function () {
            $('#selectUserId').modal('hide');
        };

        $scope.clickOrg = function (node) {
            orderService.org.queryUserByOrgId(node.id, function (data) {
                $scope.orgUsers = data;
            }, function (data) {

            });
        };

        $scope.onSelectUser = function (type, item, index) {
            $scope.adviser = item;
            $scope.adviserName = item.name;
            $('#selectUserId').modal('hide');
        };

        //查询订单信息
        orderService.query.id($scope.orderid, function (data) {
            $scope.data = data || {order: {}};
        }, function (data) {
            //TODO 提示信息
        });

    }).controller("AdviserOrderController", function ($scope, $location, $routeParams, orderService) {
        $scope.orderid = $routeParams.id;

        $scope.query = orderService.query;
        $scope.org = orderService.org;


        $scope.confirm = function () {
            $location.path("/detail/" + $scope.orderid);
        };

        $scope.clickOrg = function (scope) {
            //TODO 检索用户列表
            orderService.org.queryUserByOrgId(scope.$id, function (data) {
                $scope.orgUsers = data;
            }, function (data) {
            });
        };

        //查询订单信息
        orderService.query.id($scope.orderid, function (data) {
            $scope.data = data || {order: {}};
        }, function (data) {
            //TODO 提示信息
        });
    }).directive("number2date", function () {
        return {
            require: 'ngModel',
            link: function (scope, ele, attrs, ctrl) {
                var validateFn = function (value) {
                    var valid = false;
                    var stringValue = value + "";
                    if (value && stringValue.length === 8) {
                        var newValue = stringValue.substring(0, 4) + "/" + stringValue.substring(4, 6) + "/" + stringValue.substring(6, 8);
                        var date = new Date(newValue);
                        if (isNaN(date)) {
                            //不是日期格式
                            valid = false;
                        } else {
                            //日期格式正确
                            valid = true;
                        }
                    }
                    ctrl.$setValidity("number2date", valid);
                    return value;
                };

                ctrl.$parsers.push(validateFn);
                ctrl.$formatters.push(validateFn);

                //scope.$watch(attrs.number2date, function () {
                //    ctrl.$setViewValue(ctrl.$viewValue);
                //});
            }
        }
    });