/**
 * Created by shirley on 15/11/3.
 */

angular.module("clientApp", ["ui.neptune", "clientApp.ClientListGrid","clientApp.clientForm", "clientApp.clientSearchForm", "clientApp.addClientForm", "wservice.common", "ngRoute", "ui-notification"])
    .config(function ($routeProvider) {
        //注册客户路由
        $routeProvider
            .when("/detail/:id", {
                controller: "ClientDetailController as vm",
                templateUrl: "detail.html",
                resolve:{
                    sessionData:function(nptSession){
                        return nptSession();
                    }
                }
            })
            .when("/addClient", {
                controller:"AddClientController as vm",
                templateUrl:"addClient.html",
                resolve:{
                    sessionData:function(nptSession){
                        return nptSession();
                    }
                }
            })
            .when("/list", {
                controller: "ClientListController as vm",
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
    .factory("QueryInstClients", function (nptRepository,nptSessionManager) {
        return nptRepository("queryInstClients").params({
            "userid":nptSessionManager.getSession().getUser().id,
            "instid":nptSessionManager.getSession().getInst().id
        });
    })
    .factory("QueryInstClientById", function(nptRepository){
        return nptRepository("queryInstClientById");
    })
    .factory("AddOrUpdateInstClients", function(nptRepository,nptSessionManager){
        return nptRepository("addOrUpdateInstClients").params({
            "instid":nptSessionManager.getSession().getInst().id
        });
    })
    .factory("InstInit", function(nptRepository){
        return nptRepository("instInit");
    })
    .factory("QueryInstClientInfoById", function(nptRepository){
        return nptRepository("queryInstClientInfoById");
    })
    .service("InstClientsQueryService", function(Notification, QueryInstClients,QueryCtrlCode, $uibModal){
        var self = this;

        //客户列表数据库资源
        self.clientList = QueryInstClients;
        //self.clientList.refresh();
        //查询当前用户的客户列表
        self.query = function (params) {
            params = params || {};
            self.clientList.post(params).then(function(response){
            }, function(error){
                Notification.error({
                    title: "查询客户列表失败.",
                    message: error.data.cause, delay: 2000
                });
            });
        };

        //建立待查询列表
        self.queryList = [{
            label: "全部",
            callback: function () {
                self.query();
            }
        },{
            label: "条件查询",
            callback: function () {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'query.html',
                    controller: 'clientListQueryController',
                    controllerAs: 'vm'
                }).result.then(function (response) {
                        //查询
                        params = response || {};
                        self.query(params);
                    }, function () {
                        //用户关闭

                    });
            }
        }];

        function queryByLevel(queryType){
           return function(){
               self.query({
                   level:queryType.no
               });
           };
        }

        //查询控制编码
        QueryCtrlCode.post({"defno":"clientlevel"}).then(function(response){
            angular.forEach(response.data,function(value){
                self.queryList.push({
                    label: value.no +"等级",
                    callback:queryByLevel(value)
                });
            });
        });

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
    .controller("clientListQueryController", function ($uibModalInstance, ClientSearchForm) {
        var vm = this;

        vm.searchModel = {};

        //客户条件查询表单配置
        vm.clientSearchFormOptions = {
            store:ClientSearchForm,
            onRegisterApi: function(nptFormApi){
                vm.nptClientFormApi = nptFormApi;
            }
        };

        vm.ok = function () {
            $uibModalInstance.close(vm.searchModel);
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("ClientListController", function ($scope, $http, $location, QueryInstClients, ClientListGrid, InstClientsQueryService) {
        var vm = this;
        vm.queryService = InstClientsQueryService;

        vm.clientListGridOptions = {
           store:ClientListGrid,
            onRegisterApi:function(nptGridApi){
                vm.nptGridApi = nptGridApi;
            }
        };
    })

    .controller("ClientDetailController", function ($scope, $location, $routeParams, ClientForm, QueryInstClients, QueryInstClientById, AddOrUpdateInstClients, InstInit, Notification, $route, QueryInstClientInfoById, $uibModal) {
        var vm = this;
        vm.clientid = $routeParams.id;

        //客户列表数据库
        vm.clientList = QueryInstClients;
        //客户信息资源库
        vm.clientInfo = QueryInstClientById;
        //更新客户信息资源库
        vm.updateClient = AddOrUpdateInstClients;
        //初始化机构信息资源库
        vm.instInit = InstInit;
        //数据模型
        vm.model = {};

        //客户详情表单配置
        vm.clientFormOptions = {
            store:angular.copy(ClientForm),
            onRegisterApi: function(nptFormApi){
                vm.nptFormApi = nptFormApi;
            }
        };

        //跳转到新增客户界面
        vm.goToAddClient = function(){
            $location.path("/addClient/");
        };

        //转到下一个客户
        vm.next = function(client){
            var nextClient = vm.clientList.next(client);
            if(nextClient){
                $location.path("/detail/" + nextClient.id);
            }
        };

        //转到上一个客户
        vm.previous = function(client){
            var previousClient = vm.clientList.previous(client);
            if(previousClient){
                $location.path("/detail/" + previousClient.id);
            }
        };

        //检查客户是否已经初始化机构
        vm.isInitInst = function(){
            if (vm.clientInfo.data && !vm.clientInfo.data.clientinstid && !vm.clientInfo.data.clientadminid){
                return true;
            }
        };

        //初始化客户机构
        vm.initClientInst = function(clientInfo){
            //调用初始化客户服务
            if (clientInfo && vm.isInitInst){

                var params = {
                    "companyName":clientInfo.fullname,
                    "simpleName":clientInfo.name,
                    "companyNo":clientInfo.sn,
                    "companyScale":clientInfo.scaleid,
                    "userNo":clientInfo.contactphone,
                    "userName":clientInfo.contactman,
                    "clientId":clientInfo.id
                };

                vm.instInit.post(params)
                    .then(function(response){
                        Notification.success({message: '初始化机构成功!', delay: 2000});
                        $route.reload();
                    }, function(err){
                        Notification.error({
                            title: "初始化机构失败.",
                            message: err.data.cause, delay: 2000
                        });
                    });
            }
        };

        //查询客户
        vm.query = function(){
            if(vm.clientid){
                vm.clientInfo.post({
                    instClient:vm.clientid
                }).then(function(response){
                    vm.model.client = response.data;
                    vm.backup = angular.copy(response.data);
                }, function(err){
                    Notification.error({
                        title: "查询客户信息失败.",
                        message: err.data.cause, delay: 2000
                    });
                });
            }
        };

        vm.reset = function () {
            vm.model.client=angular.copy(vm.backup);
        };

        vm.clientAdviser = function(){
            $uibModal.open({
                animation: true,
                templateUrl: 'clientAdviser.html',
                controller: 'clientAdviserController',
                controllerAs: 'vm',
                resolve:{
                    ClientId:function(){
                        return vm.clientid;
                    }
                }
            }).result.then(function (response) {
                    //查询
                }, function () {
                    //用户关闭

                });
        };

        //更新客户信息
        vm.updateSave = function(clientInfo){
            vm.nptFormApi.form.$commitViewValue();
            if (vm.nptFormApi.form.$invalid) {
                var errorText = "";
                angular.forEach(vm.nptFormApi.getErrorMessages(), function (value) {
                    errorText = errorText + value + "</br>";
                });

                Notification.error({
                    title: "请正确输入修改的客户信息",
                    message: errorText, delay: 2000
                });

            }else{
                var updateParams = {
                    "id":clientInfo.id,
                    "sn":clientInfo.sn,
                    "fullname":clientInfo.fullname,
                    "name":clientInfo.name,
                    "type":clientInfo.type,
                    "industry":clientInfo.industry,
                    "scaleid":clientInfo.scaleid,
                    "source":clientInfo.source,
                    "region":clientInfo.region,
                    "address":clientInfo.address,
                    "contactman":clientInfo.contactman,
                    "contactphone":clientInfo.contactphone,
                    "contactposition":clientInfo.contactposition,
                    "level":clientInfo.level,
                    "remark":clientInfo.remark
                } || {};

                vm.updateClient.post(updateParams)
                    .then(function(response){
                        Notification.success({message: '更新客户信息成功!', delay: 2000});
                    }, function(err){
                        Notification.error({
                            title: "更新客户信息失败.",
                            message: err.data.cause, delay: 2000
                        });
                    });
            }
        };

        //初始化查询
        vm.query();
    })

    .controller("AddClientController", function($scope, $location, $routeParams, AddClientForm, AddOrUpdateInstClients, nptSessionManager, Notification){
        var vm = this;
        vm.clientid = {};
        vm.model = {"industry":"smallent","type":"ent","level":"A","source":"network","scaleid":"small","contactposition":"legal"};
        vm.addClient = AddOrUpdateInstClients;

        //新增客户表单配置
        vm.addClientFormOptions = {
            store:AddClientForm,
            onRegisterApi: function(nptFormApi){
                vm.nptFormApi = nptFormApi;
            }
        };

        vm.reset = function () {
            vm.nptFormApi.reset();
        };

        //新增客户
        vm.addClientSave = function(clientInfo){
            vm.nptFormApi.form.$commitViewValue();
            if(vm.nptFormApi.form.$invalid){
                var errorText = "";
                angular.forEach(vm.nptFormApi.getErrorMessages(), function(value){
                    errorText = errorText + value + "</br>";
                });
                Notification.error({
                    title:"请输入正确的新增客户信息",
                    message: errorText, delay:2000
                })
            }else{
                var params = {
                    "createby":nptSessionManager.getSession().getUser().id,
                    "sn":clientInfo.sn,
                    "fullname":clientInfo.fullname,
                    "name":clientInfo.name,
                    "type":clientInfo.type,
                    "industry":clientInfo.industry,
                    "scaleid":clientInfo.scaleid,
                    "source":clientInfo.source,
                    "region":clientInfo.region,
                    "address":clientInfo.address,
                    "contactman":clientInfo.contactman,
                    "contactphone":clientInfo.contactphone,
                    "contactposition":clientInfo.contactposition,
                    "level":clientInfo.level,
                    "remark":clientInfo.remark
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
    })
    .controller("clientAdviserController", function($uibModalInstance, ClientId, QueryInstClientInfoById){
        var vm = this;
        vm.clientDeUser = QueryInstClientInfoById;

        vm.cancel = function(){
            $uibModalInstance.dismiss('cancel');
        };

        var param = {"instClient":ClientId} || {};
        vm.clientDeUser.post(param)
            .then(function(response){
                vm.clientUsersIRN = [];
                for(var i=0; i<response.data.clientUsers.length; i++){
                    for(var key in response.cache.user){
                        if(response.cache.user[key].id == response.data.clientUsers[i].userid){
                            var aClientUser = {"userrole":response.data.clientUsers[i].userrole,
                                "username":response.cache.user[key].name};
                            vm.clientUsersIRN.push(aClientUser);
                        }
                    }
                }
            },function(){

            });
    });
