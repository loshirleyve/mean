/**
 * Created by rxy on 15/11/3.
 */
angular.module("productApp", ["datatable", "productConfig", "bizModule", "resource", "ngRoute"])
    .config(function ($routeProvider) {
        //注册产品路由
        $routeProvider
            .when("/list", {
                controller: "productListController",
                templateUrl: "list.html"
            })
            .when("/detail/:id", {
                controller: "productDetailController",
                templateUrl: "detail.html"
            })
            .otherwise({
                redirectTo: "/list"
            });
    })
    .service("productService", function ($http, $location, resourceConfig) {
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
            groupid: "all",
            data: [],
            classfilesData:[],
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

                if (groupid !== "all") {
                    params["groupid"] = groupid;
                }

                //总是加入当前用户以及机构作为查询参数
                params["instid"] = "10000001468002";
                params["userid"] = "10000001498059";

                resourceConfig
                    .post("QueryProductsByGroupId", params, function (data) {
                        self.query.data = data;
                        self.query.groupid = groupid;
                        self.query.loading('reset')
                        success(data);
                    }, function (data) {
                        self.query.loading('reset')
                        //TODO 弹出提示检索错误通知窗口
                        error(data);
                    });
            },
            productClassifies:function(province,city,district,success,error)
            {
                var params={};
                params["province"]="广东省";
                params["city"]="深圳市";
                params["district"]="全城";
                resourceConfig.post("QueryMdProductGroupBylocation",params,function(data)
                {
                   self.query.classfilesData=data;
                   self.query.loading('reset')
                   success(data);
                },function(data){
                    self.query.loading('reset')
                    //TODO 弹出提示检索错误通知窗口
                    error(data);
                });
            },
            id: function (id, success, error) {
                resourceConfig.post("QueryProductInfoById", {"productid": id}, success, error);
            },
            loading: function (groupid) {
                $("#all").button(groupid);
                $("#weifenlei").button(groupid);
                $("#jinxuan").button(groupid);
                $("#caiwu").button(groupid);
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
    .controller("productListController", function ($scope, $http, $location, productService, bizModuleConfig) {
        $scope.data = [];
        var self = this;
        var config = bizModuleConfig.getModuleConfig("product");
        $scope.header = config.header;
        $scope.action = config.action;

        $scope.productAction = function (type, item, index) {
            if (item && type === "view") {
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
            })
        };

        //首先查询全部订单
        if (productService.query.data.length <= 0) {
            $scope.queryByGroupId();
        } else {
            $scope.data = productService.query.data;
        }

        $scope.classfilesData = [];

        var allproductClassifiesConfig = bizModuleConfig.getModuleConfig("allproductClassifies");
        $scope.allproductClassifiesHeader = allproductClassifiesConfig.header;
        $scope.allproductClassifiesAction = allproductClassifiesConfig.action;

        $scope.dollproductClassifies = function (type, item, index) {
            if (item && type === "edit") {
                $location.path("/detail/" + item.id);
                //$location.replace();
            }
            if (item && type === "delete") {
                $location.path("/detail/" + item.id);
                //$location.replace();
            }
        };

        //首先查询全部订单
//        if (productService.query.classfilesData.length <= 0) {
//            $scope.queryProductClassifies();
//        } else {
//            $scope.classfilesData = productService.query.classfilesData;
//        }

        /**
         * 根据状态查询当前地区的产品分类列表
         */
//        $scope.queryProductClassifies= function () {
//            productService.query.productClassifies($scope.query.province,$scope.query.city,$scope.query.district, function (data) {
//                $scope.classfilesData = data;
//                console.info($scope.classfilesData);
//            }, function (data) {
//                //TODO 弹出提示检索错误通知窗口
//            })
//        };
    }).controller("productClassfilesController", function ($scope, $http, $location, productService, bizModuleConfig) {
        $scope.data = [];

        var allproductClassifiesConfig = bizModuleConfig.getModuleConfig("allproductClassifies");
        $scope.allproductClassifiesHeader = allproductClassifiesConfig.header;
        $scope.allproductClassifiesAction = allproductClassifiesConfig.action;

        $scope.dollproductClassifies = function (type, item, index) {
            if (item && type === "edit") {
                $location.path("/detail/" + item.id);
                //$location.replace();
            }
            if (item && type === "delete") {
                $location.path("/detail/" + item.id);
                //$location.replace();
            }
        };

        /**
         * 根据状态查询当前地区的产品分类列表
         */
        $scope.queryProductClassifies= function () {
            productService.query.productClassifies($scope.query.province,$scope.query.city,$scope.query.district, function (data) {
                $scope.data = data;
                console.info($scope.data);
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            })
        };
    })
    .controller("productDetailController", function ($scope, $location, $routeParams, productService, bizModuleConfig) {
        $scope.productid = $routeParams.id;

        $scope.query = productService.query;

        var productPhasesConfig = bizModuleConfig.getModuleConfig("productPhases");
        $scope.productPhasesHeader = productPhasesConfig.header;
        $scope.productPhasesAction = productPhasesConfig.action;

        $scope.doProductPhases = function (type, item, index) {
            if (item && type === "edit") {
                $location.path("/detail/" + item.id);
                //$location.replace();
            }
            if (item && type === "delete") {
                $location.path("/detail/" + item.id);
                //$location.replace();
            }
        };

        var productProfilesConfig = bizModuleConfig.getModuleConfig("productProfiles");
        $scope.productProfilesHeader = productProfilesConfig.header;
        $scope.productProfilesAction = productProfilesConfig.action;

        $scope.doProductProfiles = function (type, item, index) {
            if (item && type === "edit") {
                $location.path("/detail/" + item.id);
                //$location.replace();
            }
            if (item && type === "delete") {
                $location.path("/detail/" + item.id);
                //$location.replace();
            }
        };

        var productGroupsConfig = bizModuleConfig.getModuleConfig("productGroups");
        $scope.productGroupsHeader = productGroupsConfig.header;
        $scope.productGroupsAction = productGroupsConfig.action;

        $scope.doProductGroups= function (type, item, index) {
            if (item && type === "edit") {
                $location.path("/detail/" + item.id);
                //$location.replace();
            }
            if (item && type === "delete") {
                $location.path("/detail/" + item.id);
                //$location.replace();
            }
        };

        var productClassifiesConfig = bizModuleConfig.getModuleConfig("productClassifies");
        $scope.productClassifiesHeader = productClassifiesConfig.header;
        $scope.productClassifiesAction = productClassifiesConfig.action;

        $scope.doProductClassifies= function (type, item, index) {
            if (item && type === "edit") {
                $location.path("/detail/" + item.id);
                //$location.replace();
            }
            if (item && type === "delete") {
                $location.path("/detail/" + item.id);
                //$location.replace();
            }
        };

        var productDescrsConfig = bizModuleConfig.getModuleConfig("productDescrs");
        $scope.productDescrsHeader = productDescrsConfig.header;
        $scope.productDescrsAction = productDescrsConfig.action;

        $scope.doProductDescrs= function (type, item, index) {
            if (item && type === "edit") {
                $location.path("/detail/" + item.id);
                //$location.replace();
            }
            if (item && type === "delete") {
                $location.path("/detail/" + item.id);
                //$location.replace();
            }
        };


        //刷新界面动作按钮控制状态
//        $scope.resetState = function () {
//            if ($scope.data.product.state === "offshelves") {
//                $scope.isConfirm = true;
//            } else {
//                $scope.isConfirm = false;
//            }
//        };

        //查询产品信息
        productService.query.id($scope.productid, function (data) {
            $scope.data = data || {product: {}};
            $scope.resetState();
            console.info($scope.data)
        }, function (data) {
            //TODO 提示信息
        });
    });