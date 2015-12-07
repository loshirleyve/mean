/**
 * Created by rxy on 15/11/3.
 */
angular.module("receivableApp", ["ui.neptune", "receivableApp.receivableListGrid", "receivableApp.receivableForm", "wservice.common", "ngRoute", "ui-notification"])
    .config(function ($routeProvider) {
        //注册产品路由
        $routeProvider
            .when("/list", {
                controller: "receivableListController as vm",
                templateUrl: "list.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/detail/:id", {
                controller: "receivableDetailController as vm",
                templateUrl: "detail.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/receivableConfirm/:id", {
                controller: "receivableConfirmController as vm",
                templateUrl: "receivableConfirm.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })

            .otherwise({
                redirectTo: "/list"
            });
    }).factory("QueryReceivableList", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryPayRegisters").params({
            instid: nptSessionManager.getSession().getInst().id,
            createby: nptSessionManager.getSession().getUser().id
        });
    }).factory("QueryPayRegisterInfo", function (nptRepository) {
        return nptRepository("QueryPayRegisterByid").params({
        });
    }).factory("UpdateByCollect", function (nptRepository) {
        return nptRepository("UpdateByCollect").params({
        });
    })
    .factory("QueryPayModeType", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryPayModeType").addRequestInterceptor(function (request) {
            request.params.instid = nptSessionManager.getSession().getInst().id;
            return request;
        });
    })
    .service("receivableListQueryService", function (Notification, QueryReceivableList,$uibModal) {
        var self = this;

        self.receivableList = QueryReceivableList;

        self.query = function (params) {
            params = params || {};
            self.receivableList.post(params).then(function (response) {
                console.info(response.data);
            }, function (error) {
                Notification.error({title: '查询收款数据出现错误,请稍后再试.',message: error.data.cause, delay: 2000});
            });
        };

        //建立待查询列表
        self.queryList = [
            {
                label: "全部",
                type: "all",
                callback: function () {
                    self.query();
                }
            },
            {
                label: "未收款",
                type: "0",
                callback: function () {
                    self.query({
                        complete: "0"
                    });
                }
            },
            {
                label: "已收款",
                type: "1",
                callback: function () {
                    self.query({
                        complete: "1"
                    });
                }
            },
            {
                label: "条件查询",
                callback: function () {
                    $uibModal.open({
                        animation: true,
                        templateUrl: 'query.html',
                        controller: 'receivableListQueryController',
                        controllerAs: 'vm'
                    }).result.then(function (response) {
                            //查询

                            var params=angular.copy(response);
                            if(params.complete=='no')
                                delete params.complete;
                            self.query(params);
                        }, function () {
                            //用户关闭
                        });
                }
            }
        ];

        //选择查询列表
        self.selectQuery = function (query) {
            if (query) {
                self.currQuery = query;
                if (query.callback) {
                    query.callback();
                }
            }
        };

        //选择一个默认查询
        self.selectQuery(self.queryList[0]);

    })
    .controller("receivableListController", function ($scope, $http, $location, receivableListGrid, receivableListQueryService) {
        var vm = this;

        vm.queryService = receivableListQueryService;

        vm.receivableListGridOptions = {
            store: receivableListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.nptGridApi = nptGridApi;
            }
        };


    }).controller("receivableListQueryController", function ($uibModalInstance,receivableSearchForm) {
        var vm = this;

        vm.receivableSearchFormOptions = {
            store: receivableSearchForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
            }
        };

        vm.model = {};

        vm.ok = function () {
            $uibModalInstance.close(vm.model);
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }).controller("receivableDetailController", function ($scope, $location, $routeParams, QueryReceivableList, QueryPayRegisterInfo) {

        var vm = this;
        vm.receivableId = $routeParams.id;
        vm.receivableList = QueryReceivableList;
        vm.receivableInfo = QueryPayRegisterInfo;
        //数据模型
        vm.model = {};
        vm.modelCollections = [];


        vm.query = function () {
            if (vm.receivableId) {
                vm.receivableInfo.post({
                    payRegisterId: vm.receivableId
                }).then(function (response) {
                    vm.model = response.data;
                    vm.modelCollections = response.data.payRegisterCollects;
                }, function (error) {
                    var de = error;
                });
            }
        };


        //当前单据是否能够确认
        vm.isComplete = function () {
            if (vm.receivableInfo.data && vm.receivableInfo.data.complete === 0) {
                return true;
            } else {
                return false;
            }
        };
        //转到下一单
        vm.next = function (receivable) {
            var nextReceivable = vm.receivableList.next(receivable);
            if (nextReceivable) {
                $location.path("/detail/" + nextReceivable.id);
            }
        };

        //转到上一单
        vm.previous = function (receivable) {
            var previousReceivable = vm.receivableList.previous(receivable);
            if (previousReceivable) {
                $location.path("/detail/" + previousReceivable.id);
            }
        };

        vm.query();
    })
    .controller("receivableConfirmController", function ($scope, $location, $routeParams, QueryPayRegisterInfo, UpdateByCollect, Notification, receivableForm, nptSessionManager) {

        var vm = this;
        vm.receivableId = $routeParams.id;
        //数据模型
        vm.model = {};
        vm.modelReceivable = {};
        vm.receivableInfo = QueryPayRegisterInfo;
        vm.updateByCollect = UpdateByCollect;
        vm.userid = nptSessionManager.getSession().getUser().id;
        vm.receivableConfirmFormOptions = {
            store: receivableForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;

            }
        };

        vm.query = function () {
            if (vm.receivableId) {
                vm.receivableInfo.post({
                    payRegisterId: vm.receivableId
                }).then(function (response) {
                    vm.modelReceivable = response.data;
                }, function (error) {
                    var de = error;
                });
            }
        };
        vm.query();

        vm.toDetail = function () {
            $location.path("/detail/" + vm.receivableId);
        };

        vm.receivableConfirm = function () {
            if (vm.nptFormApi.form.$invalid) {
                Notification.error({message: '请正确输入收款信息.', delay: 2000});
            } else {
                vm.model.payRegisterId = vm.receivableId;
                vm.model.createby = vm.userid;
                vm.model.payregisterid = vm.userid;
                vm.updateByCollect.post(vm.model).then(function (response) {
                    Notification.success({message: '确认收款成功!', delay: 2000});
                    vm.toDetail();
                }, function (error) {
                    Notification.error({title: '确认收款失败,发生服务器错误,请稍后重新尝试.', message: error.data.cause,delay: 2000});
                });
            }
        };
    });