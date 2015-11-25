/**
 * Created by rxy on 15/11/3.
 */
angular.module("receivableApp", ["wservice.dt.store.receivable", "wservice.form.store.receivable", "wservice.common", "ngRoute"])
    .config(function ($routeProvider) {
        //注册产品路由
        $routeProvider
            .when("/list", {
                controller: "receivableListController",
                templateUrl: "list.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/detail/:id", {
                controller: "receivableDetailController",
                templateUrl: "detail.html"
            })
            .otherwise({
                redirectTo: "/list"
            });
    })
    .service("receivableService", function ($http, $location, nptResource) {
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
                    self.checkNew.text = "检查新订单";
                }
            }
        };


        this.query = {
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
            list: function (state,success, error) {
                //将按钮设置为查询中
                self.query.loading('loading');
                //如果当前查询状态不是全部类型则将状态作为参数传递到服务器查询
                var params = {};
                if(state!='all')
                    params.complete=state;
                //总是加入当前用户以及机构作为查询参数
                params.instid = "10000001468002";
                params.createby = "10000001519061";
                nptResource
                    .post("QueryPayRegisters", params, function (data) {
                        self.query.data = data;
                        self.query.loading('reset');
                        success(data);
                    }, function (data) {
                        self.query.loading('reset');
                        //TODO 弹出提示检索错误通知窗口
                        error(data);
                    });

            },
            id: function (id, success, error) {
                nptResource.post("QueryProductInfoById", {"receivableid": id}, success, error);
            },
            loading: function (state) {
                $("#all").button(state);
                $("#yishoukuan").button(state);
                $("#weishoukuan").button(state);
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
            next: function (receivableid) {
                var newId = self.query.nextId(receivableid);
                if (newId) {
                    $location.path("/detail/" + newId);
                }
            },
            previous: function (receivableid) {
                var newId = self.query.previousId(receivableid);
                if (newId) {
                    $location.path("/detail/" + newId);
                }
            }
        };


        //默认状态为关闭自定义查询
        this.query.toggle();
        //默认状态为启动检查新单据
        this.checkNew.toggle();

    }).controller("receivableListController", function ($scope, $http, $location, receivableService) {
        $scope.data = [];
        var self = this;


        //设置自定义查询以及检查新订单
        $scope.query = receivableService.query;
        $scope.checkNew = receivableService.checkNew;

        /**
         * 根据状态查询当前用户机构的产品列表
         */
        $scope.queryByState = function () {
            receivableService.query.list($scope.query.state, function (data) {
                $scope.data = data;
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            });
        };

        //首先查询全部产品
        if (receivableService.query.data.length <= 0) {
            $scope.queryByState();
        } else {
            $scope.data = receivableService.query.data;
        }

    }).controller("receivableDetailController", function ($scope, $location, $routeParams, receivableService) {
        $scope.receivableid = $routeParams.id;

        $scope.query = receivableService.query;


        //查询产品信息
        receivableService.query.id($scope.receivableid, function (data) {
            $scope.data = data || {receivable: {}};
        }, function (data) {
            //TODO 提示信息
        });
    });