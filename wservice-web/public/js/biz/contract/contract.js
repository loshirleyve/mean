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
    .factory("AddOrUpdateContract", function (nptRepository,nptSessionManager) {
        return nptRepository("addOrUpdateContract").params({
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

    })
    .controller("addContractController", function($scope, $http, $location, AddContractForm, AddOrUpdateContract){
        var vm = this;
        vm.clientid = {};
        vm.addClient = AddOrUpdateContract;

        //新增客户表单配置
        vm.addContractFormOptions = {
            store:AddContractForm,
            onRegisterApi: function(nptFormApi){
                vm.nptFormApi = nptFormApi;
            }
        };

        //新增客户
        vm.addClientSave = function(contractInfo){
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
                        "sn":contractInfo.sn,
                        "fullname":contractInfo.fullname,
                        "name":contractInfo.name,
                        "type":contractInfo.type,
                        "industry":contractInfo.industry,
                        "scaleid":contractInfo.scaleid,
                        "source":contractInfo.source,
                        "region":contractInfo.region,
                        "address":contractInfo.address,
                        "contactman":contractInfo.contactman,
                        "contactphone":contractInfo.contactphone,
                        "contactposition":contractInfo.contactposition,
                        "level":contractInfo.level,
                        "remark":contractInfo.remark
                    } || {};

                vm.addClient.post(params)
                    .then(function(response){
                        clientid = response.data.id;
                        $location.path("/detail/" + clientid);
                        Notification.success({message: '新增客户成功!', delay: 2000});
                    }, function(err){
                        Notification.error({
                            title: "新增客户失败.",
                            message: err.data.cause, delay: 2000
                        });
                    });
            }
        };
    });
