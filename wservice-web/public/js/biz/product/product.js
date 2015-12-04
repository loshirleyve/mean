/**
 * Created by rxy on 15/11/3.
 */
angular.module("productApp", ["ui.neptune",
    "productApp.productListGrid",
    "productApp.productMdGroupListGrid",
    "productApp.productPhaseListGrid",
    "productApp.productRequirementListGrid",
    "productApp.productProfilesListGrid",
    "productApp.productGroupListGrid",
    "productApp.productClassifiesListGrid",
    "productApp.productDescrsListGrid",
    "productApp.productForm",
    "wservice.common",
    "ngRoute",
    "ui-notification"])
    .config(function ($routeProvider, formlyConfigProvider) {
        //注册产品路由
        $routeProvider
            .when("/list", {
                controller: "productListController as vm",
                templateUrl: "list.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/add", {
                controller: "addProductController as vm",
                templateUrl: "add.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/edit/:id", {
                controller: "editProductController as vm",
                templateUrl: "edit.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            }).when("/edit/profile/:productid", {
                controller: "editProductProfileController as vm",
                templateUrl: "editProductProfile.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            }).when("/edit/profile/:productid/:profileid", {
                controller: "editProductProfileController as vm",
                templateUrl: "editProductProfile.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/edit/descr/:productid", {
                controller: "editProductDescrController as vm",
                templateUrl: "editProductDescr.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/edit/descr/:productid/:descrid", {
                controller: "editProductDescrController as vm",
                templateUrl: "editProductDescr.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/edit/classifies/:productid", {
                controller: "editProductClassifiesController as vm",
                templateUrl: "editProductClassifies.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/edit/classifies/:productid/:classifiesid", {
                controller: "editProductClassifiesController as vm",
                templateUrl: "editProductClassifies.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/edit/group/:productid", {
                controller: "editProductGroupController as vm",
                templateUrl: "editProductGroup.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/edit/group/:productid/:groupid", {
                controller: "editProductGroupController as vm",
                templateUrl: "editProductGroup.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .otherwise({
                redirectTo: "/list"
            });

        //配置表单中用于选择所属产品所属分组的输入类型
        formlyConfigProvider.setType({
            name: "select-product-group",
            templateUrl: "selectProductGroup.html",
            extends: 'input',
            defaultOptions: {
                controller: function ($scope, $uibModal) {
                    $scope.open = function () {
                        $uibModal.open({
                            animation: true,
                            templateUrl: 'selectProductGroupModal.html',
                            controller: 'selectProductGroupModalController',
                            controllerAs: 'vm'
                        }).result.then(function (response) {
                                $scope.model.groupid = response.id;
                                $scope.model.groupname =response.name;
                            });
                    };
                },
                templateOptions: {
                    label: "请选择:",
                    placeholder: "请选择."
                }
            }
        });
    }).factory("QueryCities", function (nptRepository) {
        return nptRepository("queryCities").params({});
    }).factory("QueryMdProductGroup", function (nptRepository) {
        return nptRepository("QueryMdProductGroupBylocation").params({});
    }).factory("QueryProductsGroup", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryProductsGroup").params({
            instid: nptSessionManager.getSession().getInst().id
        });
    })
    .factory("QueryProductInfo", function (nptRepository) {
        return nptRepository("QueryProductInfoById").params({});
    })
    .factory("QueryProductPhases", function (nptRepository) {
        return nptRepository("QueryProductPhaseByProductid").params({});
    })
    .factory("QueryRequirementsByInstid", function (nptRepository) {
        return nptRepository("QueryRequirementsByInstid").params({});
    })

    .factory("AddOrUpdateProduct", function (nptRepository) {
        return nptRepository("AddOrUpdateProduct").params({});
    })
    .factory("AddOrUpdateMdProductGroup", function (nptRepository, nptSessionManager) {
        return nptRepository("AddOrUpdateMdProductGroup").params({
            createby: nptSessionManager.getSession().getUser().id
        });
    })
    .factory("AddOrUpdateProductPhase", function (nptRepository) {
        return nptRepository("AddOrUpdateProductPhase").params({});
    })
    .factory("AddProductRequirement", function (nptRepository) {
        return nptRepository("AddProductRequirement").params({});
    })
    .factory("AddOrUpdateProductProfile", function (nptRepository) {
        return nptRepository("AddOrUpdateProductProfile").params({});
    }).factory("AddOrUpdateProductGroup", function (nptRepository) {
        return nptRepository("AddOrUpdateProductGroup").params({});
    }).factory("AddOrUpdateProductclassify", function (nptRepository) {
        return nptRepository("AddOrUpdateProductclassify").params({});
    }).factory("AddOrUpdateProductDescr", function (nptRepository) {
        return nptRepository("AddOrUpdateProductDescr").params({});
    }).factory("RemoveProductPhase", function (nptRepository) {
        return nptRepository("RemoveProductPhase").params({});
    }).factory("RemoveProductRequirement", function (nptRepository) {
        return nptRepository("RemoveProductRequirement").params({});
    }).factory("RemoveProductGroup", function (nptRepository) {
        return nptRepository("RemoveProductGroup").params({});
    }).factory("RemoveProductClassify", function (nptRepository) {
        return nptRepository("RemoveProductClassify").params({});
    }).factory("RemoveProductDescr", function (nptRepository) {
        return nptRepository("RemoveProductDescr").params({});
    })
    .service("ProductQueryService", function (Notification, QueryMdProductGroup, QueryCities, QueryProductsGroup) {
        var self = this;
        self.reposCities = QueryCities;
        self.reposProductGroup = QueryMdProductGroup;
        self.reposProducts = QueryProductsGroup;

        //建立省份列表
        self.buildProvince = function () {
            if (self.reposCities.data) {
                self.provinces = {};
                angular.forEach(self.reposCities.data, function (value) {
                    if (!self.provinces[value.province]) {
                        self.buildCityByProvince(value);
                        self.provinces[value.province] = value;
                    }
                });
            }
        };

        //建立城市列表
        self.buildCityByProvince = function (province) {
            if (self.reposCities.data) {
                //初始化当前省份的城市列表
                province.citys = {};
                angular.forEach(self.reposCities.data, function (value) {
                    if (value.province === province.province && !province.citys[value.city]) {
                        self.buildDistrict(province, value);
                        province.citys[value.city] = value;
                    }
                });
            }
        };

        //建立区列表
        self.buildDistrict = function (province, city) {
            if (self.reposCities.data) {
                city.districts = {};
                angular.forEach(self.reposCities.data, function (value) {
                    if (value.province === province.province && value.city === city.city) {
                        city.districts[value.district] = value;
                    }
                });
            }
        };

        //建立查询分类
        self.buildQueryType = function (productGroups) {
            self.queryTypes = [
                {
                    label: "全部",
                    callBack: function () {
                        self.queryProducts();
                    }
                }, {
                    label: "未分类",
                    callBack: function () {
                        self.queryProducts({
                            groupType: "none"
                        });
                    }
                }
            ];

            function groupQueryCallback(queryType) {
                self.queryProducts({
                    groupid: queryType.target.id
                });
            }

            //根据产品分组建立查询
            angular.forEach(productGroups, function (value) {
                self.queryTypes.push({
                    label: value.name,
                    target: value,
                    callBack: groupQueryCallback
                });
            });

        };

        //选择查询type
        self.selectQueryType = function (queryType) {
            self.currQueryType = queryType;

            if (queryType.callBack) {
                queryType.callBack(queryType);
            }
        };

        //选择省
        self.selectProvince = function (province) {
            self.currProvince = province;
            self.selectCity(province);
        };

        //选择城市
        self.selectCity = function (city) {
            self.currCity = city;
            self.selectDistrict(city);
        };

        //选择区
        self.selectDistrict = function (district) {
            self.currDistrict = district;
            //查询对应的产品分组
            self.queryProductGroup(self.currProvince, self.currCity, self.currDistrict);
        };

        //从服务器检索产品分组
        self.queryProductGroup = function (province, city, district) {
            self.reposProductGroup.post({
                province: province.province,
                city: city.city,
                district: district.district
            }).then(function (response) {
                //查询出分组,根据分组建立查询类型
                self.buildQueryType(response.data);

                //选择一项
                self.selectQueryType(self.queryTypes[0]);

            }, function (error) {
                Notification.error({
                    message: "查询产品分组出现错误!",
                    delay: 2000
                });
            });
        };

        //从服务器检索省信息
        self.queryCities = function () {
            self.reposCities.post().then(function (response) {
                //初始化列表
                self.buildProvince();
                //默认选中结果集第一行
                self.selectProvince(response.data[0]);
            }, function () {
                Notification.error({
                    message: "查询城市信息出现错误!",
                    delay: 2000
                });
            });
        };

        //查询产品列表
        self.queryProducts = function (params) {
            params = params || {};
            self.reposProducts.post(params).then(function (response) {

            }, function () {
                Notification.error({
                    message: "查询产品信息出现错误,请稍后重新尝试!",
                    delay: 2000
                });
            });
        };

        //执行查询
        self.queryCities();

    })
    .controller("productListController", function (ProductQueryService, productListGrid) {
        var vm = this;
        //产品查询服务
        vm.queryService = ProductQueryService;

        vm.productListGridOptions = {
            store: productListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.nptGridApi = nptGridApi;
            }
        };
    })
    .controller("addProductController", function ($location, productForm, AddOrUpdateProduct, Notification, nptSessionManager) {
        var vm = this;
        vm.model = {
            type: "service", //设置产品默认值
            instid: nptSessionManager.getSession().getInst().id,
            createby: nptSessionManager.getSession().getUser().id
        };
        vm.originModel = angular.copy(vm.model);

        vm.addOrUpdateProduct = AddOrUpdateProduct;

        //表单配置
        vm.productFormOptions = {
            store: productForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
                //注册提交事件
                vm.nptFormApi.addOnSubmitListen(saveProduct);
                //设置重置事件
                vm.nptFormApi.setOnActionListen(resetProduct);
            }
        };

        //保存产品
        function saveProduct() {
            if (vm.nptFormApi.form.$invalid) {
                Notification.error({message: '请输入正确的产品信息.', delay: 2000});
            } else {
                vm.addOrUpdateProduct.post(vm.model).then(function (response) {
                    Notification.success({
                        message: "保存产品成功.",
                        delay: 2000
                    });
                    vm.toEdit(response.data.id);

                }, function (error) {
                    Notification.error({
                        title: "保存产出现错误.",
                        message: "错误内容:" + error.data.cause,
                        delay: 2000
                    });
                });
            }
        }

        //重置产品
        function resetProduct() {
            vm.model = angular.copy(vm.originModel);
        }

        //转到edit
        vm.toEdit = function (productId) {
            $location.path("/edit/" + productId);
        };
    })
    .controller("editProductController", function ($scope, $location, $routeParams, Notification, QueryProductInfo, AddOrUpdateProduct, ProductQueryService, productForm) {
        var vm = this;

        //记录当前编辑的产品id
        vm.productid = $routeParams.id;

        //产品信息资源库
        vm.productInfo = QueryProductInfo;

        vm.productQueryService = ProductQueryService;

        //产品更新资源库
        vm.addOrUpdateProduct = AddOrUpdateProduct;

        //保存产品
        function saveProduct() {
            vm.addOrUpdateProduct.post(vm.modelProduct).then(function (response) {
                Notification.success({
                    message: "保存成功!",
                    delay: 2000
                });
            }, function (error) {
                Notification.error({
                    title: "保存错误",
                    message: error.data.cause,
                    delay: 2000
                });
            });
        }

        //重置产品信息
        function resetProduct() {
            vm.modelProduct = angular.copy(vm.orginModelProduct);
        }

        //表单配置
        vm.productFormOptions = {
            store: productForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
                //注册提交事件
                vm.nptFormApi.addOnSubmitListen(saveProduct);
                //设置重置事件
                vm.nptFormApi.setOnActionListen(resetProduct);
            }
        };


        //查询
        vm.query = function () {
            if (vm.productid) {
                vm.productInfo.post({
                    productid: vm.productid
                }).then(function (response) {
                    vm.modelProduct = response.data.product;
                    //产品分类
                    vm.modelProductClassifies = response.data.bizProductClassifies;

                    //办理资料
                    vm.modelProductRequirements = response.data.productRequirements;

                    //所属分类
                    vm.modelProductGroups = response.data.productGroups;

                    //服务阶段
                    vm.modelProductPhases = response.data.productPhases;

                    //产品内容
                    vm.modelProductProfiles = response.data.bizProductProfiles;

                    //产品详情
                    vm.modelProductDescrs = response.data.bizProductDescrs;

                    //由于表单的数据是异步设置的,表单插件无法记录初始值.暂时外部手动记录
                    vm.orginModelProduct = angular.copy(vm.modelProduct);

                    vm.nptFormApi.fields[2].templateOptions.disabled = true;
                }, function () {
                    Notification.error({
                        message: "查找产品信息出错,请稍后尝试.",
                        delay: 2000
                    });
                });
            }
        };

        //转到下一单
        vm.next = function (product) {
            var nextProduct = vm.productQueryService.reposProducts.next(product);
            if (nextProduct) {
                $location.path("/edit/" + nextProduct.id);
            }
        };

        //转到上一单
        vm.previous = function (product) {
            var previousProduct = vm.productQueryService.reposProducts.previous(product);
            if (previousProduct) {
                $location.path("/edit/" + previousProduct.id);
            }
        };


        //查询
        vm.query();
    })
    .controller("editProductProfileController", function ($routeParams, ProductProfilesForm, nptSessionManager) {
        var vm = this;

        //记录产品id
        vm.productid = $routeParams.productid;

        //检查当前操作模式,如果存在profileid则编辑否则add
        if ($routeParams.profileid) {
            vm.profileid = $routeParams.profileid;
        } else {
            vm.profileid = undefined;
        }

        //数据模型
        vm.model = {
            productid: vm.productid,
            createby: nptSessionManager.getSession().getUser().id
        };

        //记录原始数据
        vm.originModel = angular.copy(vm.model);

        function save() {

        }

        function reset() {
            vm.model = angular.copy(vm.originModel);
        }

        //配置表单
        vm.productProfilesFormOptions = {
            store: ProductProfilesForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
                //注册提交事件
                vm.nptFormApi.addOnSubmitListen(save);
                //设置重置事件
                vm.nptFormApi.setOnActionListen(reset);
            }
        };

        //通过产品内容ID查询
        vm.queryById = function (id) {
            if (id) {
                //如果查询到数据则记录model以及originModel
            }
        };

        //通过产品ID查询
        vm.queryByProductId = function (productid) {
            if (productid) {

            }
        };

        //查询产品内容
        vm.queryById(vm.profileid);

        //查询产品下得所有内容集合
        vm.queryByProductId(vm.productid);
    }).controller("editProductDescrController", function ($routeParams, ProductDescrsForm, nptSessionManager) {
        var vm = this;

        //记录产品id
        vm.productid = $routeParams.productid;

        if ($routeParams.descrid) {
            vm.descrid = $routeParams.descrid;
        } else {
            vm.descrid = undefined;
        }

        //数据模型
        vm.model = {
            productid: vm.productid,
            createby: nptSessionManager.getSession().getUser().id
        };

        //记录原始数据
        vm.originModel = angular.copy(vm.model);

        function save() {
        }

        function reset() {
            vm.model = angular.copy(vm.originModel);
        }

        //配置表单
        vm.productDescrFormOptions = {
            store: ProductDescrsForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
                //注册提交事件
                vm.nptFormApi.addOnSubmitListen(save);
                //设置重置事件
                vm.nptFormApi.setOnActionListen(reset);
            }
        };

        //通过产品内容ID查询
        vm.queryById = function (id) {
            if (id) {
                //如果查询到数据则记录model以及originModel
            }
        };

        //通过产品ID查询
        vm.queryByProductId = function (productid) {
            if (productid) {

            }
        };

        //查询产品内容
        vm.queryById(vm.descrid);

        //查询产品下得所有内容集合
        vm.queryByProductId(vm.productid);
    }).controller("editProductClassifiesController", function ($routeParams, ProductClassifiesForm, nptSessionManager) {
        var vm = this;

        //记录产品id
        vm.productid = $routeParams.productid;

        if ($routeParams.classifiesid) {
            vm.classifiesid = $routeParams.classifiesid;
        } else {
            vm.classifiesid = undefined;
        }

        //数据模型
        vm.model = {
            productid: vm.productid,
            packagetype: "normal",
            createby: nptSessionManager.getSession().getUser().id
        };

        //记录原始数据
        vm.originModel = angular.copy(vm.model);

        function save() {
        }

        function reset() {
            vm.model = angular.copy(vm.originModel);
        }

        //配置表单
        vm.productClassifiesFormOptions = {
            store: ProductClassifiesForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
                //注册提交事件
                vm.nptFormApi.addOnSubmitListen(save);
                //设置重置事件
                vm.nptFormApi.setOnActionListen(reset);
            }
        };

        //通过产品内容ID查询
        vm.queryById = function (id) {
            if (id) {
                //如果查询到数据则记录model以及originModel
            }
        };

        //通过产品ID查询
        vm.queryByProductId = function (productid) {
            if (productid) {

            }
        };

        //查询产品内容
        vm.queryById(vm.classifiesid);

        //查询产品下得所有内容集合
        vm.queryByProductId(vm.productid);
    }).controller("editProductGroupController", function ($routeParams, ProductGroupForm, nptSessionManager) {
        var vm = this;

        //记录产品id
        vm.productid = $routeParams.productid;

        if ($routeParams.groupid) {
            vm.groupid = $routeParams.groupid;
        } else {
            vm.groupid = undefined;
        }

        //数据模型
        vm.model = {
            productid: vm.productid,
            createby: nptSessionManager.getSession().getUser().id
        };

        //记录原始数据
        vm.originModel = angular.copy(vm.model);

        function save() {
            console.info(vm.model);
        }

        function reset() {
            vm.model = angular.copy(vm.originModel);
        }

        //配置表单
        vm.productGroupFormOptions = {
            store: ProductGroupForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
                //注册提交事件
                vm.nptFormApi.addOnSubmitListen(save);
                //设置重置事件
                vm.nptFormApi.setOnActionListen(reset);
            }
        };

        //通过产品内容ID查询
        vm.queryById = function (id) {
            if (id) {
                //如果查询到数据则记录model以及originModel
            }
        };

        //通过产品ID查询
        vm.queryByProductId = function (productid) {
            if (productid) {

            }
        };

        //查询产品内容
        vm.queryById(vm.groupid);

        //查询产品下得所有内容集合
        vm.queryByProductId(vm.productid);
    }).controller("selectProductGroupModalController", function ($uibModalInstance, ProductQueryService) {
        var vm = this;
        vm.queryService = ProductQueryService;
        vm.ok = ok;
        vm.cancel = cancel;

        function ok(group) {
            $uibModalInstance.close(group);
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

    });


