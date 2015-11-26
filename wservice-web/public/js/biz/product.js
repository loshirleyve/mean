/**
 * Created by rxy on 15/11/3.
 */
angular.module("productApp", ["wservice.dt.store.product","wservice.form.store.product", "wservice.common","ngRoute"])
    .config(function ($routeProvider) {
        //注册产品路由
        $routeProvider
            .when("/list", {
                controller: "productListController",
                templateUrl: "list.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/product/:id", {
                controller: "editProductInfoController",
                templateUrl: "product.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/product", {
                controller: "editProductInfoController",
                templateUrl: "product.html"
            })
            .when("/group/:province/:city/:district", {
                controller: "editGroupController",
                templateUrl: "editGroup.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/detail/:id", {
                controller: "productDetailController",
                templateUrl: "detail.html",
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
    .service("productService", function ($http, $location, nptResource,QueryProductsNoGroup,QueryProductsByGroupId,QueryProductInfoById,QueryCtrlCode,QueryProductPhases,queryCities) {
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
               // params.instid= "10000001468002";
                //params["userid"] = "10000001498059";

                if (groupid == "weifenlei") {
                    QueryProductsNoGroup.post(params).then( function (response) {
                        self.query.data = response.data;
                        self.query.loading('reset');
                        success(response.data);
                    }, function (error) {
                        self.query.loading('reset');
                        error(error);
                    });
                }

                if (groupid != "weifenlei") {
                    if (groupid != "all") {
                        params.groupid = groupid;
                    }
                    QueryProductsByGroupId.post(params).then( function (response) {
                        self.query.data = response.data;
                        self.query.loading('reset');
                        success(response.data);
                    }, function (error) {
                        self.query.loading('reset');
                        error(error);
                    });
                }
            },
            queryGroup: function (province, city, district, success, error) {
                var params = {};
                params.province = "陕西省";
                params.city = "西安市";
                params.district = "全城";
                nptResource.post("QueryMdProductGroupBylocation", params, function (data) {
                    self.query.groupdata = data;
                    self.query.loading('reset');
                    success(data);
                }, function (data) {
                    self.query.loading('reset');
                    //TODO 弹出提示检索错误通知窗口
                    error(data);
                });
            },
            queryMdCities: function (success, error) {
                var params = {};
                queryCities.post(params).then(function(response){
                    self.query.cities = response.data;
                    self.query.loading('reset');
                    success(response.data);
                },function(error) {
                    self.query.loading('reset');
                    //TODO 弹出提示检索错误通知窗口
                    error(error);
                });
            },
            queryMdCtrlCode: function (defno, success, error) {
                var params = {};
                params.defno = defno;
                QueryCtrlCode.post(params).then(function(response){
                    self.query.ctrlCode = response.data;
                    self.query.loading('reset');
                    success(response.data);
                },function(error) {
                    self.query.loading('reset');
                    //TODO 弹出提示检索错误通知窗口
                    error(error);
                });
            },
            queryProductPhase: function (productid, success, error) {
                var params = {};
                params.productid = productid;
                QueryProductPhases.post(params).then(function(response){
                    self.query.proPhase = response.data;
                    self.query.loading('reset');
                    success(response.data);
                },function(error) {
                    self.query.loading('reset');
                    //TODO 弹出提示检索错误通知窗口
                    error(error);
                });
            },
            editProduct: function (pro, success, error) {
                var params = {};
                params.id = pro.id;
                params.sn = pro.sn;
                params.state = pro.state;
                params.name = pro.name;
                params.type = "service";
                params.saleprice= pro.saleprice;
                params.imgid= "42500000000010019";
                params.introduce = pro.introduce;
                params.introduceurl= pro.introduceurl;
                params.instid= "10000001468002";
                params.createby = "10000001498059";
                params.createdate = pro.createdate;
                params.updatedate = pro.updatedate;
                params.createtimestamp = pro.createtimestamp;
                params.updatetimestamp = pro.updatetimestamp;
                nptResource.post("AddOrUpdateProduct", params, function (data) {
                    success(data);
                }, function (data) {
                    //TODO 弹出提示检索错误通知窗口
                    error(data);
                });
            },
            editGroup: function (group, success, error) {
                var params = {};
                params.id = group.id;
                params.name = group.name;
                params.state = group.state;
                params.global = group.global;
                params.cityid = group.cityid;
                params.sort= group.sort;
                params.province= "陕西省";
                params.city= "西安市";
                params.district= "全城";
                params.createby = "10000001498059";
                params.createdate= group.createdate;
                params.createtimestamp = group.createtimestamp;
                params.updatetimestamp = group.updatetimestamp;
                nptResource.post("AddOrUpdateMdProductGroup", params, function (data) {
                    success(data);
                }, function (data) {
                    //TODO 弹出提示检索错误通知窗口
                    error(data);
                });
            },

            id: function (id, success, error) {
                QueryProductInfoById.post("", {"productid": id}).then(success, error);
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
    .controller("productListController", function ($scope,$location,sessionData, productService) {
        $scope.data = [];
        $scope.groupdata = [];
        var self = this;

        //设置自定义查询以及检查新订单
        $scope.query = productService.query;
        $scope.checkNew = productService.checkNew;


        $scope.productAction = function (action, item, index) {
            console.info(action);
            if (item && action.type === "view") {
                $location.path("/detail/" + item.id);
            }
        };

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

        $scope.queryCities = function () {
            productService.query.queryMdCities(function (data) {
                $scope.cities = data;
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            });
        };

        //首先查询全部城市
        if (productService.query.cities.length <= 0) {
            $scope.queryCities();
        } else {
            $scope.cities = productService.query.cities;
        }

        /**
         * 根据状态查询当前地区的产品分类列表
         */
        $scope.queryGroup = function () {
            productService.query.queryGroup($scope.query.province, $scope.query.city, $scope.query.district, function (data) {
                $scope.groupdata = data;
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            });
        };

        //首先查询全部分组信息
        if (productService.query.groupdata.length <= 0) {
            $scope.queryGroup();
        } else {
            $scope.groupdata = productService.query.groupdata;
        }

        /**
         * 添加分组
         */
        $scope.addGroup = function () {
            productService.query.editGroup($scope.addgroup, function (data) {
                $scope.queryGroup();
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            });
        };

    })
    .controller("editProductInfoController", function ($scope, $http, $location, $routeParams, productService) {
        $scope.productid = $routeParams.id;
        var self = this;
        $scope.editProduct = function () {
            console.info($scope.pro);
            productService.query.editProduct($scope.pro, function (data) {
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            });
        };
        //查询产品信息
        productService.query.id($scope.productid, function (data) {
            $scope.pro = data.product;
        }, function (data) {
            //TODO 提示信息
        });

        productService.query.queryMdCtrlCode('producttype', function (data) {
                $scope.producttypecode = data || {producttypecode: {}};
                $scope.producttypecode.unshift({name: "------请选择------"});
            },
            function (data) {
                //TODO 提示信息
            });


    }).controller("editGroupController", function ($scope, $http, $location, $routeParams, productService) {
        $scope.province = $routeParams.province;
        $scope.city = $routeParams.city;
        $scope.district = $routeParams.district;

        var self = this;

        $scope.deleteGroup = function (params, $q, nptResource) {
            var deferd = $q.defer();
            nptResource
                .post("RemoveProductMdGroup", {groupid:params.item.id}, function (data) {
                    console.info("后台调用更成功.controller");
                    deferd.resolve("删除成功");
                }, function (data) {
                    deferd.reject("删除.");
                });
            return deferd.promise;
        };

        /**
         * 根据状态查询当前地区的产品分类列表
         */
        $scope.queryGroup = function () {
            productService.query.queryGroup($scope.province, $scope.city, $scope.district, function (data) {
                $scope.groupdata = data;
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            });
        };

        //首先查询全部产品
        if (productService.query.groupdata.length <= 0) {
            $scope.queryGroup();
        } else {
            $scope.groupdata = productService.query.groupdata;
        }

    })
    .controller("productDetailController", function ($scope, $location, $routeParams, productService) {
        $scope.productid = $routeParams.id;

        $scope.query = productService.query;

        //查询产品信息
        productService.query.id($scope.productid, function (data) {
            $scope.data = data || {product: {}};
        }, function (data) {
            //TODO 提示信息
        });

        productService.query.queryMdCtrlCode('cycle', function (data) {
                $scope.cyclecode = data || {cyclecode: {}};
                $scope.cyclecode.unshift({name: "------请选择------"});
            },
            function (data) {
                //TODO 提示信息
            });

        productService.query.queryMdCtrlCode('productdescrtype', function (data) {
                $scope.productdescrtypecode = data || {productdescrtypecode: {}};
                $scope.productdescrtypecode.unshift({name: "------请选择------"});
            },
            function (data) {
                //TODO 提示信息
            });

        productService.query.queryProductPhase($scope.productid, function (data) {
                $scope.prophase = data || {prophase: {}};
                $scope.prophase.unshift({name: "------请选择------"});
            },
            function (data) {
                //TODO 提示信息
            });

        /**
         * 编辑产品阶段
         */
        $scope.editProductPhase = function (params, $q, nptResource) {
            params.data.createby = "10000001498059";
            params.data.productid =  $scope.productid;
            delete params.data.phasedescr;
            var deferd = $q.defer();
            nptResource
                .post("AddOrUpdateProductPhase", params.data, function (data) {
                    console.info("后台调用更成功.controller");
                    deferd.resolve("添加成功");
                }, function (data) {
                    deferd.reject("不能在第一行上添加.");
                });
            return deferd.promise;
        };

        /**
         * 编辑产品说明
         */
        $scope.editProductProfile = function (params, $q, nptResource) {
            params.data.createby = "10000001498059";
            params.data.productid =  $scope.productid;
            var deferd = $q.defer();
            nptResource
                .post("AddOrUpdateProductProfile", params.data, function (data) {
                    console.info("后台调用更成功.controller");
                    deferd.resolve("添加成功");
                }, function (data) {
                    deferd.reject("不能在第一行上添加.");
                });
            return deferd.promise;
        };

        /**
         * 编辑产品分组
         */
        $scope.editProductGroup = function (params, $q, nptResource) {
            params.data.createby = "10000001498059";
            params.data.productid =  $scope.productid;
            params.data.instid= "10000001468002";
            var deferd = $q.defer();
            nptResource
                .post("AddOrUpdateProductGroup", params.data, function (data) {
                    console.info("后台调用更成功.controller");
                    deferd.resolve("添加成功");
                }, function (data) {
                    deferd.reject("不能在第一行上添加.");
                });
            return deferd.promise;
        };


        /**
         * 编辑产品内容
         */
        $scope.editProductClassify = function (params, $q, nptResource) {
            params.data.createby = "10000001498059";
            params.data.productid =  $scope.productid;
            var deferd = $q.defer();
            nptResource
                .post("AddOrUpdateProductclassify", params.data, function (data) {
                    console.info("后台调用更成功.controller");
                    deferd.resolve("添加成功");
                }, function (data) {
                    deferd.reject("不能在第一行上添加.");
                });
            return deferd.promise;
        };

        /**
         * 编辑产品说明
         */
        $scope.editProductDescr = function (params, $q, nptResource) {
            params.data.createby = "10000001498059";
            params.data.productid =  $scope.productid;
            var deferd = $q.defer();
            nptResource
                .post("AddOrUpdateProductDescr", params.data, function (data) {
                    console.info("后台调用更成功.controller");
                    deferd.resolve("添加成功");
                }, function (data) {
                    deferd.reject("不能在第一行上添加.");
                });
            return deferd.promise;
        };

        /**
         * 删除产品阶段的绑定
         */
        $scope.deleteProductPhase = function (params, $q, nptResource) {
            var deferd = $q.defer();
            nptResource
                .post("RemoveProductPhase", {phaseid:params.item.id}, function (data) {
                    console.info("后台调用更成功.controller");
                    deferd.resolve("删除成功");
                }, function (data) {
                    deferd.reject("不能在第一行上添加.");
                });
            return deferd.promise;
        };

        /**
         * 删除产品资料的绑定
         */
        $scope.deleteProductRequirement = function (params, $q, nptResource) {
            var deferd = $q.defer();
            nptResource
                .post("RemoveProductRequirement", {requirementid:params.item.id}, function (data) {
                    console.info("后台调用更成功.controller");
                    deferd.resolve("删除成功");
                }, function (data) {
                    deferd.reject("删除.");
                });
            return deferd.promise;
        };
        /**
         * 删除产品内容
         */
        $scope.deleteProductProfile = function (params, $q, nptResource) {
            var deferd = $q.defer();
            nptResource
                .post("RemoveProductProfile", {profileid:params.item.id}, function (data) {
                    console.info("后台调用更成功.controller");
                    deferd.resolve("删除成功");
                }, function (data) {
                    deferd.reject("删除.");
                });
            return deferd.promise;
        };
        /**
         * 删除产品分组的绑定
         */
        $scope.deleteProductGroup = function (params, $q, nptResource) {
            var deferd = $q.defer();
            nptResource
                .post("RemoveProductGroup", {groupid:params.item.id}, function (data) {
                    console.info("后台调用更成功.controller");
                    deferd.resolve("删除成功");
                }, function (data) {
                    deferd.reject("删除.");
                });
            return deferd.promise;
        };
        /**
         * 删除产品分类的绑定
         */
        $scope.deleteProductClassify = function (params, $q, nptResource) {
            var deferd = $q.defer();
            nptResource
                .post("RemoveProductClassify", {classifyid:params.item.id}, function (data) {
                    console.info("后台调用更成功.controller");
                    deferd.resolve("删除成功");
                }, function (data) {
                    deferd.reject("删除.");
                });
            return deferd.promise;
        };
        /**
         * 删除产品说明的绑定
         */
        $scope.deleteProductDescr = function (params, $q, nptResource) {
            var deferd = $q.defer();
            nptResource
                .post("RemoveProductDescr", {productDescrid:params.item.id}, function (data) {
                    console.info("后台调用更成功.controller");
                    deferd.resolve("删除成功");
                }, function (data) {
                    deferd.reject("删除");
                });
            return deferd.promise;
        };

    }).factory("QueryProductInfoById",function(nptRepository) {
        return nptRepository("QueryProductInfoById");
    }).factory("QueryProductPhases",function(nptRepository) {
        return nptRepository("QueryProductPhaseByProductid");
    }).factory("queryCities",function(nptRepository) {
        return nptRepository("queryCities");
    }).factory("QueryProductsByGroupId",function(nptRepository) {
        return nptRepository("QueryProductsByGroupId");
    }).factory("QueryProductsNoGroup",function(nptRepository) {
        return nptRepository("QueryProductsNoGroup");
    });