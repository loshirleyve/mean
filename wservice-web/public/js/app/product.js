/**
 * Created by rxy on 15/11/3.
 */
angular.module("productApp", ["wservice.dt.store.product","wservice.form.store.product", "app.config", "ngRoute"])
    .config(function ($routeProvider) {
        //注册产品路由
        $routeProvider
            .when("/list", {
                controller: "productListController",
                templateUrl: "list.html"
            })
            .when("/product/:id", {
                controller: "editProductInfoController",
                templateUrl: "product.html"
            })
            .when("/product", {
                controller: "editProductInfoController",
                templateUrl: "product.html"
            })
            .when("/group/:province/:city/:district", {
                controller: "editGroupController",
                templateUrl: "editGroup.html"
            })
            .when("/detail/:id", {
                controller: "productDetailController",
                templateUrl: "detail.html"
            })
            .otherwise({
                redirectTo: "/list"
            });
//        DatatableStoreProvider.store("product", {
//            "header": [
//                {
//                    "name": "instid",
//                    "label": "服务商名称"
//                },
//                {
//                    "name": "sn",
//                    "label": "产品编号"
//                },
//                {
//                    "name": "name",
//                    "label": "产品名称"
//                },
//                {
//                    "name": "pricedescr",
//                    "label": "售价"
//                },
//                {
//                    "name": "state",
//                    "label": "产品状态"
//                },
//                {
//                    "name": "type",
//                    "label": "产品类型"
//                },
//                {
//                    "name": "createdate",
//                    "label": "创建日期"
//                }
//            ],
//            "action": [
//                {
//                    "name": "view",
//                    "label": "查看"
//                }
//            ]
//        }).store("productPhases", {
//            header: [
//                {
//                    name: "name",
//                    label: "阶段名称"
//                },
//                {
//                    name: "cyclevalue",
//                    label: "阶段周期"
//                },
//                {
//                    name: "duty",
//                    label: "阶段职责"
//                },
//                {
//                    name: "times",
//                    label: "办理天数"
//                },
//                {
//                    name: "processdays",
//                    label: "服务次数"
//                }
//            ],
//            "action": [
//                {
//                    "name": "edit",
//                    "label": "编辑"
//                },
//                {
//                    "name": "delete",
//                    "label": "删除"
//                }
//            ]
//        }).store("productRequirements", {
//            header: [
//                {
//                    name: "name",
//                    label: "资料名称"
//                },
//                {
//                    name: "cyclevalue",
//                    label: "交接类型"
//                },
//                {
//                    name: "duty",
//                    label: "资料类型"
//                },
//                {
//                    name: "times",
//                    label: "要求描述"
//                }
//            ],
//            "action": [
//                {
//                    "name": "edit",
//                    "label": "编辑"
//                },
//                {
//                    "name": "delete",
//                    "label": "删除"
//                }
//            ]
//        }).store("productProfiles", {
//            header: [
//                {
//                    name: "synopsis",
//                    label: "内容描述"
//                },
//                {
//                    name: "sort",
//                    label: "排序"
//                }
//            ],
//            "action": [
//                {
//                    "name": "edit",
//                    "label": "编辑"
//                },
//                {
//                    "name": "delete",
//                    "label": "删除"
//                }
//            ]
//        }).store("productGroups", {
//            header: [
//                {
//                    name: "backgorundimgid",
//                    label: "分组图标"
//                },
//                {
//                    name: "groupname",
//                    label: "分组名称"
//                },
//                {
//                    name: "province",
//                    label: "省"
//                },
//                {
//                    name: "city",
//                    label: "市"
//                },
//                {
//                    name: "district",
//                    label: "区"
//                },
//                {
//                    name: "top",
//                    label: "是否置顶"
//                },
//                {
//                    name: "sort",
//                    label: "排序"
//                }
//            ],
//            "action": [
//                {
//                    "name": "edit",
//                    "label": "编辑"
//                },
//                {
//                    "name": "delete",
//                    "label": "删除"
//                }
//            ]
//        }).store("productClassifies", {
//            header: [
//                {
//                    name: "classifyname",
//                    label: "分类名称"
//                },
//                {
//                    name: "classifyno",
//                    label: "分类编号"
//                },
//                {
//                    name: "price",
//                    label: "价格"
//                },
//                {
//                    name: "phasename",
//                    label: "所属服务阶段"
//                },
//                {
//                    name: "sort",
//                    label: "排序"
//                }
//            ],
//            "action": [
//                {
//                    "name": "edit",
//                    "label": "编辑"
//                },
//                {
//                    "name": "delete",
//                    "label": "删除"
//                }
//            ]
//        }).store("productDescrs", {
//            header: [
//                {
//                    name: "descr",
//                    label: "标题"
//                },
//                {
//                    name: "descrvalue",
//                    label: "内容"
//                },
//                {
//                    name: "type",
//                    label: "类型"
//                }
//            ],
//            "action": [
//                {
//                    "name": "edit",
//                    "label": "编辑"
//                },
//                {
//                    "name": "delete",
//                    "label": "删除"
//                }
//            ]
//        }).store("allProductGroup", {
//            header: [
//                {
//                    name: "name",
//                    label: "分类名称"
//                },
//                {
//                    name: "sort",
//                    label: "排序"
//                }
//            ],
//            "action": [
//                {
//                    "name": "edit",
//                    "label": "编辑"
//                },
//                {
//                    "name": "delete",
//                    "label": "删除"
//                }
//            ]
//        });
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
                params["instid"] = "10000001468002";
                //params["userid"] = "10000001498059";

                if (groupid == "weifenlei") {
                    nptResource
                        .post("QueryProductsNoGroup", params, function (data) {
                            self.query.data = data;
                            self.query.loading('reset')
                            success(data);
                        }, function (data) {
                            self.query.loading('reset')
                            //TODO 弹出提示检索错误通知窗口
                            error(data);
                        });
                }
                if (groupid != "weifenlei") {
                    if (groupid != "all") {
                        params["groupid"] = groupid;
                    }
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
                }
            },
            queryGroup: function (province, city, district, success, error) {
                var params = {};
                params["province"] = "陕西省";
                params["city"] = "西安市";
                params["district"] = "全城";
                nptResource.post("QueryMdProductGroupBylocation", params, function (data) {
                    self.query.groupdata = data;
                    console.info(self.query.groupdata);
                    self.query.loading('reset')
                    success(data);
                }, function (data) {
                    self.query.loading('reset')
                    //TODO 弹出提示检索错误通知窗口
                    error(data);
                });
            },
            queryCities: function (success, error) {
                var params = {};
                nptResource.post("queryCities", params, function (data) {
                    self.query.cities = data;
                    self.query.loading('reset')
                    success(data);
                }, function (data) {
                    self.query.loading('reset')
                    //TODO 弹出提示检索错误通知窗口
                    error(data);
                });
            },
            queryMdCtrlcode: function (defno, success, error) {
                var params = {};
                params["defno"] = defno;
                nptResource.post("queryMdCtrlcode", params, function (data) {
                    self.query.ctrlCode = data;
                    self.query.loading('reset')
                    success(data);
                }, function (data) {
                    self.query.loading('reset')
                    //TODO 弹出提示检索错误通知窗口
                    error(data);
                });
            },
            queryProductPhase: function (productid, success, error) {
                var params = {};
                params["productid"] = productid;
                nptResource.post("QueryProductPhaseByProductid", params, function (data) {
                    self.query.proPhase = data;
                    self.query.loading('reset')
                    success(data);
                }, function (data) {
                    self.query.loading('reset')
                    //TODO 弹出提示检索错误通知窗口
                    error(data);
                });
            },
            editProduct: function (pro, success, error) {
                var params = {};
                params["id"] = pro.id;
                params["sn"] = pro.sn;
                params["state"] = pro.state;
                params["name"] = pro.name;
                params["type"] = "service";
                params["saleprice"] = pro.saleprice;
                params["imgid"] = "42500000000010019";
                params["introduce"] = pro.introduce;
                params["introduceurl"] = pro.introduceurl;
                params["instid"] = "10000001468002";
                params["createby"] = "10000001498059";
                params["createdate"] = pro.createdate;
                params["updatedate"] = pro.updatedate;
                params["createtimestamp"] = pro.createtimestamp;
                params["updatetimestamp"] = pro.updatetimestamp;
                nptResource.post("AddOrUpdateProduct", params, function (data) {
                    success(data);
                }, function (data) {
                    //TODO 弹出提示检索错误通知窗口
                    error(data);
                });
            },
            editGroup: function (group, success, error) {
                var params = {};
                params["id"] = group.id;
                params["name"] = group.name;
                params["state"] = group.state;
                params["global"] = group.global;
                params["cityid"] = group.cityid;
                params["sort"] = group.sort;
                params["province"] = "陕西省";
                params["city"] = "西安市";
                params["district"] = "全城";
                params["createby"] = "10000001498059";
                params["createdate"] = group.createdate;
                params["createtimestamp"] = group.createtimestamp;
                params["updatetimestamp"] = group.updatetimestamp;
                nptResource.post("AddOrUpdateMdProductGroup", params, function (data) {
                    success(data);
                }, function (data) {
                    //TODO 弹出提示检索错误通知窗口
                    error(data);
                });
            },
            editProductPhase: function (phase, productid, success, error) {
                var params = {};
                params["id"] = phase.id;
                params["no"] = phase.no;
                params["sn"] = phase.sn;
                params["times"] = phase.times;
                params["name"] = phase.name;
                params["cycle"] = phase.cycle;
                params["cyclevalue"] = phase.cyclevalue;
                params["processdays"] = phase.processdays;
                params["productid"] = productid;
                params["sortno"] = phase.sortno;
                params["duty"] = phase.duty;
                params["createby"] = "10000001498059";
                params["createdate"] = phase.createdate;
                params["updatedate"] = phase.updatedate;
                nptResource.post("AddOrUpdateProductPhase", params, function (data) {
                    success(data);
                }, function (data) {
                    //TODO 弹出提示检索错误通知窗口
                    error(data);
                });
            },
            editProductProfile: function (profile, productid, success, error) {
                var params = {};
                params["id"] = profile.id;
                params["productid"] = productid;
                params["synopsis"] = profile.synopsis;
                params["sort"] = profile.sort;
                params["createby"] = "10000001498059";
                params["createdate"] = profile.createdate;
                params["createtimestamp"] = profile.createtimestamp;
                params["updatetimestamp"] = profile.updatetimestamp;
                nptResource.post("AddOrUpdateProductProfile", params, function (data) {
                    success(data);
                }, function (data) {
                    //TODO 弹出提示检索错误通知窗口
                    error(data);
                });
            },
            editProductGroup: function (group, productid, success, error) {
                var params = {};
                params["id"] = group.id;
                params["instid"] = group.instid;
                params["productid"] = productid;
                params["sort"] = group.sort;
                params["top"] = group.top;
                params["backgorundimgid"] = "4";
                params["groupid"] = "1";
                params["createby"] = "10000001498059";
                params["createdate"] = group.createdate;
                params["createtimestamp"] = group.createtimestamp;
                params["updatetimestamp"] = group.updatetimestamp;
                nptResource.post("AddOrUpdateMdProductGroup", params, function (data) {
                    success(data);
                }, function (data) {
                    //TODO 弹出提示检索错误通知窗口
                    error(data);
                });
            },
            editProductClassify: function (classify, productid, success, error) {
                var params = {};
                params["id"] = classify.id;
                params["productid"] = productid;
                params["sort"] = classify.sort;
                params["cityid"] = "1";
                params["price"] = classify.price;
                params["phaseid"] = classify.phaseid;
                params["classifyno"] = classify.classifyno;
                params["classifyname"] = classify.classifyname;
                params["phasename"] = classify.phasename;
                params["createby"] = "10000001498059";
                params["createdate"] = classify.createdate;
                params["createtimestamp"] = classify.createtimestamp;
                params["updatetimestamp"] = classify.updatetimestamp;
                nptResource.post("AddOrUpdateProductclassify", params, function (data) {
                    success(data);
                }, function (data) {
                    //TODO 弹出提示检索错误通知窗口
                    error(data);
                });
            },
            editProductDescr: function (descr, productid, success, error) {
                var params = {};
                params["id"] = descr.id;
                params["productid"] = productid;
                params["type"] = descr.type;
                params["descr"] = descr.descr;
                params["descrvalue"] = descr.descrvalue;
                params["sort"] = descr.sort;
                params["createby"] = "10000001498059";
                params["createdate"] = descr.createdate;
                params["createtimestamp"] = descr.createtimestamp;
                params["updatetimestamp"] = descr.updatetimestamp;
                nptResource.post("AddOrUpdateProductDescr", params, function (data) {
                    success(data);
                }, function (data) {
                    //TODO 弹出提示检索错误通知窗口
                    error(data);
                });
            },
            deleteGroup: function (id, success, error) {
                var params = {};
                params["groupid"] = id;
                nptResource.post("RemoveProductMdGroup", params, function (data) {
                    success(data);
                }, function (data) {
                    //TODO 弹出提示检索错误通知窗口
                    error(data);
                });
            },
            deleteProductPhase: function (phaseid, success, error) {
                var params = {};
                params["phaseid"] = phaseid;
                nptResource.post("RemoveProductPhase", params, function (data) {
                    success(data);
                }, function (data) {
                    //TODO 弹出提示检索错误通知窗口
                    error(data);
                });
            },
            deleteProductRequirement: function (requirementid, success, error) {
                var params = {};
                params["requirementid"] = requirementid;
                nptResource.post("RemoveProductRequirement", params, function (data) {
                    success(data);
                }, function (data) {
                    //TODO 弹出提示检索错误通知窗口
                    error(data);
                });
            },
            deleteProductProfile: function (profileid, success, error) {
                var params = {};
                params["profileid"] = profileid;
                nptResource.post("RemoveProductProfile", params, function (data) {
                    success(data);
                }, function (data) {
                    //TODO 弹出提示检索错误通知窗口
                    error(data);
                });
            },
            deleteProductGroup: function (groupid, success, error) {
                var params = {};
                params["groupid"] = groupid;
                nptResource.post("RemoveProductGroup", params, function (data) {
                    success(data);
                }, function (data) {
                    //TODO 弹出提示检索错误通知窗口
                    error(data);
                });
            },
            deleteProductClassify: function (classifyid, success, error) {
                var params = {};
                params["classifyid"] = classifyid;
                nptResource.post("RemoveProductClassify", params, function (data) {
                    success(data);
                }, function (data) {
                    //TODO 弹出提示检索错误通知窗口
                    error(data);
                });
            },
            deleteProductDescr: function (productDescrid, success, error) {
                var params = {};
                params["productDescrid"] = productDescrid;
                nptResource.post("RemoveProductDescr", params, function (data) {
                    success(data);
                }, function (data) {
                    //TODO 弹出提示检索错误通知窗口
                    error(data);
                });
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
    .controller("productListController", function ($scope, $http, $location, productService) {
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
            })
        };

        //首先查询全部产品
        if (productService.query.data.length <= 0) {
            $scope.queryByGroupId();
        } else {
            $scope.data = productService.query.data;
        }

        $scope.queryCities = function () {
            productService.query.queryCities(function (data) {
                $scope.cities = data;
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            })
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
            })
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
            })
        };

    })
    .controller("editProductInfoController", function ($scope, $http, $location, $routeParams, productService) {
        $scope.productid = $routeParams.id;
        var self = this;
        $scope.editProduct = function () {
            console.info($scope.pro)
            productService.query.editProduct($scope.pro, function (data) {
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            })
        }
        //查询产品信息
        productService.query.id($scope.productid, function (data) {
            $scope.pro = data.product;
        }, function (data) {
            //TODO 提示信息
        });

        productService.query.queryMdCtrlcode('producttype', function (data) {
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


        $scope.dollproductGroup = function (type, item, index) {
//            if (item && type === "edit") {
//                $scope.editgroup = item;
//                $('#editGroup').modal('show');
//            }
//            if (item && type === "delete") {
//                $scope.deleteGroup(item.id);
//            }
        };

        /**
         * 根据状态查询当前地区的产品分类列表
         */
        $scope.queryGroup = function () {
            productService.query.queryGroup($scope.province, $scope.city, $scope.district, function (data) {
                $scope.groupdata = data;
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            })
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

        productService.query.queryMdCtrlcode('cycle', function (data) {
                $scope.cyclecode = data || {cyclecode: {}};
                $scope.cyclecode.unshift({name: "------请选择------"});
            },
            function (data) {
                //TODO 提示信息
            });

        productService.query.queryMdCtrlcode('productdescrtype', function (data) {
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


        $scope.openModal = function (id) {
            $scope.phases = {};
            $scope.profiles = {};
            $scope.group = {};
            $scope.classify = {};
            $scope.descr = {};
            $(id).modal('show');
        };

        $scope.doProductPhases = function (type, item, index) {
            if (item && type === "edit") {
                $scope.phases = item;
                console.info($scope.phases)
                $('#productPhasesModal').modal('show');
            }
            if (item && type === "delete") {
                $scope.deleteProductPhase(item.id);
            }
        };

        $scope.doProductRequirement = function (type, item, index) {
            if (item && type === "edit") {
                // $scope.phases = item;
                //console.info($scope.phases)
                $('#productRequirementModal').modal('show');
            }
            if (item && type === "delete") {
                $scope.deleteProductRequirement(item.id);
            }
        };


        $scope.doProductProfiles = function (type, item, index) {
            if (item && type === "edit") {
                $scope.profiles = item;
                console.info($scope.profiles)
                $('#productProfilesModal').modal('show');
            }
            if (item && type === "delete") {
                $scope.deleteProductProfile(item.id);
            }
        };

        $scope.doProductGroups = function (type, item, index) {
            if (item && type === "edit") {
                $scope.group = item;
                console.info($scope.group)
                $('#productGroupsModal').modal('show');
            }
            if (item && type === "delete") {
                $scope.deleteProductGroup(item.id);
            }
        };

        $scope.doProductClassifies = function (type, item, index) {
            if (item && type === "edit") {
                $scope.classify = item;
                console.info($scope.classify)
                $('#productClassifiesModal').modal('show');
            }
            if (item && type === "delete") {
                $scope.deleteProductClassify(item.id);
            }
        };

        $scope.doProductDescrs = function (type, item, index) {
            if (item && type === "edit") {
                $scope.descr = item;
                console.info($scope.descr)
                $('#productDescrsModal').modal('show');
            }
            if (item && type === "delete") {
                $scope.deleteProductDescr(item.id);
            }
        };

        /**
         * 编辑产品阶段
         */
        $scope.editProductPhase = function () {
            console.info($scope.phases);
            productService.query.editProductPhase($scope.phases, $scope.productid, function (data) {
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            })
        };

        /**
         * 编辑产品说明
         */
        $scope.editProductProfile = function () {
            console.info($scope.profiles);
            productService.query.editProductProfile($scope.profiles, $scope.productid, function (data) {
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            })
        };

        /**
         * 编辑产品分组
         */
        $scope.editProductGroup = function () {
            console.info($scope.group);
            productService.query.editProductGroup($scope.group, $scope.productid, function (data) {
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            })
        };

        /**
         * 编辑产品内容
         */
        $scope.editProductClassify = function () {
            console.info($scope.classify);
            productService.query.editProductClassify($scope.classify, $scope.productid, function (data) {
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            })
        };

        /**
         * 编辑产品说明
         */
        $scope.editProductDescr = function () {
            console.info($scope.descr);
            productService.query.editProductDescr($scope.descr, $scope.productid, function (data) {
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            })
        };

        /**
         * 删除产品阶段的绑定
         */
        $scope.deleteProductPhase = function (phaseid) {
            productService.query.deleteProductPhase(phaseid, function (data) {
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            })
        };

        /**
         * 删除产品资料的绑定
         */
        $scope.deleteProductRequirement = function (requirementid) {
            productService.query.deleteProductRequirement(requirementid, function (data) {
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            })
        };
        /**
         * 删除产品内容的绑定
         */
        $scope.deleteProductProfile = function (profileid) {
            productService.query.deleteProductProfile(profileid, function (data) {
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            })
        };
        /**
         * 删除产品分组的绑定
         */
        $scope.deleteProductGroup = function (groupid) {
            productService.query.deleteProductGroup(groupid, function (data) {
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            })
        };
        /**
         * 删除产品分类的绑定
         */
        $scope.deleteProductClassify = function (classifyid) {
            productService.query.deleteProductClassify(classifyid, function (data) {
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            })
        };
        /**
         * 删除产品说明的绑定
         */
        $scope.deleteProductDescr = function (productDescrid) {
            productService.query.deleteProductDescr(productDescrid, function (data) {
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            })
        };

    });