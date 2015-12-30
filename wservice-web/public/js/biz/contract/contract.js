/**
 * Created by shirley on 15/11/3.
 */

angular.module("contractApp", ["ui.neptune", "contractApp.ContractListGrid", "wservice.common", "ngRoute", "ui-notification"])
    .config(function ($routeProvider) {
        //注册客户路由
        $routeProvider
            .when("/list", {
                controller: "contractListController as vm",
                templateUrl: "list.html",
                resolve:{
                    sessionData:function(nptSession){
                        return nptSession();
                    }
                }
            })
            .when("/add", {
                controller: "contractListController as vm",
                templateUrl: "list.html",
                resolve:{
                    sessionData:function(nptSession){
                        return nptSession();
                    }
                }
            })
            .otherwise({
                redirectTo: "/list"
            });

    })
    .factory("QueryContractsByInstid", function (nptRepository,nptSessionManager) {
        return nptRepository("queryContractsByInstid").params({
            "userid":nptSessionManager.getSession().getUser().id,
            "instid":nptSessionManager.getSession().getInst().id,
            "projectid":"11111"
        });
    })
    .service("ContractListQueryService", function(Notification, QueryContractsByInstid,QueryCtrlCode, $uibModal){
        var self = this;

        //合同列表数据库资源
        self.contractList = QueryContractsByInstid;

        self.query = function (params) {
            params = params || {};
            self.contractList.post(params).then(function(response){
                self.contractList._lastParams = angular.copy(params);
            }, function(error){
                Notification.error({
                    title: "查询合同列表失败.",
                    message: error.data.cause, delay: 2000
                });
            });
        };

        self.query();
    })
    .controller("contractListController", function ($scope, $http, $location,ContractListQueryService, ContractListGrid) {
        var vm = this;

        vm.queryListService = ContractListQueryService;

        vm.contractListGridOptions = {
            store: ContractListGrid,
            onRegisterApi: function (nptGridApi) {
                vm.nptGridApi = nptGridApi;
            }
        };

    });
