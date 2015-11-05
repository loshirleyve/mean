/**
 * Created by rxy on 15/11/3.
 */
angular.module("productApp", ["ui.neptune", "ngRoute", "ui.tree"])
    .config(function ($routeProvider,DatatableStoreProvider) {
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
        DatatableStoreProvider.store("order",{
            "header": [
                {
                    "name": "instid",
                    "label": "服务商名称"
                },
                {
                    "name": "sn",
                    "label": "产品编号"
                },
                {
                    "name": "name",
                    "label": "产品名称"
                },
                {
                    "name": "pricedescr",
                    "label": "售价"
                },
                {
                    "name": "state",
                    "label": "产品状态"
                },
                {
                    "name": "type",
                    "label": "产品类型"
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
        }).reg("productPhases", {
            header: [
                {
                    name: "name",
                    label: "阶段名称"
                },
                {
                    name: "cyclevalue",
                    label: "阶段周期"
                },
                {
                    name: "duty",
                    label: "阶段职责"
                },
                {
                    name: "times",
                    label: "办理天数"
                },
                {
                    name: "processdays",
                    label: "服务次数"
                }
            ],
            "action": [
                {
                    "name": "edit",
                    "label": "编辑"
                },
                {
                    "name": "delete",
                    "label": "删除"
                }
            ]
        }).reg("productRequirements", {
            header: [
                {
                    name: "name",
                    label: "资料名称"
                },
                {
                    name: "cyclevalue",
                    label: "交接类型"
                },
                {
                    name: "duty",
                    label: "资料类型"
                },
                {
                    name: "times",
                    label: "要求描述"
                }
            ],
            "action": [
                {
                    "name": "edit",
                    "label": "编辑"
                },
                {
                    "name": "delete",
                    "label": "删除"
                }
            ]
        }).reg("productProfiles", {
            header: [
                {
                    name: "synopsis",
                    label: "内容描述"
                },
                {
                    name: "sort",
                    label: "排序"
                }
            ],
            "action": [
                {
                    "name": "edit",
                    "label": "编辑"
                },
                {
                    "name": "delete",
                    "label": "删除"
                }
            ]
        }).reg("productGroups", {
            header: [
                {
                    name: "backgorundimgid",
                    label: "分组图标"
                },
                {
                    name: "groupname",
                    label: "分组名称"
                },
                {
                    name: "province",
                    label: "省"
                },
                {
                    name: "city",
                    label: "市"
                },
                {
                    name: "district",
                    label: "区"
                },
                {
                    name: "top",
                    label: "是否置顶"
                },
                {
                    name: "sort",
                    label: "排序"
                }
            ],
            "action": [
                {
                    "name": "edit",
                    "label": "编辑"
                },
                {
                    "name": "delete",
                    "label": "删除"
                }
            ]
        }).reg("productClassifies", {
            header: [
                {
                    name: "classifyname",
                    label: "分类名称"
                },
                {
                    name: "classifyno",
                    label: "分类编号"
                },
                {
                    name: "price",
                    label: "价格"
                },
                {
                    name: "phasename",
                    label: "所属服务阶段"
                },
                {
                    name: "sort",
                    label: "排序"
                }
            ],
            "action": [
                {
                    "name": "edit",
                    "label": "编辑"
                },
                {
                    "name": "delete",
                    "label": "删除"
                }
            ]
        }).reg("productDescrs", {
            header: [
                {
                    name: "descr",
                    label: "标题"
                },
                {
                    name: "descrvalue",
                    label: "内容"
                },
                {
                    name: "type",
                    label: "类型"
                }
            ],
            "action": [
                {
                    "name": "edit",
                    "label": "编辑"
                },
                {
                    "name": "delete",
                    "label": "删除"
                }
            ]
        }).reg("allProductGroup", {
            header: [
                {
                    name: "name",
                    label: "分类名称"
                },
                {
                    name: "sort",
                    label: "排序"
                }
            ],
            "action": [
                {
                    "name": "edit",
                    "label": "编辑"
                },
                {
                    "name": "delete",
                    "label": "删除"
                }
            ]
        });
    })
    .service("productService", function ($http, $location, nptResource) {
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

                nptResource
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
                nptResource.post("QueryMdProductGroupBylocation",params,function(data)
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
                nptResource.post("QueryProductInfoById", {"productid": id}, success, error);
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
                nptResource.post("AddOrUpdateMdProductGroup",params,function(data)
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


        //查询产品信息
        productService.query.id($scope.productid, function (data) {
            $scope.data = data || {product: {}};
        }, function (data) {
            //TODO 提示信息
        });
    });