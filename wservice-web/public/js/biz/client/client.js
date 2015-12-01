/**
 * Created by shirley on 15/11/3.
 */

angular.module("clientApp", ["ui.neptune", "clientApp.ClientListGrid","clientApp.clientForm", "clientApp.addClientForm", "wservice.common", "ngRoute"])
    .config(function ($routeProvider) {
        //注册客户路由
        $routeProvider
            .when("/detail/:id", {
                controller: "BizPageDetailController as vm",
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
                controller: "BizPageListController as vm",
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
    .controller("BizPageListController", function ($scope, $http, $location, QueryInstClients, ClientListGrid, ClientForm) {
        var vm = this;

        //客户列表数据库资源
        vm.clientList = QueryInstClients;

        vm.clientListGridOptions = {
           store:ClientListGrid,
            onRegisterApi:function(nptGridApi){
                vm.nptGridApi = nptGridApi;
            }
        };

        /**
         * 根据状态查询当前用户的客户列表
         */
        vm.query = function (name,params) {
            params = params || {};
            vm.state = QueryInstClients.post(params).then(function(){
                vm.queryName = name;
            }, function(error){
                //TODO 弹出提示检索错误通知窗口
            });
        };

        //首先查询全部客户
        if (!QueryInstClients.data || QueryInstClients.data.length <= 0) {
            vm.query('全部');
        }
    })

    .controller("BizPageDetailController", function ($scope, $location, $routeParams, ClientForm, QueryInstClients, QueryInstClientById, AddOrUpdateInstClients, InstInit) {
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
            store:ClientForm,
            onRegisterApi: function(nptFormApi){
                vm.nptFormApi = nptFormApi;
            }
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
        vm.initInst = function(clientInfo){
            //TODO 调用初始化客户服务
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

                InstInit.post(params)
                    .then(function(response){
                        alert("初始化机构成功！");
                        vm.query();
                    }, function(err){
                        alert("初始化机构失败！");
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
                    var de = error;
                });
            }
        };

        vm.reset = function () {
            vm.nptFormApi.reset();
        };

        //更新客户信息
        vm.updateClient = function(clientInfo){
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
                    "level":clientInfo.level
                };

                AddOrUpdateInstClients.post(updateParams)
                    .then(function(response){
                      alert("更新用户信息成功!");
                }, function(error){
                    var de = error;
                    alert("更新用户信息失败!");
                });
            }
        };

        //初始化查询
        vm.query();
    })

    .controller("AddClientController", function($scope, $location, $routeParams, AddClientForm, AddOrUpdateInstClients, nptSessionManager){
        var vm = this;
        vm.clientid = {};
        vm.model = {};
        vm.newClientInfo = AddOrUpdateInstClients;

        //新增客户表单配置
        vm.addClientFormOptions = {
            store:AddClientForm,
            onRegisterApi: function(nptFormApi){
                vm.nptFormApi = nptFormApi;
            }
        };

        vm.reset = function () {
            vm.nptFormApi.form.reset();
        };

        //新增客户
        vm.addClient = function(clientInfo){
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

                AddOrUpdateInstClients.post(params)
                    .then(function(response){
                        clientid = response.data.id;
                        $location.path("/detail/" + clientid);
                        alert("新增客户成功!");
                    }, function(error){
                        var de = error;
                        alert("新增客户失败!");
                    });
            }
        };
    });
