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
    .config(function ($routeProvider) {
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
            })
            .when("/group/:province/:city/:district", {
                controller: "editGroupController as vm",
                templateUrl: "editGroup.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .otherwise({
                redirectTo: "/list"
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
        vm.model = {};

        vm.addOrUpdateProduct = AddOrUpdateProduct;

        //表单配置
        vm.productFormOptions = {
            store: productForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
            }
        };

        //保存产品
        vm.save = function () {
            if (vm.nptFormApi.form.$invalid) {
                Notification.error({message: '请输入正确的产品信息.', delay: 2000});
            } else {
                //设置补充保存信息
                vm.model.instid = nptSessionManager.getSession().getInst().id;
                vm.model.createby = nptSessionManager.getSession().getUser().id;

                vm.addOrUpdateProduct.post(vm.model).then(function (response) {
                    Notification.success({
                        message: "保存产品成功.",
                        delay: 2000
                    });
                    vm.toEdit();

                }, function (error) {
                    Notification.error({
                        message: "保存产品出现错误,请稍后尝试.",
                        delay: 2000
                    });
                });
            }
        };

        //转到edit
        vm.toEdit = function (productId) {
            $location.path("/edit/" + productId);
        }
    })
    .controller("editProductController", function ($scope, $location, $routeParams, Notification, QueryProductInfo, AddOrUpdateProduct, productForm) {
        var vm = this;

        //记录当前编辑的产品id
        vm.productid = $routeParams.id;

        //产品信息资源库
        vm.productInfo = QueryProductInfo;

        //产品更新资源库
        vm.addOrUpdateProduct = AddOrUpdateProduct;

        //表单配置
        vm.productFormOptions = {
            store: productForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
            }
        };

        //保存产品
        vm.save = function () {
            vm.addOrUpdateProduct.post(vm.productInfo.data).then(function (response) {
                Notification.success({
                    message: "保存成功!",
                    delay: 2000
                });
            }, function () {
                Notification.error({
                    message: "查找产品信息出错,请稍后尝试.",
                    delay: 2000
                });
            });
        };

        //查询
        vm.query = function () {
            if (vm.productid) {
                vm.productInfo.post({
                    productid: vm.productid
                }).then(function (response) {
                    vm.modelProduct = response.data.product;
                }, function () {
                    Notification.error({
                        message: "查找产品信息出错,请稍后尝试.",
                        delay: 2000
                    });
                });
            }
        };

        //查询
        vm.query();


    }).controller("editGroupController",
    function ($scope, $location, $routeParams, QueryMdProductGroup, AddOrUpdateMdProductGroup, productMdGroupListGrid) {
        var vm = this;
        vm.productMdGroupList = QueryMdProductGroup;

        vm.productMdGroupListGridOptions = {
            store: productMdGroupListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.productMdGroupListGridApi = nptGridApi;
                vm.productMdGroupListGridApi.action.add.addListener(
                    function (params, $timeout, $q) {
                        var deferd = $q.defer();
                        console.info("开始执行后台更新服务.");
                        params.data.province = $routeParams.province,
                            params.data.city = $routeParams.city,
                            params.data.district = $routeParams.district,
                            productCategoryService.editGroup(params, $q).then(function () {
                                deferd.resolve();
                            }, function () {
                                deferd.reject();
                            });
                        return deferd.promise;
                    });
            }
        };

        vm.addGroupDialog = function () {
            vm.productMdGroupListGridApi.action.add();
        };

        vm.queryMdProductGroup = function () {
            QueryMdProductGroup.post({
                province: $routeParams.province,
                city: $routeParams.city,
                district: $routeParams.district
            }).then(function (response) {
            }, function (error) {
                console.info(error);
            });
        };


        //首先查询全部产品
        if (!QueryMdProductGroup.data || QueryMdProductGroup.data.length <= 0) {
            vm.queryMdProductGroup();
        }


    })
    .controller("productDetailController", function ($scope, $location, $routeParams, QueryProductsGroup, QueryProductInfo, AddOrUpdateProductPhase, productForm, productPhaseListGrid, productRequirementListGrid, productProfilesListGrid, productGroupListGrid, productClassifiesListGrid, productDescrsListGrid, productCategoryService, nptSessionManager) {
        var vm = this;
        vm.userid = nptSessionManager.getSession().getUser().id;
        //产品列表资源库
        vm.productList = QueryProductsGroup;
        //产品信息资源库
        vm.productInfo = QueryProductInfo;
        //数据模型
        vm.model = {};
        vm.modelPhases = [];
        vm.modelRequirements = [];
        vm.modelProfiles = [];
        vm.modelGroups = [];
        vm.modelClassifies = [];
        vm.modelDescrs = [];

        //表单配置
        vm.productFormOptions = {
            store: productForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;

            }
        };

        vm.addProductPhaseDialog = function () {
            vm.productPhaseListGridApi.action.add();
        };

        vm.addProductRequirementDialog = function () {
            vm.productRequirementListGridApi.action.add();
        };

        vm.addProductProfilesDialog = function () {
            vm.productProfilesListGridApi.action.add();
        };

        vm.addProductGroupDialog = function () {
            vm.productGroupListGridApi.action.add();
        };

        vm.addProductClassifiesDialog = function () {
            vm.productClassifiesListGridApi.action.add();
        };

        vm.addProductDescrsDialog = function () {
            vm.productDescrsListGridApi.action.add();
        };

        vm.productPhaseListGridOptions = {
            store: productPhaseListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.productPhaseListGridApi = nptGridApi;
                vm.productPhaseListGridApi.action.add.addListener(
                    function (params, $timeout, $q) {
                        var deferd = $q.defer();
                        console.info("开始执行后台更新服务.");
                        params.data.productid = $routeParams.id;
                        params.data.createby = vm.userid;
                        productCategoryService.editProductPhase(params, $q).then(function () {
                            deferd.resolve();
                        }, function () {
                            deferd.reject();
                        });
                        return deferd.promise;
                    });
            }
        };

        vm.productRequirementListGridOptions = {
            store: productRequirementListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.productRequirementListGridApi = nptGridApi;
                vm.productRequirementListGridApi.action.add.addListener(
                    function (params, $timeout, $q) {
                        var deferd = $q.defer();
                        console.info("开始执行后台更新服务.");
                        params.data.productid = $routeParams.id;
                        params.data.createby = vm.userid;
                        productCategoryService.editProductPhase(params, $q).then(function () {
                            deferd.resolve();
                        }, function () {
                            deferd.reject();
                        });
                        return deferd.promise;
                    });
            }
        };

        vm.productProfilesListGridOptions = {
            store: productProfilesListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.productProfilesListGridApi = nptGridApi;
                vm.productProfilesListGridApi.action.add.addListener(
                    function (params, $timeout, $q) {
                        var deferd = $q.defer();
                        console.info("开始执行后台更新服务.");
                        params.data.productid = $routeParams.id;
                        params.data.createby = vm.userid;
                        productCategoryService.editProductProfile(params, $q).then(function () {
                            deferd.resolve();
                        }, function () {
                            deferd.reject();
                        });
                        return deferd.promise;
                    });
            }
        };

        vm.productGroupListGridOptions = {
            store: productGroupListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.productGroupListGridApi = nptGridApi;
                vm.productGroupListGridApi.action.add.addListener(
                    function (params, $timeout, $q) {
                        var deferd = $q.defer();
                        console.info("开始执行后台更新服务.");
                        params.data.productid = $routeParams.id;
                        productCategoryService.editProductGroup(params, $q).then(function () {
                            deferd.resolve();
                        }, function () {
                            deferd.reject();
                        });
                        return deferd.promise;
                    });
            }
        };

        vm.productClassifiesListGridOptions = {
            store: productClassifiesListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.productClassifiesListGridApi = nptGridApi;
                vm.productClassifiesListGridApi.action.add.addListener(
                    function (params, $timeout, $q) {
                        var deferd = $q.defer();
                        console.info("开始执行后台更新服务.");
                        params.data.productid = $routeParams.id;
                        productCategoryService.editProductClassify(params, $q).then(function () {
                            deferd.resolve();
                        }, function () {
                            deferd.reject();
                        });
                        return deferd.promise;
                    });
            }
        };

        vm.productDescrsListGridOptions = {
            store: productDescrsListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.productDescrsListGridApi = nptGridApi;
                vm.productDescrsListGridApi.action.add.addListener(
                    function (params, $timeout, $q) {
                        var deferd = $q.defer();
                        console.info("开始执行后台更新服务.");
                        params.data.productid = $routeParams.id;
                        params.data.createby = vm.userid;
                        productCategoryService.editProductDescr(params, $q).then(function () {
                            deferd.resolve();
                        }, function () {
                            deferd.reject();
                        });
                        return deferd.promise;
                    });
            }
        };

        vm.query = function () {
            var id = $routeParams.id;

            if (id) {
                vm.productInfo.post({
                    productid: id
                }).then(function (response) {
                    vm.model = response.data;
                    vm.modelPhases = response.data.productPhases;
                    vm.modelRequirements = response.data.productRequirements;
                    vm.modelProfiles = response.data.bizProductProfiles;
                    vm.modelGroups = response.data.productGroups;
                    vm.modelClassifies = response.data.bizProductClassifies;
                    vm.modelDescrs = response.data.bizProductDescrs;
                }, function (error) {
                    var de = error;
                });
            }
        };
        vm.query();

        //转到下一单
        vm.next = function (product) {
            var nextProduct = vm.productList.next(product);
            if (nextProduct) {
                $location.path("/detail/" + nextProduct.id);
            }
        };

        //转到上一单
        vm.previous = function (product) {
            var previousProduct = vm.productList.previous(product);
            if (previousProduct) {
                $location.path("/detail/" + previousProduct.id);
            }
        };

    });