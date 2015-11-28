/**
 * Created by rxy on 15/11/3.
 */
angular.module("productApp", ["ui.neptune","productApp.productListGrid","productApp.productPhaseListGrid",
    "productApp.productProfilesListGrid","productApp.productGroupListGrid","productApp.productClassifiesListGrid",
    "productApp.productDescrsListGrid","productApp.productForm", "wservice.common", "ngRoute"])
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
            .when("/detail/:id", {
                controller: "productDetailController",
                templateUrl: "detail.html"
            })
            .otherwise({
                redirectTo: "/list"
            });
    }).factory("queryCities", function (nptRepository) {
        return nptRepository("queryCities").params({
        })
    }).factory("QueryMdProductGroup", function (nptRepository) {
        return nptRepository("QueryMdProductGroupBylocation").params({
            province: "广东省",
            city: "深圳市",
            district: "全城"
        })
    }).factory("QueryProductsByGroupId", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryProductsByGroupId").params({
//            instid: nptSessionManager.getSession().getInst().id,
//            userid: nptSessionManager.getSession().getUser().id
        })
    })
    .factory("QueryProductsNoGroup", function (nptRepository) {
        return nptRepository("QueryProductsNoGroup").params({
        })
    })
    .factory("QueryProductInfo", function (nptRepository) {
        return nptRepository("QueryProductInfoById").params({
        })
    })
    .factory("QueryProductPhases", function (nptRepository) {
        return nptRepository("QueryProductPhaseByProductid").params({
        })
    })
    .controller("productListController", function ($scope, $http, $location, queryCities, QueryMdProductGroup, QueryProductsByGroupId, QueryProductsNoGroup, productListGrid) {
        var vm = this;

        vm.queryCitiesList = queryCities;
        vm.productMdGroupList = QueryMdProductGroup;
        vm.productList = QueryProductsByGroupId;

        var temp = {String: {String: [String]}};//遍历城市列表，分出省市区

        vm.productListGridOptions = {
            store: productListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.nptGridApi = nptGridApi;
            }
        };

        vm.productAction = function (action, item, index) {
            console.info(action);
            if (item && action.type === "view") {
                $location.path("/detail/" + item.id);
            }
        };
        vm.queryMdProductGroup = function () {
            QueryMdProductGroup.post().then(function (response) {
            }, function (error) {
                console.info(error);
            });
        };

        vm.allCitys = [];

        vm.queryCities = function () {
            queryCities.post().then(function (response) {
                vm.allCitys = response.data;

                //初始化列表
                vm.findProvince();

            }, function (error) {
                console.info(error);
            });
        };

        vm.selectProvince = function(province){
            vm.currProvince = province.province;
            vm.findCitys(province);
            vm.currCity=undefined;
            vm.currDistrict=undefined;
        };

        vm.selectCity = function(city){
            vm.currCity = city.city;
            vm.findDistrict(vm.currProvince, city);
            vm.currDistrict=undefined;
        };

        vm.selectDistrict = function(district){
            vm.currDistrict = district.district;
        };


        //查找所有省
        vm.findProvince = function () {
            if (vm.allCitys) {
                vm.provinces = {};
                vm.allCitys.forEach(function (value) {
                    vm.provinces[value.province] = value;
                });
            }
        };

        //根据省份查询城市
        vm.findCitys = function (province) {
            if (vm.allCitys) {
                vm.citys={};
                vm.allCitys.forEach(function (value) {
                    if (value.province === province.province) {
                        vm.citys[value.city]=value;
                    }
                });
            }
        };

        //根据省份、城市查询区域
        vm.findDistrict = function (province, city) {
            if (vm.allCitys) {
                vm.districts={};
                vm.allCitys.forEach(function (value) {
                    if (value.province === province && value.city === city.city) {
                        vm.districts[value.district]=value;
                    }
                });
            }
        };

        /**
         * 根据分组id查询产品列表
         */
        vm.queryByGroupId = function (groupid, name) {
            if (groupid != 'weifenlei') {
                if (groupid != 'all') {
                    vm.groupid = QueryProductsByGroupId.post({
                        groupid: groupid
                    }).then(function () {
                        vm.queryName = name;
                    }, function (error) {
                    });
                }
                else {
                    vm.groupid = QueryProductsByGroupId.post({
                    }).then(function () {
                        vm.queryName = name;
                    }, function (error) {
                    });
                }

            }
            if (groupid == 'weifenlei') {
                vm.groupid = QueryProductsNoGroup.post({
                }).then(function () {
                    vm.queryName = name;
                }, function (error) {
                });
            }
        };

        //首先查询全部产品
        if (!queryCities.data || queryCities.data.length <= 0) {
            vm.queryCities();
        }

        //首先查询全部产品分组
        if (!QueryMdProductGroup.data || QueryMdProductGroup.data.length <= 0) {
            vm.queryMdProductGroup();
        }

        //首先查询全部产品
        if (!QueryProductsByGroupId.data || QueryProductsByGroupId.data.length <= 0) {
            vm.queryByGroupId('all', '全部');
        }


    })
    .controller("productDetailController", function ($scope, $location, $routeParams,QueryProductsByGroupId,QueryProductsNoGroup,QueryProductInfo, ProductForm,
               productPhaseListGrid,productProfilesListGrid,productGroupListGrid,productClassifiesListGrid,productDescrsListGrid) {
        var vm = this;

        //产品列表资源库
        vm.productList = QueryProductsByGroupId;
        //订单信息资源库
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

    });