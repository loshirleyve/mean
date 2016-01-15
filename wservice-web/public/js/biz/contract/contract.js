/**
 * Created by shirley on 15/11/3.
 */

angular.module("contractApp", ["ui.neptune", "contractApp.ContractListGrid", "contractApp.addContractForm", "wservice.common", "ngRoute", "ui-notification"])
    .filter("percent",function() {
        return function(input) {
            var out;
            if(input) {
                out = (input*100)+"%";
            }
            return out
        };
    })
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
            }, function(error){
                Notification.error({
                    title: "查询合同列表失败.",
                    message: error.data.cause, delay: 2000
                });
            });
        };

        //建立待查询列表
        self.queryList = [{
            label: "全部",
            type: "all",
            callback: function () {
                self.query();
            }
        }, {
            label: "草稿",
            type: "draft",
            callback: function () {
                self.query({
                    state: "draft"
                });
            }
        }, {
            label: "待审核",
            type: "waitaudit",
            callback: function () {
                self.query({
                    state: "waitaudit"
                });
            }
        }, {
            label: "已审核",
            type: "audit",
            callback: function () {
                self.query({
                    state: "audit"
                });
            }
        }, {
            label: "作废",
            type: "close",
            callback: function () {
                self.query({
                    state: "close"
                });
            }
        }];

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
        self.selectQuery(self.queryList[1]);

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
                //构造附件参数
                var attachmentsnFiles = contractInfo.attachmentsnFiles;
                var attachmentsnImages = contractInfo.attachmentsnImages;
                var attachmentsns = [];
                var bizContractAttachments = [];

                if(attachmentsnFiles) {
                    attachmentsns = attachmentsns.concat(attachmentsnFiles);
                }

                if(attachmentsnImages) {
                    attachmentsns = attachmentsns.concat(attachmentsnImages);
                }

                if(attachmentsns) {
                    for(var i= 0;i<attachmentsns.length;i++) {
                        bizContractAttachments[i] = {
                            "attachmentsn":attachmentsns[i]
                        };
                    }
                }

                var params = {
                        "id":contractInfo.id,
                        //"createby":nptSessionManager.getSession().getUser().id,
                        "projectid":contractInfo.projectid,
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
                        "bizContractAttachments":bizContractAttachments,
                        "createdate":contractInfo.createdate
                    } || {};
                if(contractInfo.id) {
                    params.createby = contractInfo.createby;
                }else {
                    params.createby = nptSessionManager.getSession().getUser().id;
                }

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
                    //vm.contract.attachmentsns = ["10000001445004"];
                    vm.backup = angular.copy(response.data);
                }, function (error) {
                    Notification.error({
                        title: '查询合同详情失败',
                        message: error.data.cause,
                        replaceMessage: true,
                        delay: 5000
                    });
                });
            }else {
                vm.backup = [];
            }

        };

        vm.query();
    })
    .controller("ContractDetailController", function ($scope, $location, $routeParams, nptSessionManager, Notification, QueryContractsByInstid, QueryContractById, nptMessageBox, UpdateContractState,UserListBySelectTree, OrgListBySelectTree) {
        var vm = this;

        vm.contractid = $routeParams.id;

        //合同列表资源库
        vm.contractList = QueryContractsByInstid;

        //合同信息资源库
        vm.contractInfo = QueryContractById;

        vm.updateContractState = UpdateContractState;

        //数据模型
        vm.contractAttachment = [];
        vm.fileType = 'image';

        //转到下一单
        vm.next = function (contract) {
            var nextContract = vm.contractList.next(contract);
            if (nextContract) {
                $location.path("/detail/" + nextContract.id);
            }
        };

        //转到上一单
        vm.previous = function (contract) {
            var previousContract = vm.contractList.previous(contract);
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
                    vm.bizContractLogs = response.data.bizContractLogs;
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

            if(vm.contractInfo) {
                if (vm.contractInfo.data.state == "draft") {
                    return true;
                }
            }
            return false;
        };

        //合同通过标识
        vm.isShowPass = function() {
            if(vm.contractInfo) {
                if (vm.contractInfo.data.state == "waitaudit") {
                    return true;
                }
            }
            return false;
        };

        //合同作废标识
        vm.isShowCancle = function() {
            if(vm.contractInfo) {
                if (vm.contractInfo.data.state == "waitaudit" || vm.contractInfo.data.state == "draft") {
                    return true;
                }
            }
            return false;
        };

        //合同驳回
        vm.isShowSendBack = function() {
            if(vm.contractInfo) {
                if (vm.contractInfo.data.state == "waitaudit") {
                    return true;
                }
            }
            return false;
        };

        //合同编辑标识
        vm.isShowEdit = function() {
            if(vm.contractInfo) {
                if (vm.contractInfo.data.state == "draft") {
                    return true;
                }
            }
            return false;
        };

        vm.isNeedAtta = function() {
            if(vm.contractInfo) {
                if (vm.contractInfo.data) {
                    return false;
                }
            }
            return false;
        };

        vm.query();

        vm.name = "11";
        //确认送审
        vm.isSend = function(contractid) {
            var model = nptMessageBox.open({
                title:"提示",
                content: '<label>确定将该合同送往审批?</label>'+
                "<br/><label>附言:</label><input type='textarea' class='form-control' ng-model='$$ms.remark'>"+
                //"<br/><button class='btn btn-primary' type='button' ng-click='$$ms.show()'>选择用户</button>"+
                "<br/><div class='form-group'><label>目标用户:*</label><input class='form-control' ng-model='$$ms.name' ng-disabled='true'><span class='input-group-btn'><button class='btn btn-primary' type='button' ng-click='$$ms.show()'>选择用户</button></span></div>"+
                "<br/><div npt-select-tree='$$ms.selectTreeSetting'></div>",
                showCancel: true,
                scope:{
                    selectTreeSetting:{
                        onRegisterApi: function (selectTreeApi) {
                            vm.selectTreeApi = selectTreeApi;
                        },
                        treeRepository: OrgListBySelectTree,
                        listRepository: UserListBySelectTree
                    },
                    show : function () {
                        vm.selectTreeApi.open().then(function (data) {
                            //vm.name = data[0].name;
                            model.updateScope("name", data[0].name);
                            model.updateScope("dis", false);
                            model.updateScope("targetuserid" , data[0].id);
                        }, function () {
                        })
                    },
                    dis:true


                },
                action: {
                    success: {
                        label: "确定",
                        listens: [function (modalResult) {
                            vm.send(contractid, modalResult.scope.remark,modalResult.scope.targetuserid);

                        }],
                        ngDisabled:"$$ms.dis"
                    }
                }
            });
        };

        //送审
        vm.send = function(contractid, remark, targetuserid) {
            vm.updateContractState.post({
                "contractid":contractid,
                "state":"waitaudit",
                "userid":nptSessionManager.getSession().getUser().id,
                "remark":remark,
                "targetuserid":targetuserid
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
            var model = nptMessageBox.open({
                title:"提示",
                content: '<label>确定审批通过该合同?</label>'+
                "<br/><label>附言:</label><input type='textarea' class='form-control' ng-model='$$ms.remark'>"+
                    //"<br/><button class='btn btn-primary' type='button' ng-click='$$ms.show()'>选择用户</button>"+
                "<br/><div class='form-group'><label>目标用户:*</label><input class='form-control' ng-model='$$ms.name' ng-disabled='true'><span class='input-group-btn'><button class='btn btn-primary' type='button' ng-click='$$ms.show()'>选择用户</button></span></div>"+
                "<br/><div npt-select-tree='$$ms.selectTreeSetting'></div>",
                showCancel: true,
                scope:{
                    selectTreeSetting:{
                        onRegisterApi: function (selectTreeApi) {
                            vm.selectTreeApi = selectTreeApi;
                        },
                        treeRepository: OrgListBySelectTree,
                        listRepository: UserListBySelectTree
                    },
                    show : function () {
                        vm.selectTreeApi.open().then(function (data) {
                            //vm.name = data[0].name;
                            model.updateScope("name", data[0].name);
                            model.updateScope("dis", false);
                            model.updateScope("targetuserid" , data[0].id);
                        }, function () {
                        })
                    },
                    dis:true


                },
                action: {
                    success: {
                        label: "确定",
                        listens: [function (modalResult) {
                            vm.pass(contractid, modalResult.scope.remark,modalResult.scope.targetuserid);

                        }],
                        ngDisabled:"$$ms.dis"
                    }
                }
            });
        };

        //审批通过
        vm.pass = function(contractid, remark, targetuserid) {
            vm.updateContractState.post({
                "contractid":contractid,
                "state":"audit",
                "userid":nptSessionManager.getSession().getUser().id,
                "remark":remark,
                "targetuserid":targetuserid
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

            var model = nptMessageBox.open({
                title:"提示",
                content: '<label>确定废除该合同?</label>'+
                "<br/><label>附言:</label><input type='textarea' class='form-control' ng-model='$$ms.remark'>"+
                    //"<br/><button class='btn btn-primary' type='button' ng-click='$$ms.show()'>选择用户</button>"+
                "<br/><div class='form-group'><label>目标用户:</label><input class='form-control' ng-model='$$ms.name' ng-disabled='true'><span class='input-group-btn'><button class='btn btn-primary' type='button' ng-click='$$ms.show()'>选择用户</button></span></div>"+
                "<br/><div npt-select-tree='$$ms.selectTreeSetting'></div>",
                showCancel: true,
                scope:{
                    selectTreeSetting:{
                        onRegisterApi: function (selectTreeApi) {
                            vm.selectTreeApi = selectTreeApi;
                        },
                        treeRepository: OrgListBySelectTree,
                        listRepository: UserListBySelectTree
                    },
                    show : function () {
                        vm.selectTreeApi.open().then(function (data) {
                            model.updateScope("name", data[0].name);
                            model.updateScope("targetuserid" , data[0].id);
                        }, function () {
                        })
                    }


                },
                action: {
                    success: {
                        label: "确定",
                        listens: [function (modalResult) {
                            vm.cancle(contractid, modalResult.scope.remark,modalResult.scope.targetuserid);

                        }]
                    }
                }
            });
        };

        //作废
        vm.cancle = function(contractid, remark, targetuserid) {
            vm.updateContractState.post({
                "contractid":contractid,
                "state":"close",
                "userid":nptSessionManager.getSession().getUser().id,
                "remark":remark,
                "targetuserid":targetuserid
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

            var model = nptMessageBox.open({
                title:"提示",
                content: '<label>确定驳回该合同?</label>'+
                "<br/><label>附言:</label><input type='textarea' class='form-control' ng-model='$$ms.remark'>"+
                    //"<br/><button class='btn btn-primary' type='button' ng-click='$$ms.show()'>选择用户</button>"+
                "<br/><div class='form-group'><label>目标用户:*</label><input class='form-control' ng-model='$$ms.name' ng-disabled='true'><span class='input-group-btn'><button class='btn btn-primary' type='button' ng-click='$$ms.show()'>选择用户</button></span></div>"+
                "<br/><div npt-select-tree='$$ms.selectTreeSetting'></div>",
                showCancel: true,
                scope:{
                    selectTreeSetting:{
                        onRegisterApi: function (selectTreeApi) {
                            vm.selectTreeApi = selectTreeApi;
                        },
                        treeRepository: OrgListBySelectTree,
                        listRepository: UserListBySelectTree
                    },
                    show : function () {
                        vm.selectTreeApi.open().then(function (data) {
                            //vm.name = data[0].name;
                            model.updateScope("name", data[0].name);
                            model.updateScope("dis", false);
                            model.updateScope("targetuserid" , data[0].id);
                        }, function () {
                        })
                    },
                    dis:true


                },
                action: {
                    success: {
                        label: "确定",
                        listens: [function (modalResult) {
                            vm.sendBack(contractid, modalResult.scope.remark,modalResult.scope.targetuserid);

                        }],
                        ngDisabled:"$$ms.dis"
                    }
                }
            });
        };

        //作废
        vm.sendBack = function(contractid,remark, targetuserid) {
            vm.updateContractState.post({
                "contractid":contractid,
                "state":"draft",
                "userid":nptSessionManager.getSession().getUser().id,
                "remark":remark,
                "targetuserid":targetuserid
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

        vm.switch = function(fileType) {
            vm.fileType = fileType;
        };


    });
