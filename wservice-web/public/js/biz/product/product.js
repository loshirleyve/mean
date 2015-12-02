/**
 * Created by rxy on 15/11/3.
 */
angular.module("productApp", ["ui.neptune", "productApp.productListGrid", "productApp.productMdGroupListGrid", "productApp.productPhaseListGrid",
    "productApp.productRequirementListGrid", "productApp.productProfilesListGrid", "productApp.productGroupListGrid", "productApp.productClassifiesListGrid",
    "productApp.productDescrsListGrid", "productApp.productForm", "wservice.common", "ngRoute"])
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
            .when("/product/:id", {
                controller: "editProductController as vm",
                templateUrl: "product.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/product", {
                controller: "editProductController as vm",
                templateUrl: "product.html"
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
            .when("/detail/:id", {
                controller: "productDetailController as vm",
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
    }).factory("queryCities", function (nptRepository) {
        return nptRepository("queryCities").params({
        });
    }).factory("QueryMdProductGroup", function (nptRepository) {
        return nptRepository("QueryMdProductGroupBylocation").params({
        });
    }).factory("QueryProductsGroup", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryProductsGroup").params({
            //instid: nptSessionManager.getSession().getInst().id
        });
    })
    .factory("QueryProductInfo", function (nptRepository) {
        return nptRepository("QueryProductInfoById").params({
        });
    })
    .factory("QueryProductPhases", function (nptRepository) {
        return nptRepository("QueryProductPhaseByProductid").params({
        });
    })
    .factory("AddOrUpdateProduct", function (nptRepository) {
        return nptRepository("AddOrUpdateProduct").params({
        });
    })
    .factory("AddOrUpdateMdProductGroup", function (nptRepository, nptSessionManager) {
        return nptRepository("AddOrUpdateMdProductGroup").params({
            createby: nptSessionManager.getSession().getUser().id
        });
    })
    .factory("AddOrUpdateProductPhase", function (nptRepository) {
        return nptRepository("AddOrUpdateProductPhase").params({
        });
    }).factory("AddOrUpdateProductProfile", function (nptRepository) {
        return nptRepository("AddOrUpdateProductProfile").params({
        });
    }).factory("AddOrUpdateProductGroup", function (nptRepository) {
        return nptRepository("AddOrUpdateProductGroup").params({
        });
    }).factory("AddOrUpdateProductclassify", function (nptRepository) {
        return nptRepository("AddOrUpdateProductclassify").params({
        });
    }).factory("AddOrUpdateProductDescr", function (nptRepository) {
        return nptRepository("AddOrUpdateProductDescr").params({
        });
    }).factory("RemoveProductPhase", function (nptRepository) {
        return nptRepository("RemoveProductPhase").params({
        });
    }).factory("RemoveProductRequirement", function (nptRepository) {
        return nptRepository("RemoveProductRequirement").params({
        });
    }).factory("RemoveProductGroup", function (nptRepository) {
        return nptRepository("RemoveProductGroup").params({
        });
    }).factory("RemoveProductClassify", function (nptRepository) {
        return nptRepository("RemoveProductClassify").params({
        });
    }).factory("RemoveProductDescr", function (nptRepository) {
        return nptRepository("RemoveProductDescr").params({
        });
    })
    .service("productCategoryService", function ($http, $location, nptResource, queryCities, QueryMdProductGroup, QueryProductsGroup, AddOrUpdateMdProductGroup, AddOrUpdateProductPhase, AddOrUpdateProductProfile, AddOrUpdateProductGroup, AddOrUpdateProductclassify, AddOrUpdateProductDescr) {
        var self = this;
        //查找所有省
        self.findProvince = function () {
            if (self.allCitys) {
                self.provinces = {};
                self.allCitys.forEach(function (value) {
                    if (!self.provinces[value.province]) {
                        self.provinces[value.province] = value;
                    }
                });
                self.selectProvince(self.allCitys[0]);
            }
        };

        //根据省份查询城市
        self.findCitys = function (province) {
            if (self.allCitys) {
                self.citys = {};
                self.allCitys.forEach(function (value) {
                    if (value.province === province.province && !self.citys[value.city]) {
                        self.citys[value.city] = value;
                    }
                });
            }
        };

        //根据省份、城市查询区域
        self.findDistrict = function (province, city) {
            if (self.allCitys) {
                self.districts = {};
                self.allCitys.forEach(function (value) {
                    if (value.province === province && value.city === city.city) {
                        self.districts[value.district] = value;
                    }
                });
            }
        };

        self.selectProvince = function (province) {
            self.currProvince = province.province;
            self.findCitys(province);
            self.currCity = undefined;
            self.currDistrict = undefined;
            self.selectCity(province);
        };

        self.selectCity = function (city) {
            self.currCity = city.city;
            self.findDistrict(self.currProvince, city);
            self.currDistrict = undefined;
            self.selectDistrict(city);
        };

        self.selectDistrict = function (district) {
            self.currDistrict = district.district;
            self.queryMdProductGroup();
        };

        self.queryCities = function () {
            queryCities.post().then(function (response) {
                //初始化列表
                self.allCitys = response.data;
                self.findProvince();
            }, function (error) {
                console.info(error);
            });
        };

        self.queryMdProductGroup = function () {
            QueryMdProductGroup.post({
                province: self.currProvince,
                city: self.currCity,
                district: self.currDistrict
            }).then(function (response) {
                self.allGroups = response.data;
            }, function (error) {
                console.info(error);
            });
        };

        /**
         * 根据分组id查询产品列表
         */
        self.queryByGroupId = function (groupid, name) {
            if (groupid == 'all') {
                self.groupid = QueryProductsGroup.post({
                }).then(function (response) {
                    self.queryName = name;
                    self.productList = response.data;
                }, function (error) {
                });
            }
            else {
                self.groupid = QueryProductsGroup.post({
                    groupid: groupid
                }).then(function (response) {
                    self.queryName = name;
                    self.productList = response.data;
                }, function (error) {
                });
            }
        };

        self.editGroup = function (params, $q) {
            var deferd = $q.defer();
            AddOrUpdateMdProductGroup.post(
                params.data
            ).then(function (response) {
                    deferd.resolve("编辑成功");
                }, function (error) {
                    deferd.reject(error);
                    console.info(error);
                });
            return deferd.promise;
        };

        /**
         * 编辑产品阶段
         */
        self.editProductPhase = function (params, $q) {
            var deferd = $q.defer();
            AddOrUpdateProductPhase.post(
                params.data
            ).then(function (response) {
                    deferd.resolve("编辑成功");
                }, function (error) {
                    deferd.reject("不能在第一行上添加.");
                    console.info(error);
                });
            return deferd.promise;
        };

        /**
         * 编辑产品说明
         */
        self.editProductProfile = function (params, $q, nptResource) {
            var deferd = $q.defer();
            AddOrUpdateProductProfile.post(
                params.data
            ).then(function (response) {
                    deferd.resolve("编辑成功");
                }, function (error) {
                    deferd.reject("不能在第一行上添加.");
                    console.info(error);
                });
            return deferd.promise;
        };

        /**
         * 编辑产品分组
         */
        self.editProductGroup = function (params, $q, nptResource) {
            var deferd = $q.defer();
            AddOrUpdateProductGroup.post(
                params.data
            ).then(function (response) {
                    deferd.resolve("编辑成功");
                }, function (error) {
                    deferd.reject("不能在第一行上添加.");
                    console.info(error);
                });
            return deferd.promise;
        };


        /**
         * 编辑产品内容
         */
        self.editProductClassify = function (params, $q, nptResource) {
            var deferd = $q.defer();
            AddOrUpdateProductclassify.post(
                params.data
            ).then(function (response) {
                    deferd.resolve("编辑成功");
                }, function (error) {
                    deferd.reject("不能在第一行上添加.");
                    console.info(error);
                });
            return deferd.promise;
        };

        /**
         * 编辑产品说明
         */
        self.editProductDescr = function (params, $q) {
            var deferd = $q.defer();
            AddOrUpdateProductDescr.post(
                params.data
            ).then(function (response) {
                    deferd.resolve("编辑成功");
                }, function (error) {
                    deferd.reject("不能在第一行上添加.");
                    console.info(error);
                });
            return deferd.promise;
        };


    })
    .controller("productListController", function ($scope, $http, $location, queryCities, QueryMdProductGroup, QueryProductsGroup, AddOrUpdateMdProductGroup, productListGrid, productCategoryService) {
        var vm = this;
        vm.productList = QueryProductsGroup;

        vm.productListGridOptions = {
            store: productListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.nptGridApi = nptGridApi;
            }
        };
        vm.productCategory = productCategoryService;
        vm.allCitys = [];


        //首先查询全部产品
        if (!vm.productCategory.allCitys || vm.productCategory.allCitys.length <= 0) {
            vm.productCategory.queryCities();
        }


        //首先查询全部产品
        if (!vm.productCategory.productList || vm.productCategory.productList.length <= 0) {
            vm.productCategory.queryByGroupId('all', '全部');
        }


    }).controller("editProductController", function ($scope, $location, $routeParams, QueryProductInfo, AddOrUpdateProduct, productForm) {
        var vm = this;

        //产品信息资源库
        vm.productInfo = QueryProductInfo;

        vm.model = {};
        //表单配置
        vm.productFormOptions = {
            store: productForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;

            }
        };

        vm.query = function () {
            var id = $routeParams.id;

            if (id) {
                vm.productInfo.post({
                    productid: id
                }).then(function (response) {
                    vm.model = response.data;
                }, function (error) {
                    var de = error;
                });
            }
        };

        vm.query();

        vm.editProduct = function () {
            AddOrUpdateProduct.post({
                province: vm.currProvince,
                city: vm.currCity,
                district: vm.currDistrict,
                name: vm.groupName
            }).then(function (response) {
                vm.queryMdProductGroup();
            }, function (error) {
                console.info(error);
            });
        };

    }).controller("editGroupController",
    function ($scope, $location, $routeParams, QueryMdProductGroup, AddOrUpdateMdProductGroup, productMdGroupListGrid, productCategoryService) {
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
                            params.data.district = $routeParams.district
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
    .controller("productDetailController", function ($scope, $location, $routeParams, QueryProductsGroup, QueryProductInfo, AddOrUpdateProductPhase, productForm, productPhaseListGrid, productRequirementListGrid, productProfilesListGrid, productGroupListGrid, productClassifiesListGrid, productDescrsListGrid,productCategoryService,nptSessionManager) {
        var vm = this;
        var userid= nptSessionManager.getSession().getUser().id
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
                        params.data.productid= $routeParams.id;
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
                        params.data.productid= $routeParams.id;
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
                        params.data.productid= $routeParams.id;
                        params.data.createby = userid;
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
                        params.data.productid= $routeParams.id;
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
                        params.data.productid= $routeParams.id;
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
                        params.data.productid= $routeParams.id;
                        params.data.createby = userid;
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