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
    .service("InstClientsQueryService", function(Notification, QueryInstClients){
        var self = this;
        self.searchModel = {};
        //客户列表数据库资源
        self.clientList = QueryInstClients;

        //查询当前用户的客户列表
        self.query = function (name,params) {
            params = params || {};
            self.clientList.post(params).then(function(){
                //在服务查询完毕，且将查询到的数据返回给界面之前将queryName设置为name的值
                self.queryName = name;
            }, function(error){
                Notification.error({message: '查询客户列表失败.', delay: 2000});
            });
        };

        //根据条件查询当前用户的客户列表
        self.clientSearchConfirm = function (name, params) {
            params = params || {};
            if(!params.contactman){
                delete params.contactman;
            }
            if(!params.fullname){
                delete params.fullname;
            }
            self.clientList.post(params).then(function(){
                self.queryName = name;
            }, function(error){
                Notification.error({message: '查询客户列表失败.', delay: 2000});
            });
        };

        //首先查询全部客户
        if (!QueryInstClients.data || QueryInstClients.data.length <= 0) {
            self.query('全部');
        }
    })
    .controller("ClientListController", function ($scope, $http, $location, QueryInstClients, ClientListGrid, ClientSearchForm, InstClientsQueryService, nptCache) {
        var vm = this;
        vm.queryService = InstClientsQueryService;

        vm.clientListGridOptions = {
           store:ClientListGrid,
            onRegisterApi:function(nptGridApi){
                vm.nptGridApi = nptGridApi;
            }
        };

        //客户条件查询表单配置
        vm.clientSearchFormOptions = {
            store:ClientSearchForm,
            onRegisterApi: function(nptFormApi){
                vm.nptClientFormApi = nptFormApi;
            }
        };
    })

    .controller("ClientDetailController", function ($scope, $location, $routeParams, ClientForm, QueryInstClients, QueryInstClientById, AddOrUpdateInstClients, InstInit, Notification, $route, QueryInstClientInfoById, nptCache) {
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
        vm.model.clientBackup = {};
        vm.clientDeUser = QueryInstClientInfoById;
        vm.clientUsersModel = {};
        vm.clientUsersCacheModel = {};

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

        //跳转到客户列表界面
        vm.goToList = function(){
            $location.path("/list/");
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
                        Notification.error({message: '初始化机构失败.' + err.data.cause, delay: 2000});
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
                }, function(error){
                    Notification.error({message: '查询客户信息失败.', delay: 2000});
                });
            }
        };

        vm.reset = function () {
            vm.query();
        };

        $('#clientAdviserModal').on('show.bs.modal', function($modelValue){
            var param = {"instClient":vm.clientid} || {};
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
        //更新客户信息
        vm.updateSave = function(clientInfo){
            if (clientInfo && !vm.nptFormApi.form.$invalid){
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
                };

                vm.updateClient.post(updateParams)
                    .then(function(response){
                    Notification.success({message: '更新客户信息成功!', delay: 2000});
                }, function(error){
                    Notification.error({message: '更新客户信息失败.', delay: 2000});
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

        //跳转到客户列表界面
        vm.goToList = function(){
          $location.path("/list/");
        };

        //新增客户
        vm.addClientSave = function(clientInfo){
            if (clientInfo && !vm.nptFormApi.form.$invalid){
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
                };

                vm.addClient.post(params)
                    .then(function(response){
                        clientid = response.data.id;
                        $location.path("/detail/" + clientid);
                        Notification.success({message: '新增客户成功!', delay: 2000});
                    }, function(error){
                        var de = error;
                        Notification.error({message: '新增客户失败.', delay: 2000});
                    });
            }
        };
    });
