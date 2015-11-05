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
//                params["instid"] = "10000001468002";
//                params["userid"] = "10000001498059";

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
            productGroup:function(province,city,district,success,error)
            {
                var params={};
                params["province"]="陕西省";
                params["city"]="西安市";
                params["district"]="全城";
                resourceConfig.post("QueryMdProductGroupBylocation",params,function(data)
                {
                   self.query.data=data;
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

        this.add = {
            addGroup:function(groupname,success,error)
            {
                var params={};
                params["name"]=groupname;
                params["province"]="陕西省";
                params["city"]="西安市";
                params["district"]="全城";
                params["createby"]="10000001498059";
                resourceConfig.post("AddOrUpdateMdProductGroup",params,function(data)
                {
                    self.query.data=data;
                    self.query.loading('reset')
                    success(data);
                },function(data){
                    self.query.loading('reset')
                    //TODO 弹出提示检索错误通知窗口
                    error(data);
                });
            }
        };

        //默认状态为关闭自定义查询
        this.query.toggle();
        //默认状态为启动检查新单据
        this.checkNew.toggle();

    })
    .controller("productListController", function ($scope, $http, $location, productService, bizModuleConfig) {
        $scope.data = [];
        $scope.groupdata = [];
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

        //首先查询全部产品
        if (productService.query.data.length <= 0) {
            $scope.queryByGroupId();
        } else {
            $scope.data = productService.query.data;
        }


        var allproductGroup = bizModuleConfig.getModuleConfig("allProductGroup");
        $scope.allproductGroupHeader = allproductGroup.header;
        $scope.allproductGroupAction = allproductGroup.action;

        $scope.dollproductGroup = function (type, item, index) {
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
        $scope.queryProductGroup= function () {
            productService.query.productGroup($scope.query.province,$scope.query.city,$scope.query.district, function (data) {
                $scope.groupdata = data;
                console.info($scope.groupdata);
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            })
        };

        /**
         * 添加分组
         */
        $scope.addGroup= function () {
            productService.add.addGroup($scope.query.groupname, function (data) {
                $scope.groupdata = data;
                console.info($scope.groupdata);
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            })
        };


    })
    .controller("productDetailController", function ($scope, $location, $routeParams, productService, bizModuleConfig) {
        $scope.productid = $routeParams.id;

        $scope.query = productService.query;

        $scope.closeModal = function (id,id2) {
            $(id).modal('hide');
        };

        var productPhasesConfig = bizModuleConfig.getModuleConfig("productPhases");
        $scope.productPhasesHeader = productPhasesConfig.header;
        $scope.productPhasesAction = productPhasesConfig.action;

        $scope.doProductPhases = function (type, item, index) {
            if (item && type === "edit") {
                $scope.phases=item;
                console.info($scope.phases)
                $('#productPhasesModal').modal('show');
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
                $scope.profiles=item;
                console.info($scope.profiles)
                $('#productProfilesModal').modal('show');
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
                $scope.group=item;
                console.info($scope.group)
                $('#productGroupsModal').modal('show');
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
                $scope.classifie=item;
                console.info($scope.classifie)
                $('#productClassifiesModal').modal('show');
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
                $scope.descr=item;
                console.info($scope.descr)
                $('#productDescrsModal').modal('show');
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
            //console.info($scope.data)
        }, function (data) {
            //TODO 提示信息
        });
    });