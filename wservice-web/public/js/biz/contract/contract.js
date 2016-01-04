/**
 * Created by shirley on 15/11/3.
 */

angular.module("contractApp", ["ui.neptune", "contractApp.ContractListGrid", "contractApp.addContractForm", "wservice.common", "ngRoute", "ui-notification"])
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
            .when("/addContract", {
                controller: "addContractController as vm",
                templateUrl: "addContract.html",
                resolve:{
                    sessionData:function(nptSession){
                        return nptSession();
                    }
                }
            })
            .when("/detail/:id", {
                controller: "ContractDetailController as vm",
                templateUrl: "detail.html",
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
            "instid":nptSessionManager.getSession().getInst().id
        });
    })
    .factory("AddOrUpdateContract", function (nptRepository) {
        return nptRepository("addOrUpdateContract");
    })
    .factory("QueryContractById", function (nptRepository) {
        return nptRepository("queryContractById");
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

    })
    .controller("addContractController", function($scope, $http, $location, AddContractForm, AddOrUpdateContract, Notification, nptSessionManager){
        var vm = this;
        vm.contractid = {};
        vm.addContract = AddOrUpdateContract;

        //新增合同表单配置
        vm.addContractFormOptions = {
            store:AddContractForm,
            onRegisterApi: function(nptFormApi){
                vm.nptFormApi = nptFormApi;
            }
        };

        //新增合同
        vm.addContractSave = function(contractInfo){
            vm.nptFormApi.form.$commitViewValue();
            if(vm.nptFormApi.form.$invalid){
                var errorText = "";
                angular.forEach(vm.nptFormApi.getErrorMessages(), function(value){
                    errorText = errorText + value + "</br>";
                });
                Notification.error({
                    title:"请输入正确的新增合同信息",
                    message: errorText, delay:2000
                });
            }else{
                var params = {
                        "createby":nptSessionManager.getSession().getUser().id,
                        "projectid":"111111",
                        "instid":nptSessionManager.getSession().getInst().id,
                        "shoppename":contractInfo.shoppename,
                        "trademark":contractInfo.trademark,
                        "isbase":contractInfo.isbase,
                        "rent":contractInfo.rent,
                        "baseamount":contractInfo.baseamount,
                        "baserate":contractInfo.baserate,
                        "extralbaserate":contractInfo.extralbaserate,
                        "slottingfee":contractInfo.slottingfee,
                        "deposit":contractInfo.deposit,
                        "other":contractInfo.other,
                        "clause":contractInfo.clause
                    } || {};

                vm.addContract.post(params)
                    .then(function(response){
                        contractid = response.data.id;
                        $location.path("/detail/" + contractid);
                        Notification.success({message: '新增合同成功!', delay: 2000});
                    }, function(err){
                        Notification.error({
                            title: "新增合同失败.",
                            message: err.data.cause, delay: 2000
                        });
                    });
            }
        };
    })
    .controller("ContractDetailController", function ($scope, $location, $routeParams, nptSessionManager, Notification, QueryContractsByInstid, QueryContractById) {
        var vm = this;

        vm.contractid = $routeParams.id;

        //合同列表资源库
        vm.contractList = QueryContractsByInstid;

        //合同信息资源库
        vm.contractInfo = QueryContractById;

        //数据模型
        vm.contractAttachment = [];

        //转到下一单
        vm.next = function (contract) {
            var nextContract = vm.contractList.next(contract);
            if (nextContract) {
                $location.path("/detail/" + nextContract.id);
            }
        };

        //转到上一单
        vm.previous = function (contract) {
            var previousContract = vm.workorderList.previous(contract);
            if (previousContract) {
                $location.path("/detail/" + previousContract.id);
            }
        };

        //查询合同
        vm.query = function () {

            if (vm.contractid) {
                vm.contractInfo.post({
                    contractid: vm.contractid
                }).then(function (response) {
                    vm.modelAttachment = response.data.bizContractAttachments;
                }, function (error) {
                    Notification.error({
                        title: '查询合同详情失败',
                        message: error.data.cause,
                        replaceMessage: true,
                        delay: 5000
                    });
                });
            }

        };

        //工单开始标识
        vm.isUnstart = function() {

        };

        //工单开始标识
        vm.isInservice = function() {
        };

        //工单转交标识
        vm.isNotComplete = function() {
        };

        vm.query();

    });
