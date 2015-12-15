/**
 * Created by rxy on 15/11/3.
 */
angular.module("productApp", ["ui.neptune",
    "productApp.productListGrid",
    "productApp.productMdGroupListGrid",
    "productApp.requirementListGrid",
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
            }).when("/group/:province/:city/:district", {
                controller: "groupListController as vm",
                templateUrl: "group.html",
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
            .when("/add/classifies/:productid/:cityid", {
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
            .when("/edit/phase/:productid", {
                controller: "editProductPhaseController as vm",
                templateUrl: "editProductPhase.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/edit/phase/:productid/:phaseid", {
                controller: "editProductPhaseController as vm",
                templateUrl: "editProductPhase.html",
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
                                $scope.model.groupname = response.name;
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
            instid: nptSessionManager.getSession().getInst().id});
    }).factory("QueryProductInfo", function (nptRepository) {
        return nptRepository("QueryProductInfoById").params({});
    }).factory("QueryRequirementsByInstid", function (nptRepository) {
        return nptRepository("QueryRequirementsByInstid").params({});
    }).factory("AddOrUpdateProduct", function (nptRepository) {
        return nptRepository("AddOrUpdateProduct").params({});
    }).factory("UpdateProductState", function (nptRepository) {
        return nptRepository("UpdateProductState").params({});
    }).factory("AddOrUpdateMdProductGroup", function (nptRepository, nptSessionManager) {
        return nptRepository("AddOrUpdateMdProductGroup").params({
            createby: nptSessionManager.getSession().getUser().id});
    }).factory("AddOrUpdateProductPhase", function (nptRepository) {
        return nptRepository("AddOrUpdateProductPhase").params({});
    }).factory("AddProductRequirement", function (nptRepository) {
        return nptRepository("AddProductRequirement").params({});
    }).factory("AddOrUpdateProductProfile", function (nptRepository) {
        return nptRepository("AddOrUpdateProductProfile").params({});
    }).factory("AddOrUpdateProductGroup", function (nptRepository) {
        return nptRepository("AddOrUpdateProductGroup").params({});
    }).factory("AddOrUpdateProductClassify", function (nptRepository) {
        return nptRepository("AddOrUpdateProductclassify").params({});
    }).factory("AddOrUpdateProductDescr", function (nptRepository) {
        return nptRepository("AddOrUpdateProductDescr").params({});
    }).factory("QueryProductPhaseInfo", function (nptRepository) {
        return nptRepository("QueryProductPhaseInfo").params({ });
    }).factory("QueryProductProfileInfo", function (nptRepository) {
        return nptRepository("QueryProductProfileInfo").params({});
    }).factory("QueryProductGroupInfo", function (nptRepository) {
        return nptRepository("QueryProductGroupInfo").params({});
    }).factory("QueryProductClassifyInfo", function (nptRepository) {
        return nptRepository("QueryProductClassifyInfo").params({});
    }).factory("QueryProductDescrInfo", function (nptRepository) {
        return nptRepository("QueryProductDescrInfo").params({});
    }).factory("QueryProductPhaseByProductid", function (nptRepository) {
        return nptRepository("QueryProductPhaseByProductid").params({ });
    }).factory("QueryProductProfileByProductid", function (nptRepository) {
        return nptRepository("QueryProductProfileByProductid").params({});
    }).factory("QueryProductGroupByProductid", function (nptRepository) {
        return nptRepository("QueryProductGroupByProductid").params({});
    }).factory("QueryProductClassifyByProductid", function (nptRepository) {
        return nptRepository("QueryProductClassifyByProductid").params({});
    }).factory("QueryProductDescrByProductid", function (nptRepository) {
        return nptRepository("QueryProductDescrByProductid").params({});
    }).factory("RemoveProductMdGroup", function (nptRepository) {
        return nptRepository("RemoveProductMdGroup").params({});
    }).factory("RemoveProductProfile", function (nptRepository) {
        return nptRepository("RemoveProductProfile").params({});
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
    .service("ProductQueryService", function (Notification, QueryMdProductGroup, QueryCities, QueryProductsGroup, $uibModal) {
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
                },
                {
                    label: "未分类",
                    callBack: function () {
                        self.queryProducts({
                            groupType: "none"
                        });
                    }
                },
                {
                    label: "条件查询",
                    callBack: function () {
                        $uibModal.open({
                            animation: true,
                            templateUrl: 'query.html',
                            controller: 'productListQueryController',
                            controllerAs: 'vm'
                        }).result.then(function (response) {
                                //查询
                                self.queryProducts(response);
                            }, function () {
                                //用户关闭
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
                    title: "查询产品分组出现错误!",
                    message: error.data.cause,
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
                    title: "查询城市信息出现错误!",
                    message: error.data.cause,
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
                    title: "查询产品信息出现错误,请稍后重新尝试!",
                    message: error.data.cause,
                    delay: 2000
                });
            });
        };

        //执行查询
        self.queryCities();
    })
    .service("groupService", function (AddOrUpdateMdProductGroup) {
        var self = this;

        self.addMdProductGroup = AddOrUpdateMdProductGroup;

        self.addGroup = function (params, $q) {
            var deferd = $q.defer();
            self.addMdProductGroup.post(params.data)
                .then(function () {
                    deferd.resolve();
                }, function () {
                    deferd.reject();
                });
        };

    })
    .controller("productListQueryController", function ($uibModalInstance) {
        var vm = this;

        vm.model = {};

        vm.ok = function () {
            $uibModalInstance.close(vm.model);
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("productListController", function (ProductQueryService, productListGrid, productSearchForm) {
        var vm = this;
        //产品查询服务
        vm.queryService = ProductQueryService;

        vm.productListGridOptions = {
            store: productListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.nptGridApi = nptGridApi;
            }
        };

        //配置表单
        vm.productSearchFormOptions = {
            store: productSearchForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
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
                        message: error.data.cause,
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
    .controller("editProductController", function ($scope, $location, $routeParams, Notification, QueryRequirementsByInstid, QueryProductInfo, AddOrUpdateProduct, ProductQueryService, RemoveProductProfile, RemoveProductPhase, RemoveProductRequirement, AddProductRequirement, RemoveProductGroup, RemoveProductClassify, RemoveProductDescr, UpdateProductState, productForm, requirementListGrid, nptSessionManager, nptMessageBox) {
        var vm = this;

        //记录当前编辑的产品id
        vm.productid = $routeParams.id;

        //产品信息资源库
        vm.productInfo = QueryProductInfo;

        vm.productQueryService = ProductQueryService;

        //产品更新资源库
        vm.addOrUpdateProduct = AddOrUpdateProduct;

        vm.queryRequirements = QueryRequirementsByInstid;

        vm.updateProState = UpdateProductState;

        vm.queryService=ProductQueryService;

        //保存产品
        function saveProduct() {
            vm.addOrUpdateProduct.post(vm.modelProduct).then(function (response) {
                Notification.success({
                    message: "保存产品成功.",
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
                }, function () {
                    Notification.error({
                        title: "查找产品信息出错,请稍后尝试.",
                        message: error.data.cause,
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

        //下架
        vm.isShowOffTheShelf = function (product) {
            if (product.state == "normal" || product.state == "promotion") {
                return true;
            }
            return false;
        };

        //发布
        vm.isShowRelease = function (product) {
            if (product.state == "draft") {
                return true;
            }
            return false;
        };

        vm.updateProductState = function (productid, state) {
            vm.updateProState.post({
                productid: productid,
                state: state
            }).then(function (response) {
                vm.modelProduct.state = angular.copy(state);
                Notification.success({
                    message: "操作成功.",
                    delay: 2000
                });
            }, function (error) {
                Notification.error({
                    title: "操作出错,请稍后尝试.",
                    message: error.data.cause,
                    delay: 2000
                });
            });
        };

        //查询
        vm.query();

        vm.addProductRequirement = AddProductRequirement;
        var instid = nptSessionManager.getSession().getInst().id;
        var userid = nptSessionManager.getSession().getUser().id;
        vm.requirementListGridOptions = {
            store: requirementListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.nptGridApi = nptGridApi;
            }
        };

        vm.queryRequirement = function () {
            vm.queryRequirements.post({
                instid: instid
            }).then(function (response) {
                vm.requirement = response.data;
                vm._showModal();
            }, function (error) {
                Notification.error({
                    title: "查询资料出错,请稍后尝试.",
                    message: error.data.cause,
                    delay: 2000
                });
            });

        };

        vm._showModal = function () {
            nptMessageBox.open({
                title: "资料列表",
                content: '<div npt-grid="$$ms.requirementListGridOptions" model="$$ms.requirement"></div>',
                showCancel: true,
                scope: {
                    requirementListGridOptions: vm.requirementListGridOptions,
                    requirement: vm.requirement
                },
                action: {
                    success: {
                        label: "确定",
                        listens: [function (modalResult) {
                            var reqs = vm.nptGridApi.uiGridApi.selection.getSelectedRows();
                            var requirements = [];
                            angular.forEach(reqs, function (value) {
                                requirements.push(value.id);
                            });
                            vm.addProRequirement(requirements);
                        }]
                    }
                }
            });
        };

        vm.addProRequirement = function (requirements) {
            vm.addProductRequirement.post({productid: vm.productid, userid: userid, requirements: requirements})
                .then(function (response) {
                    angular.forEach(response.data, function (value) {
                        vm.modelProductRequirements.push(value);
                    });
                    Notification.success({
                        message: "保存产品资料成功!",
                        delay: 2000
                    });
                }, function () {
                    Notification.error({
                        title: "添加产品资料出错,请稍后尝试.",
                        message: error.data.cause,
                        delay: 2000
                    });
                });
        };


        vm.delProductProfile = RemoveProductProfile;
        vm.delProductPhase = RemoveProductPhase;
        vm.delProductRequirement = RemoveProductRequirement;
        vm.delProductGroup = RemoveProductGroup;
        vm.delProductClassify = RemoveProductClassify;
        vm.delProductDescr = RemoveProductDescr;


        vm.isDeleteProfile = function (profileid) {
            nptMessageBox.open({
                title:"提示",
                content: '是否确定删除吗?',
                showCancel: true,
                action: {
                    success: {
                        label: "确定",
                        listens: [function (modalResult) {
                            vm.deleteProfileById(profileid);
                        }]
                    }
                },
                modal:{
                    size:"sm"
                }
            });
        };

        vm.isDeletePhase = function (phaseid) {
            nptMessageBox.open({
                title:"提示",
                content: '是否确定删除吗?',
                showCancel: true,
                action: {
                    success: {
                        label: "确定",
                        listens: [function (modalResult) {
                            vm.deletePhaseById(phaseid);
                        }]
                    }
                },
                modal:{
                    size:"sm"
                }
            });
        };

        vm.isDeleteRequirement = function (requirementid) {
            nptMessageBox.open({
                title:"提示",
                content: '是否确定删除吗?',
                showCancel: true,
                action: {
                    success: {
                        label: "确定",
                        listens: [function (modalResult) {
                            vm.deleteRequirementById(requirementid);
                        }]
                    }
                },
                modal:{
                    size:"sm"
                }
            });
        };

        vm.isDeleteGroup = function (groupid) {
            nptMessageBox.open({
                title:"提示",
                content: '是否确定删除吗?',
                showCancel: true,
                action: {
                    success: {
                        label: "确定",
                        listens: [function (modalResult) {
                            vm.deleteGroupById(groupid);
                        }]
                    }
                },
                modal:{
                    size:"sm"
                }
            });
        };

        vm.isDeleteClassify = function (classifyid) {
            nptMessageBox.open({
                title:"提示",
                content: '是否确定删除吗?',
                showCancel: true,
                action: {
                    success: {
                        label: "确定",
                        listens: [function (modalResult) {
                            vm.deleteClassifyById(classifyid);
                        }]
                    }
                },
                modal:{
                    size:"sm"
                }
            });
        };

        vm.isDeleteDescr = function (descrid) {
            nptMessageBox.open({
                title:"提示",
                content: '是否确定删除吗?',
                showCancel: true,
                action: {
                    success: {
                        label: "确定",
                        listens: [function (modalResult) {
                            vm.deleteDescrById(descrid);
                        }]
                    }
                },
                modal:{
                    size:"sm"
                }
            });
        };

        vm.deleteProfileById = function (profileid) {
            vm.temp = [];
            vm.delProductProfile.post({profileid: profileid}).then(function (response) {
                angular.forEach(vm.modelProductProfiles, function (value) {
                    if (value.id != profileid) {
                        vm.temp.push(value);
                    }
                });
                vm.modelProductProfiles = angular.copy(vm.temp);
                Notification.success({
                    message: "删除产品内容成功！",
                    delay: 2000
                });
            }, function () {
                Notification.error({
                    title: "删除产品内容出错,请稍后尝试.",
                    message: error.data.cause,
                    delay: 2000
                });
            });
        };

        vm.deletePhaseById = function (phaseid) {
            vm.temp1 = [];
            vm.delProductPhase.post({phaseid: phaseid}).then(function (response) {
                angular.forEach(vm.modelProductPhases, function (value) {
                    if (value.id != phaseid) {
                        vm.temp1.push(value);
                    }
                });
                vm.modelProductPhases = angular.copy(vm.temp1);
                Notification.success({
                    message: "删除产品阶段成功！",
                    delay: 2000
                });
            }, function () {
                Notification.error({
                    title: "删除产品阶段出错,请稍后尝试.",
                    message: error.data.cause,
                    delay: 2000
                });
            });
        };

        vm.deleteRequirementById = function (requirementid) {
            vm.temp2 = [];
            vm.delProductRequirement.post({requirementid: requirementid}).then(function (response) {
                angular.forEach(vm.modelProductRequirements, function (value) {
                    if (value.id != requirementid) {
                        vm.temp2.push(value);
                    }
                });
                vm.modelProductRequirements = angular.copy(vm.temp2);
                Notification.success({
                    message: "删除产品资料成功！",
                    delay: 2000
                });
            }, function () {
                Notification.error({
                    title: "删除产品资料出错,请稍后尝试.",
                    message: error.data.cause,
                    delay: 2000
                });
            });
        };

        vm.deleteGroupById = function (groupid) {
            vm.temp3 = [];
            vm.delProductGroup.post({groupid: groupid}).then(function (response) {
                angular.forEach(vm.modelProductGroups, function (value) {
                    if (value.id != groupid) {
                        vm.temp3.push(value);
                    }
                });
                vm.modelProductGroups = angular.copy(vm.temp3);
                Notification.success({
                    message: "删除产品分组成功！",
                    delay: 2000
                });
            }, function () {
                Notification.error({
                    title: "删除产品分组出错,请稍后尝试.",
                    message: error.data.cause,
                    delay: 2000
                });
            });
        };

        vm.deleteClassifyById = function (classifyid) {
            vm.temp4 = [];
            vm.delProductClassify.post({classifyid: classifyid}).then(function (response) {
                angular.forEach(vm.modelProductClassifies, function (value) {
                    if (value.id != classifyid) {
                        vm.temp4.push(value);
                    }
                });
                vm.modelProductClassifies = angular.copy(vm.temp4);
                Notification.success({
                    message: "删除产品分类成功！",
                    delay: 2000
                });
            }, function () {
                Notification.error({
                    title: "删除产品分类出错,请稍后尝试.",
                    message: error.data.cause,
                    delay: 2000
                });
            });
        };

        vm.deleteDescrById = function (descrid) {
            vm.temp5 = [];
            vm.delProductDescr.post({productDescrid: descrid}).then(function (response) {
                angular.forEach(vm.modelProductDescrs, function (value) {
                    if (value.id != descrid) {
                        vm.temp5.push(value);
                    }
                });
                vm.modelProductDescrs = angular.copy(vm.temp5);
                Notification.success({
                    message: "删除产品详情成功！",
                    delay: 2000
                });
            }, function () {
                Notification.error({
                    title: "删除产品详情出错,请稍后尝试.",
                    message: error.data.cause,
                    delay: 2000
                });
            });
        };

    }).controller("groupListController", function ($scope, $location, $routeParams, Notification, QueryMdProductGroup, AddOrUpdateMdProductGroup, groupService, productMdGroupListGrid, nptSessionManager) {
        var vm = this;

        vm.groupService = groupService;

        vm.province = $routeParams.province;
        vm.city = $routeParams.city;
        vm.district = $routeParams.district;
        vm.queryMdProductGroup = QueryMdProductGroup.addRequestInterceptor(function(request) {
            request.params.province = vm.province;
            request.params.city = vm.city;
            request.params.district = vm.district;
            return request;
        });
        vm.addMdProductGroup = AddOrUpdateMdProductGroup;

        vm.groupListGridOptions = {
            store: productMdGroupListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.nptGridApi = nptGridApi;
                var dealProvinceFn = function (params) {
                    params.data.province = vm.province;
                    params.data.city = vm.city;
                    params.data.district = vm.district;
                    params.data.createby = nptSessionManager.getSession().getUser().id;
                };
                vm.nptGridApi.action.add.addPreListener(dealProvinceFn);
                vm.nptGridApi.action.edit.addPreListener(dealProvinceFn);
            }
        };

        vm.queryGroupList = function () {
            //如果查询到数据则记录model以及originModel
            vm.queryMdProductGroup.post({
            }).then(function (response) {
                vm.model = response.data;
            }, function () {
                Notification.error({
                    title: "查询分组出错,请稍后尝试.",
                    message: error.data.cause,
                    delay: 2000
                });
            });

        };

        vm.queryGroupList();

    })
    .controller("editProductProfileController", function ($routeParams, $location, ProductProfilesForm, AddOrUpdateProductProfile, QueryProductProfileInfo, QueryProductProfileByProductid, Notification, nptSessionManager) {
        var vm = this;

        //记录产品id
        vm.productid = $routeParams.productid;
        vm.addProductProfile = AddOrUpdateProductProfile;
        vm.productProfileInfo = QueryProductProfileInfo;
        vm.productProfileByProductid = QueryProductProfileByProductid;
        //检查当前操作模式,如果存在profileid则编辑否则add
        if ($routeParams.profileid) {
            vm.profileid = $routeParams.profileid;
        } else {
            vm.profileid = undefined;
        }

        vm.model = {
            productid: vm.productid,
            createby: nptSessionManager.getSession().getUser().id
        };


        //记录原始数据
        vm.originModel = angular.copy(vm.model);

        function save() {
            vm.addProductProfile.post(vm.model)
                .then(function (response) {
                    Notification.success({
                        message: "保存产品内容成功!",
                        delay: 2000
                    });
                    vm.originModel = angular.copy(response.data);
                    vm.model = angular.copy(response.data);
                    $location.path("/edit/profile/" + vm.productid + "/" + response.data.id);
                }, function () {
                    Notification.error({
                        title: "添加产品内容出错,请稍后尝试.",
                        message: error.data.cause,
                        delay: 2000
                    });
                });
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
                vm.productProfileInfo.post(
                    {profileid: id}
                ).then(function (response) {
                        vm.originModel = angular.copy(response.data);
                        vm.model = angular.copy(response.data);
                    }, function () {
                        Notification.error({
                            title: "查询产品内容出错,请稍后尝试.",
                            message: error.data.cause,
                            delay: 2000
                        });
                    });
            }
        };

        //通过产品ID查询
        vm.queryByProductId = function (productid) {
            if (productid) {
                vm.productProfileByProductid.post({
                    productid: vm.productid
                }).then(function (response) {
                }, function () {
                    Notification.error({
                        title: "查找产品内容出错,请稍后尝试.",
                        message: error.data.cause,
                        delay: 2000
                    });
                });
            }
        };


        //转到下一单
        vm.next = function (profile) {
            var nextProfile = vm.productProfileByProductid.next(profile);
            if (nextProfile) {
                $location.path("/edit/profile/" + vm.productid + "/" + nextProfile.id);
            }
        };

        //转到上一单
        vm.previous = function (profile) {
            var previousProfile = vm.productProfileByProductid.previous(profile);
            if (previousProfile) {
                $location.path("/edit/profile/" + vm.productid + "/" + previousProfile.id);
            }
        };

        //查询产品内容
        vm.queryById(vm.profileid);
        //查询产品下得所有内容集合
        vm.queryByProductId(vm.productid);
    }).controller("editProductDescrController", function ($routeParams, $location, ProductDescrsForm, AddOrUpdateProductDescr, QueryProductDescrInfo, QueryProductDescrByProductid, Notification, nptSessionManager) {
        var vm = this;

        //记录产品id
        vm.productid = $routeParams.productid;
        vm.addProductDescr = AddOrUpdateProductDescr;
        vm.productDescrInfo = QueryProductDescrInfo;
        vm.productDescrByProductid = QueryProductDescrByProductid;
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
            vm.addProductDescr.post(vm.model)
                .then(function (response) {
                    Notification.success({
                        message: "保存产品详情成功!",
                        delay: 2000
                    });
                    vm.originModel = angular.copy(response.data);
                    vm.model = angular.copy(response.data);
                    $location.path("/edit/descr/" + vm.productid + "/" + response.data.id);
                }, function () {
                    Notification.error({
                        title: "添加产品详情出错,请稍后尝试.",
                        message: error.data.cause,
                        delay: 2000
                    });
                });
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
                vm.productDescrInfo.post(
                    {descrid: id}
                ).then(function (response) {
                        vm.originModel = angular.copy(response.data);
                        vm.model = angular.copy(response.data);
                    }, function () {
                        Notification.error({
                            title: "查询产品详情出错,请稍后尝试.",
                            message: error.data.cause,
                            delay: 2000
                        });
                    });
            }
        };

        //通过产品ID查询
        vm.queryByProductId = function (productid) {
            if (productid) {
                vm.productDescrByProductid.post({
                    productid: vm.productid
                }).then(function (response) {
                }, function () {
                    Notification.error({
                        title: "查找产品详情列表出错,请稍后尝试.",
                        message: error.data.cause,
                        delay: 2000
                    });
                });
            }
        };

        //转到下一单
        vm.next = function (descr) {
            var nextDescr = vm.productDescrByProductid.next(descr);
            if (nextDescr) {
                $location.path("/edit/descr/" + vm.productid + "/" + nextDescr.id);
            }
        };

        //转到上一单
        vm.previous = function (descr) {
            var previousDescr = vm.productDescrByProductid.previous(descr);
            if (previousDescr) {
                $location.path("/edit/descr/" + vm.productid + "/" + previousDescr.id);
            }
        };

        //查询产品内容
        vm.queryById(vm.descrid);

        //查询产品下得所有内容集合
        vm.queryByProductId(vm.productid);
    }).controller("editProductClassifiesController", function ($routeParams, $location, ProductClassifiesForm, AddOrUpdateProductClassify, QueryProductClassifyInfo, QueryProductClassifyByProductid, Notification, nptSessionManager) {
        var vm = this;

        //记录产品id
        vm.productid = $routeParams.productid;
        vm.addProductClassify = AddOrUpdateProductClassify;
        vm.productClassifyInfo = QueryProductClassifyInfo;
        vm.productClassifyByProductid = QueryProductClassifyByProductid;
        vm.cityid = $routeParams.cityid;

        if ($routeParams.classifiesid) {
            vm.classifiesid = $routeParams.classifiesid;
        } else {
            vm.classifiesid = undefined;
        }

        //数据模型
        vm.model = {
            cityid: vm.cityid,
            productid: vm.productid,
            packagetype: "normal",
            classifyno: "3",
            createby: nptSessionManager.getSession().getUser().id
        };

        //记录原始数据
        vm.originModel = angular.copy(vm.model);

        function save() {
            vm.addProductClassify.post(vm.model)
                .then(function (response) {
                    Notification.success({
                        message: "保存产品分类成功!",
                        delay: 2000
                    });
                    vm.originModel = angular.copy(response.data);
                    vm.model = angular.copy(response.data);
                    $location.path("/edit/classifies/" + vm.productid + "/" + response.data.id);
                }, function () {
                    Notification.error({
                        title: "添加产品分类出错,请稍后尝试.",
                        message: error.data.cause,
                        delay: 2000
                    });
                });
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
                vm.productClassifyInfo.post(
                    {classifyid: id}
                ).then(function (response) {
                        vm.originModel = angular.copy(response.data);
                        vm.model = angular.copy(response.data);
                    }, function () {
                        Notification.error({
                            title: "查询产品详情出错,请稍后尝试.",
                            message: error.data.cause,
                            delay: 2000
                        });
                    });
            }
        };

        //通过产品ID查询
        vm.queryByProductId = function (productid) {
            if (productid) {
                vm.productClassifyByProductid.post({
                    productid: vm.productid
                }).then(function (response) {
                }, function () {
                    Notification.error({
                        title: "查找产品分类列表出错,请稍后尝试.",
                        message: error.data.cause,
                        delay: 2000
                    });
                });
            }
        };

        //转到下一单
        vm.next = function (classify) {
            var nextClassify = vm.productClassifyByProductid.next(classify);
            if (nextClassify) {
                $location.path("/edit/classifies/" + vm.productid + "/" + nextClassify.id);
            }
        };

        //转到上一单
        vm.previous = function (classify) {
            var previousClassify = vm.productClassifyByProductid.previous(classify);
            if (previousClassify) {
                $location.path("/edit/classifies/" + vm.productid + "/" + previousClassify.id);
            }
        };

        //查询产品内容
        vm.queryById(vm.classifiesid);

        //查询产品下得所有内容集合
        vm.queryByProductId(vm.productid);
    }).controller("editProductGroupController", function ($routeParams, $location, ProductGroupForm, AddOrUpdateProductGroup, QueryProductGroupInfo, QueryProductInfo, QueryProductGroupByProductid, Notification, nptSessionManager) {
        var vm = this;

        //记录产品id
        vm.productid = $routeParams.productid;
        //产品信息资源库
        vm.productInfo = QueryProductInfo;
        vm.addProductGroup = AddOrUpdateProductGroup;
        vm.productGroupInfo = QueryProductGroupInfo;
        vm.productGroupByProductid = QueryProductGroupByProductid;
        if ($routeParams.groupid) {
            vm.groupid = $routeParams.groupid;
        } else {
            vm.groupid = undefined;
        }

        //数据模型
        vm.model = {
            productid: vm.productid,
            createby: nptSessionManager.getSession().getUser().id,
            instid: nptSessionManager.getSession().getInst().id
        };

        //记录原始数据
        vm.originModel = angular.copy(vm.model);

        function save() {
            vm.addProductGroup.post(vm.model)
                .then(function (response) {
                    Notification.success({
                        message: "保存产品分组成功!",
                        delay: 2000
                    });
                    vm.originModel = angular.copy(response.data);
                    vm.model = angular.copy(response.data);
                    $location.path("/edit/group/" + vm.productid + "/" + response.data.id);
                }, function () {
                    Notification.error({
                        title: "添加产品分组出错,请稍后尝试.",
                        message: error.data.cause,
                        delay: 2000
                    });
                });
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
                vm.productGroupInfo.post(
                    {groupid: id}
                ).then(function (response) {
                        vm.originModel = angular.copy(response.data);
                        vm.model = angular.copy(response.data);
                    }, function () {
                        Notification.error({
                            title: "查询产品详情出错,请稍后尝试.",
                            message: error.data.cause,
                            delay: 2000
                        });
                    });
            }
        };

        //通过产品ID查询
        vm.queryByProductId = function (productid) {
            if (productid) {
                vm.productGroupByProductid.post({
                    productid: vm.productid
                }).then(function (response) {
                }, function () {
                    Notification.error({
                        title: "查找产品分组列表出错,请稍后尝试.",
                        message: error.data.cause,
                        delay: 2000
                    });
                });
            }
        };

        //转到下一单
        vm.next = function (group) {
            var nextGroup = vm.productGroupByProductid.next(group);
            if (nextGroup) {
                $location.path("/edit/group/" + vm.productid + "/" + nextGroup.id);
            }
        };

        //转到上一单
        vm.previous = function (group) {
            var previousGroup = vm.productGroupByProductid.previous(group);
            if (previousGroup) {
                $location.path("/edit/group/" + vm.productid + "/" + previousGroup.id);
            }
        };

        //查询产品内容
        vm.queryById(vm.groupid);

        //查询产品下得所有内容集合
        vm.queryByProductId(vm.productid);
    })
    .controller("editProductPhaseController", function ($routeParams, $location, ProductPhaseForm, AddOrUpdateProductPhase, QueryProductPhaseInfo, QueryProductPhaseByProductid, Notification, nptSessionManager) {
        var vm = this;

        //记录产品id
        vm.productid = $routeParams.productid;
        vm.addProductPhase = AddOrUpdateProductPhase;
        vm.productPhaseInfo = QueryProductPhaseInfo;
        vm.productPhaseByProductid = QueryProductPhaseByProductid;
        if ($routeParams.phaseid) {
            vm.phaseid = $routeParams.phaseid;
        } else {
            vm.phaseid = undefined;
        }

        //数据模型
        vm.model = {
            productid: vm.productid,
            createby: nptSessionManager.getSession().getUser().id
        };

        //记录原始数据
        vm.originModel = angular.copy(vm.model);

        function save() {
            vm.addProductPhase.post(vm.model)
                .then(function (response) {
                    Notification.success({
                        message: "保存产品阶段成功!",
                        delay: 2000
                    });
                    vm.originModel = angular.copy(response.data);
                    vm.model = angular.copy(response.data);
                    $location.path("/edit/phase/" + vm.productid + "/" + response.data.id);
                }, function () {
                    Notification.error({
                        title: "添加产品阶段出错,请稍后尝试.",
                        message: error.data.cause,
                        delay: 2000
                    });
                });
        }

        function reset() {
            vm.model = angular.copy(vm.originModel);
        }

        //配置表单
        vm.productPhaseFormOptions = {
            store: ProductPhaseForm,
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
                vm.productPhaseInfo.post(
                    {phaseid: id}
                ).then(function (response) {
                        vm.originModel = angular.copy(response.data);
                        vm.model = angular.copy(response.data);
                    }, function () {
                        Notification.error({
                            title: "查询产品详情出错,请稍后尝试.",
                            message: error.data.cause,
                            delay: 2000
                        });
                    });
            }
        };

        //通过产品ID查询
        vm.queryByProductId = function (productid) {
            if (productid) {
                vm.productPhaseByProductid.post({
                    productid: vm.productid
                }).then(function (response) {
                }, function () {
                    Notification.error({
                        title: "查找产品阶段列表出错,请稍后尝试.",
                        message: error.data.cause,
                        delay: 2000
                    });
                });
            }
        };
        //转到下一单
        vm.next = function (phase) {
            var nextPhase = vm.productPhaseByProductid.next(phase);
            if (nextPhase) {
                $location.path("/edit/phase/" + vm.productid + "/" + nextPhase.id);
            }
        };

        //转到上一单
        vm.previous = function (phase) {
            var previousPhase = vm.productPhaseByProductid.previous(phase);
            if (previousPhase) {
                $location.path("/edit/phase/" + vm.productid + "/" + previousPhase.id);
            }
        };
        //查询产品内容
        vm.queryById(vm.phaseid);

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


