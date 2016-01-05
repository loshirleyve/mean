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
            .when("/edit/:id", {
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
    .factory("UpdateContractState", function (nptRepository) {
        return nptRepository("updateContractState");
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
    .controller("addContractController", function($scope, $http, $routeParams,$location , AddContractForm, AddOrUpdateContract, Notification, nptSessionManager, QueryContractById){

        var vm = this;

        vm.editContractid = $routeParams.id;

        //合同信息资源库
        vm.contractInfo = QueryContractById;

        vm.contractid = {};
        vm.addContract = AddOrUpdateContract;

        //新增合同表单配置
        vm.addContractFormOptions = {
            store:AddContractForm,
            onRegisterApi: function(nptFormApi){
                vm.nptFormApi = nptFormApi;
            }
        };


        vm.reset  = function() {
            vm.contract = angular.copy(vm.backup);
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
                        "id":contractInfo.id,
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
                        "clause":contractInfo.clause,
                        "updateby":nptSessionManager.getSession().getUser().id,
                        "readstate":contractInfo.readstate,
                        "state":contractInfo.state,
                        //"bizContractAttachments":contractInfo.attachmentsn,
                        "createdate":contractInfo.createdate
                    } || {};

                vm.addContract.post(params)
                    .then(function(response){
                        contractid = response.data.id;
                        $location.path("/detail/" + contractid);
                        Notification.success({message: '新增/编辑合同成功!', delay: 2000});
                    }, function(err){
                        Notification.error({
                            title: "新增/编辑合同失败.",
                            message: err.data.cause, delay: 2000
                        });
                    });
            }
        };


        //查询合同
        vm.query = function () {

            if (vm.editContractid) {
                vm.contractInfo.post({
                    contractid: vm.editContractid
                }).then(function (response) {
                    vm.contract = response.data;
                    vm.contractAttachment = response.data.bizContractAttachments;
                    vm.backup = angular.copy(response.data);
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

        vm.query();
    })
    .controller("ContractDetailController", function ($scope, $location, $routeParams, nptSessionManager, Notification, QueryContractsByInstid, QueryContractById, nptMessageBox, UpdateContractState) {
        var vm = this;

        vm.contractid = $routeParams.id;

        //合同列表资源库
        vm.contractList = QueryContractsByInstid;

        //合同信息资源库
        vm.contractInfo = QueryContractById;

        vm.updateContractState = UpdateContractState;

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
                    vm.contractAttachment = response.data.bizContractAttachments;
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

        //合同送审标识
        vm.isShowSend = function() {
            return true;
        };

        //合同通过标识
        vm.isShowPass = function() {
            return true;
        };

        //合同作废标识
        vm.isShowCancle = function() {
            return true;
        };

        //合同作废标识
        vm.isShowSendBack = function() {
            return true;
        };

        //合同编辑标识
        vm.isShowEdit = function() {
            return true;
        };

        vm.query();

        //确认送审
        vm.isSend = function(contractid) {
            nptMessageBox.open({
                title:"提示",
                content: '确定将该合同送往审批?',
                showCancel: true,
                action: {
                    success: {
                        label: "确定",
                        listens: [function (modalResult) {
                            vm.send(contractid);
                        }]
                    }
                },
                modal:{
                    size:"sm"
                }
            });
        };

        //送审
        vm.send = function(contractid) {
            vm.updateContractState.post({
                "contractid":contractid,
                "state":"waitaudit",
                "userid":nptSessionManager.getSession().getUser().id
            }).then(function (response) {
                vm.query();

                Notification.success({
                    message: '送审合同成功',
                    replaceMessage: true,
                    delay: 5000
                });
            }, function (error) {
                Notification.error({
                    title: '送审合同失败',
                    message: error.data.cause,
                    replaceMessage: true,
                    delay: 5000
                });
            });
        };

        vm.isPass = function(contractid) {
            nptMessageBox.open({
                title:"提示",
                content: '确定审批通过该合同?',
                showCancel: true,
                action: {
                    success: {
                        label: "确定",
                        listens: [function (modalResult) {
                            vm.pass(contractid);
                        }]
                    }
                },
                modal:{
                    size:"sm"
                }
            });
        };

        //审批通过
        vm.pass = function(contractid) {
            vm.updateContractState.post({
                "contractid":contractid,
                "state":"audit",
                "userid":nptSessionManager.getSession().getUser().id
            }).then(function (response) {
                vm.query();

                Notification.success({
                    message: '审批合同成功',
                    replaceMessage: true,
                    delay: 5000
                });
            }, function (error) {
                Notification.error({
                    title: '审批合同失败',
                    message: error.data.cause,
                    replaceMessage: true,
                    delay: 5000
                });
            });
        };

        vm.isCancle = function(contractid) {
            nptMessageBox.open({
                title:"提示",
                content: '确定废除该合同?',
                showCancel: true,
                action: {
                    success: {
                        label: "确定",
                        listens: [function (modalResult) {
                            vm.cancle(contractid);
                        }]
                    }
                },
                modal:{
                    size:"sm"
                }
            });
        };

        //作废
        vm.cancle = function(contractid) {
            vm.updateContractState.post({
                "contractid":contractid,
                "state":"close",
                "userid":nptSessionManager.getSession().getUser().id
            }).then(function (response) {
                vm.query();

                Notification.success({
                    message: '作废合同成功',
                    replaceMessage: true,
                    delay: 5000
                });
            }, function (error) {
                Notification.error({
                    title: '作废合同失败',
                    message: error.data.cause,
                    replaceMessage: true,
                    delay: 5000
                });
            });
        };

        vm.isSendBack = function(contractid) {
            nptMessageBox.open({
                title:"提示",
                content: '确定驳回该合同?',
                showCancel: true,
                action: {
                    success: {
                        label: "确定",
                        listens: [function (modalResult) {
                            vm.sendBack(contractid);
                        }]
                    }
                },
                modal:{
                    size:"sm"
                }
            });
        };

        //作废
        vm.sendBack = function(contractid) {
            vm.updateContractState.post({
                "contractid":contractid,
                "state":"draft",
                "userid":nptSessionManager.getSession().getUser().id
            }).then(function (response) {
                vm.query();

                Notification.success({
                    message: '驳回合同成功',
                    replaceMessage: true,
                    delay: 5000
                });
            }, function (error) {
                Notification.error({
                    title: '驳回合同失败',
                    message: error.data.cause,
                    replaceMessage: true,
                    delay: 5000
                });
            });
        };


    });
