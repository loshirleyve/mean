/**
 * Created by rxy on 15/11/3.
 */
angular.module("productApp", ["ui.neptune", "productApp.productListGrid", "productApp.productMdGroupListGrid", "productApp.productPhaseListGrid",
    "productApp.productProfilesListGrid", "productApp.productGroupListGrid", "productApp.productClassifiesListGrid",
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
            instid: nptSessionManager.getSession().getInst().id
//            userid: nptSessionManager.getSession().getUser().id
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
    .service("productCategoryService", function ($http, $location, nptResource, queryCities, QueryMdProductGroup, QueryProductsGroup) {
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
                    groupid:groupid
                }).then(function (response) {
                    self.queryName = name;
                    self.productList = response.data;
                }, function (error) {
                });
            }


        };
    })
    .controller("productListController", function ($scope, $http, $location, queryCities, QueryMdProductGroup,QueryProductsGroup, AddOrUpdateMdProductGroup, productListGrid, productCategoryService) {
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
//
//
//
//        /**
//         * 根据分组id查询产品列表
//         */
//        vm.queryByGroupId = function (groupid, name) {
//            if (groupid != 'weifenlei') {
//                if (groupid != 'all') {
//                    vm.groupid = QueryProductsByGroupId.post({
//                        groupid: groupid
//                    }).then(function () {
//                        vm.queryName = name;
//                    }, function (error) {
//                    });
//                }
//                else {
//                    vm.groupid = QueryProductsByGroupId.post({
//                    }).then(function () {
//                        vm.queryName = name;
//                    }, function (error) {
//                    });
//                }
//
//            }
//            if (groupid == 'weifenlei') {
//                vm.groupid = QueryProductsNoGroup.post({
//                }).then(function () {
//                    vm.queryName = name;
//                }, function (error) {
//                });
//            }
//        };

        vm.addGroup = function () {
            AddOrUpdateMdProductGroup.post({
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

    }).controller("editGroupController", function ($scope, $location, $routeParams, QueryMdProductGroup, AddOrUpdateMdProductGroup, productMdGroupListGrid) {
        var vm = this;
        vm.productMdGroupList = QueryMdProductGroup;

        vm.productMdGroupListGridOptions = {
            store: productMdGroupListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.productMdGroupListGridApi = nptGridApi;
            }
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

        vm.editGroup = function (params, $q, nptResource) {
            var deferd = $q.defer();
            nptResource
                .post("AddOrUpdateMdProductGroup", params.data, function (data) {
                    console.info("后台调用更成功.controller");
                    deferd.resolve("添加成功");
                }, function (data) {
                    deferd.reject("不能在第一行上添加.");
                });
        };

        //首先查询全部产品
        if (!QueryMdProductGroup.data || QueryMdProductGroup.data.length <= 0) {
            vm.queryMdProductGroup();
        }


    })
    .controller("productDetailController", function ($scope, $location, $routeParams, QueryProductsGroup, QueryProductsNoGroup, QueryProductInfo, productForm, productPhaseListGrid, productProfilesListGrid, productGroupListGrid, productClassifiesListGrid, productDescrsListGrid) {
        var vm = this;

        //产品列表资源库
        vm.productList = QueryProductsGroup;
        //产品信息资源库
        vm.productInfo = QueryProductInfo;
        //数据模型
        vm.model = {};
        vm.modelPhases = [];
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

        vm.productPhaseListGridOptions = {
            store: productPhaseListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.productPhaseListGridApi = nptGridApi;
            }
        };

        vm.productProfilesListGridOptions = {
            store: productProfilesListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.productProfilesListGridApi = nptGridApi;
            }
        };

        vm.productGroupListGridOptions = {
            store: productGroupListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.productGroupListGridApi = nptGridApi;
            }
        };

        vm.productClassifiesListGridOptions = {
            store: productClassifiesListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.productClassifiesListGridApi = nptGridApi;
            }
        };

        vm.productDescrsListGridOptions = {
            store: productDescrsListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.productDescrsListGridApi = nptGridApi;
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

        /**
         * 编辑产品阶段
         */
        $scope.editProductPhase = function (params, $q, nptResource) {
            params.data.createby = "10000001498059";
            params.data.productid = $scope.productid;
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

    });