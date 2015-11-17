/**
 * Created by rxy on 15/11/17.
 */
angular.module("receivableApp", ["wservice.dt.store.receivable","wservice.form.store.receivable", "ngRoute"])
    .config(function ($routeProvider) {
        //注册产品路由
        $routeProvider
            .when("/list", {
                controller: "receivableListController",
                templateUrl: "list.html"
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
            groupid: "all",
            data: [],
            groupdata: [],
            cities: [],
            ctrlCode: [],
            proPhase: [],
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
            list: function (groupid, success, error) {
                //将按钮设置为查询中
                self.query.loading('loading');
                //如果当前查询状态不是全部类型则将状态作为参数传递到服务器查询
                var params = {};
                //总是加入当前用户以及机构作为查询参数
                params.instid= "10000001468002";
                //params["userid"] = "10000001498059";

                if (groupid == "weifenlei") {
                    nptResource
                        .post("QueryProductsNoGroup", params, function (data) {
                            self.query.data = data;
                            self.query.loading('reset');
                            success(data);
                        }, function (data) {
                            self.query.loading('reset');
                            //TODO 弹出提示检索错误通知窗口
                            error(data);
                        });
                }
                if (groupid != "weifenlei") {
                    if (groupid != "all") {
                        params.groupid = groupid;
                    }
                    nptResource
                        .post("QueryProductsByGroupId", params, function (data) {
                            self.query.data = data;
                            self.query.groupid = groupid;
                            self.query.loading('reset');
                            success(data);
                        }, function (data) {
                            self.query.loading('reset');
                            //TODO 弹出提示检索错误通知窗口
                            error(data);
                        });
                }
            },
            id: function (id, success, error) {
                nptResource.post("QueryProductInfoById", {"productid": id}, success, error);
            },
            loading: function (groupid) {
//                $("#all").button(groupid);
//                $("#weifenlei").button(groupid);
//                if(self.query.groupdata.length>0)
//                {
//                    for(i=0;i<=self.query.groupdata.length;i++)
//                    {
//                        $(self.query.groupdata[i].id).button(groupid);
//                    }
//                }
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
            next: function (productid) {
                var newId = self.query.nextId(productid);
                if (newId) {
                    $location.path("/detail/" + newId);
                }
            },
            previous: function (productid) {
                var newId = self.query.previousId(productid);
                if (newId) {
                    $location.path("/detail/" + newId);
                }
            }
        };


        //默认状态为关闭自定义查询
        this.query.toggle();
        //默认状态为启动检查新单据
        this.checkNew.toggle();

    })
    .controller("receivableListController", function ($scope, $http, $location, productService) {
        $scope.data = [];
        $scope.groupdata = [];
        var self = this;

        $scope.productAction = function (type, item, index) {
            if (item && type === "none") {
                $location.path("/detail/" + item.id);
                ///$location.replace();
            }
        };

        //设置自定义查询以及检查新订单
        $scope.query = productService.query;
        $scope.checkNew = productService.checkNew;

        /**
         * 根据状态查询当前用户机构的产品列表
         */
        $scope.queryByGroupId = function () {
            productService.query.list($scope.query.groupid, function (data) {
                $scope.data = data;
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            });
        };

        //首先查询全部产品
        if (productService.query.data.length <= 0) {
            $scope.queryByGroupId();
        } else {
            $scope.data = productService.query.data;
        }

    });
