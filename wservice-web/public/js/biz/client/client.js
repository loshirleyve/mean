/**
 * Created by shirley on 15/11/3.
 */

angular.module("clientApp", ["ui.neptune", "clientApp.ClientListGrid","clientApp.clientForm", "wservice.common", "ngRoute"])
    .config(function ($routeProvider) {
        //注册客户路由
        $routeProvider
            .when("/detail/:id", {
                controller: "BizPageDetailController as vm",
                templateUrl: "detail.html",
                resolve:{
                    sessionData:function(nptSession){
                        return nptSession;
                    }
                }
            })
            .when("/detail", {
                controller: "BizPageDetailController as vm",
                templateUrl: "addClient.html",
                resolve:{
                    sessionData:function(nptSession){
                        return nptSession;
                    }
                }
            })
            .when("/addClient",{
                controller:"BizPageDetailController as vm",
                templateUrl: "addClient.html",
                resolve:{
                    sessionData:function(nptSession){
                        return nptSession;
                    }
                }
            })
            .when("/list", {
                controller: "BizPageListController as vm",
                templateUrl: "list.html",
                resolve:{
                    sessionData:function(nptSession){
                        return nptSession;
                    }
                }
            })
            .otherwise({
                redirectTo: "/list"
            });

    })
    .factory("QueryInstClients", function(nptRepository, nptSessionManager){
        return nptRepository("queryInstClients").params({
            instid: nptSessionManager.getSession().getInst().id,
            userid:nptSessionManager.getSession().getUser().id
        });
    })
    .factory("QueryInstClientById", function(nptRepository){
        return nptRepository("queryInstClientById");
    })
    /*.service("clientService", function ($http, $location, nptResource) {
        var self = this;

        *//**
         * 切换是否执行检查新订单
         *//*
        this.checkNew = {
            isCollapsed: false,
            toggle: function () {
                self.checkNew.isCollapsed = !self.checkNew.isCollapsed;
                if (self.checkNew.isCollapsed) {
                    self.checkNew.text = "停止检查";
                    if (self.query.isCollapsed) {
                        self.query.toggle();
                    }
                }
                else {
                    self.checkNew.text = "检查新订单";
                }
            }

        };

        this.query = {
            state: "all",
            data: [],
            isCollapsed: false,
            toggle: function() {
                self.query.isCollapsed = !self.query.isCollapsed;
                if (self.query.isCollapsed) {
                    self.query.text = "关闭查询";
                    if (self.checkNew.isCollapsed) {
                        self.checkNew.toggle();
                    }
                } else {
                    self.query.text = "打开查询";
                }
            },
            list: function (params, success, error) {
                //将按钮设置为查询中
                self.query.loading('loading');

                //总是加入当前用户以及机构作为查询参数
                params.instid = "10000001463017";
                params.userid = "10000001498059";

                nptResource
                    .post("queryInstClients", params, function (data) {
                        self.query.data = data;
                        self.query.loading('reset');
                        success(data);
                    }, function (data) {
                        self.query.loading('reset');
                        //TODO 弹出提示检索错误通知窗口
                        error(data);
                    });
            },
            id: function (id, success, error) {
                nptResource.post("queryInstClientById", {"instClient": id}, success, error);
            },
            defno:function(defno, success, error){
                nptResource.post("queryMdCtrlcode", {"defno":defno}, success, error);
            },
            mdInstScale:function(success, error){
                nptResource.post("queryMdInstScale", {}, success, error);
            },
            addOrUpdateInstClient:function(client, success, error){
                nptResource.post("addOrUpdateInstClients", client, function(data){
                    success(data);
                }, function(data){
                    //TODO 弹出提示检索错误通知窗口
                    error(data);
                });
            },
            loading: function (state) {
                $("#all").button(state);
            },
            nextId: function (id) {
                if (id && self.query.data.length > 0) {
                    for (var i = 0; i < self.query.data.length; i++) {
                        if (id === self.query.data[i].id && i + 1 < self.query.data.length) {
                            return self.query.data[i + 1].id;
                        }
                    }
                }
            },
            previousId: function (id) {
                if (id && self.query.data.length > 0) {
                    for (var i = 0; i < self.query.data.length; i++) {
                        if (id === self.query.data[i].id && i - 1 >= 0) {
                            return self.query.data[i - 1].id;
                        }
                    }
                }
            },
            next: function (clientid) {
                var newId = self.query.nextId(clientid);
                if (newId) {
                    $location.path("/detail/" + newId);
                }
            },
            previous: function (clientid) {
                var newId = self.query.previousId(clientid);
                if (newId) {
                    $location.path("/detail/" + newId);
                }
            },
            initInst:function(params, success, error){
                nptResource.post("instInit", params, function(data){
                    success(data);
                }, function(data) {
                    //TODO 弹出提示检索错误通知窗口
                    error(data);
                });
            }
        };

        this.mdControlCode = {
            defno:function(defno, success, error){
                nptResource.post("queryMdCtrlcode", {"defno":defno}, success, error);
            },
            mdInstScale:function(success, error){
                nptResource.post("queryMdInstScale", {}, success, error);
            },

            //查询客户行业的控制编码
            clientindustry:function(){
                clientService.mdControlCode.defno("clientindustry", function(data){
                    var clientindustry = data;
                    return self.mdControlCode.clientindustry;
                }, function(data){
                    //TODO 提示信息
                });
            },
            clienttype:function(){
                //查询客户类型的控制编码
                clientService.mdControlCode.defno("clienttype", function(data){
                    var clienttype = data;
                    return self.mdControlCode.clienttype;
                }, function(data){
                    //TODO 提示信息
                });
            },
            clientsource:function(){
                //查询客户来源的控制编码
                clientService.mdControlCode.defno("clientsource", function(data){
                    var clientsource = data;
                    return self.mdControlCode.clientsource;
                }, function(data){
                    //TODO 提示信息
                });
            },
            mdInstScaleId:function(){
                //查询客户规模的控制编码
                clientService.mdControlCode.mdInstScale(function(data){
                    var mdInstScaleId = data.bizMdInstScales;
                    return self.mdControlCode.mdInstScaleId;
                }, function(data){
                    //TODO 提示信息
                });
            },
            contactposition:function(){
                //查询客户职位的控制编码
                clientService.mdControlCode.defno("contactposition", function(data){
                    var contactposition = data;
                    return self.mdControlCode.contactposition;
                }, function(data){
                    //TODO 提示信息
                });
            }
        };


        //默认状态为关闭自定义查询
        this.query.toggle();
        //默认状态为启动检查新单据
        this.checkNew.toggle();
    })*/
    .controller("BizPageListController", function ($scope, $http, $location, QueryInstClients, ClientListGrid) {
        var vm = this;

        //客户列表数据库资源
        vm.clientList = QueryInstClients;

        vm.clientListGridOptions = {
           store:ClientListGrid,
            onRegisterApi:function(nptGridApi){
                vm.nptGridApi = nptGridApi;
            }
        };

        vm.clientAction = function(action, item, index){
            console.info(action);
            if(item && action.type === "view"){
                $location.path("/detail/" + item.id);
            }
        };

        /**
         * 根据状态查询当前用户的客户列表
         */
        vm.queryByState = function () {
            vm.state = QueryInstClients.post({
                state:state
            }).then(function(){
                vm.queryName = name;
            }, function(error){
                //TODO 弹出提示检索错误通知窗口
            });
        };

        //首先查询全部客户
        if (!QueryInstClients.data || QueryInstClients.data.length <= 0) {
            vm.queryByState("", '全部');
        }
    /*
        $scope.data = [];
        $scope.clientAction = function (type, item, index) {
            console.info(type);
            if (item && type === "view") {
                $location.path("/detail/" + item.id);
            }
            if(item && type == "initInst"){
                $scope.clientid = item.id;
                $scope.query = clientService.query;

                //查询客户信息
                clientService.query.id($scope.clientid, function (data) {
                    $scope.data = data || {client: {}};
                    var params = {};
                    params.companyName = data.fullname;
                    params.companyNo = data.sn;
                    params.companyScale = data.scaleid;
                    params.userNo = data.contactphone;
                    params.userName = data.contactman;
                    params.clientId = $scope.clientid;
                    params.simpleName = data.name;
                    $scope.initInst(params);
                }, function (data) {
                    //TODO 提示信息
                });
            }
        };

        //设置自定义查询以及检查新订单
        $scope.query = clientService.query;
        $scope.checkNew = clientService.checkNew;

        *//**
         * 根据状态查询当前用户的客户列表
         *//*
        $scope.queryByState = function () {
            clientService.query.list({}, function (data) {
                $scope.data = data;
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            });
        };

        //初始化机构
        $scope.initInst = function(clientInfo){
            clientService.query.initInst(clientInfo, function(data){
            }, function(data){
                //TODO 弹出错误通知窗口
            });
        };

        //首先查询全部客户
        if (clientService.query.data.length <= 0) {
            $scope.queryByState();
        } else {
            $scope.data = clientService.query.data;
        }

        $scope.clientSearch = function(){
            $("#clientSearch").on("shown.bs.modal", function(){
                //查询客户行业的控制编码
                clientService.query.defno("clientindustry", function(data){
                    $scope.clientindustry = data;
                    $scope.curClientindustry=data[0].no;
                }, function(data){
                    //TODO 提示信息
                });
                //查询客户类型的控制编码
                clientService.query.defno("clienttype", function(data){
                    $scope.clienttype = data;
                    $scope.curClienttype=data[0].no;
                }, function(data){
                    //TODO 提示信息
                });
                //查询客户级别的控制编码
                clientService.query.defno("clientlevel", function(data){
                    $scope.clientlevel = data;
                    $scope.curClientlevel=data[0].no;
                }, function(data){
                    //TODO 提示信息
                });
                //查询客户来源的控制编码
                clientService.query.defno("clientsource", function(data){
                    $scope.clientsource = data;
                    $scope.curClientsource=data[0].no;
                }, function(data){
                    //TODO 提示信息
                });
            });
        };

        $scope.clientSearchConfirm = function(){
            $("#clientSearch").on("hidden.bs.modal", function(data){
                var params={};
                params.contactman=$scope.contactman;
                params.fullname=$scope.fullname;
                if($scope.curClientindustry !== null){
                    params.industry=$scope.curClientindustry;
                }
                if($scope.curClienttype !== null){
                    params.type=$scope.curClienttype;
                }
                if($scope.curClientlevel !== null){
                    params.level=$scope.curClientlevel;
                }
                if($scope.curClientsource !== null){
                    params.source=$scope.curClientsource;
                }
                clientService.query.list(params, function (data) {
                    $scope.data={};
                    $scope.data = data;
                }, function (data) {
                    //TODO 弹出提示检索错误通知窗口
                });
            });
        };
        $scope.onAddClient = function(params, $q, nptResource){
            params.data.instid = "10000001463017";
            params.data.createby = "10000001498059";
            var deferd = $q.defer();
            nptResource
                .post("addOrUpdateInstClients", params.data, function (data) {
                    console.info("后台调用更成功.controller");
                    deferd.resolve("添加成功");
                }, function (data) {
                    deferd.reject("不能在第一行上添加.");
                });
            return deferd.promise;
        };*/
    })

    .controller("BizPageDetailController", function ($scope, $location, $routeParams, ClientForm, QueryInstClients, QueryInstClientById) {
        var vm = this;

        //客户列表数据库
        vm.clientList = QueryInstClients;
        //客户信息资源库
        vm.clientInfo = QueryInstClientById;
        //数据模型
        vm.model = {};

        //表单配置
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

        //查询客户
        vm.query = function(){
            var id = $routeParams.id;
            if(id){
                vm.clientInfo.post({
                    clientid: id
                }).then(function(response){
                    vm.model = response.data;
                }, function(error){
                    var de = error;
                });
            }
        };

        //初始化查询
        vm.query();


        /*$scope.clientid = $routeParams.id;

        $scope.query = clientService.query;

        $scope.confirm = function(){
            $location.path("/detail/" + $scope.clientid);
        };

        $scope.addClient = function () {
            $location.path("/addClient/" + $scope.clientid);
        };

        //查询客户信息
        clientService.query.id($scope.clientid, function (data) {
            $scope.data = data || {client: {}};
        }, function (data) {
            //TODO 提示信息
        });

        //添加或更新客户
        $scope.addOrUpdateClientconfirm = function(){
            var params={};
            params.instid = "10000001463017";
            params.sn = $scope.add.sn;
            params.name = $scope.add.name;
            params.fullname = $scope.add.fullname;
            params.type = $scope.data.type;
            params.level = $scope.data.level;
            params.contactman = $scope.add.contactman;
            params.contactphone = $scope.add.contactphone;
            params.region = $scope.add.region;
            params.source = $scope.data.source;
            params.industry = $scope.data.industry;
            params.contactposition = $scope.data.contactposition;
            params.createby ="10000001498059";
            params.scaleid = $scope.data.scaleid.type;
            clientService.query.addOrUpdateInstClient(params, function(data){
            }, function(data){
                //TODO 弹出提示检索错误通知窗口
            });
        };

        //编辑客户信息
        $scope.editClientConfirm = function(){
            var params={};
            params.id = $scope.data.id;
            params.instid = "10000001463017";
            params.sn = $scope.data.sn;
            params.name = $scope.data.name;
            params.fullname = $scope.data.fullname;
            params.type = $scope.data.type;
            params.level = $scope.data.level;
            params.contactman = $scope.data.contactman;
            params.contactphone = $scope.data.contactphone;
            params.region = $scope.data.region;
            params.source = $scope.data.source;
            params.industry = $scope.data.industry;
            params.contactposition = $scope.data.contactposition;
            params.createby ="10000001498059";
            params.scaleid = $scope.data.scaleid;
            clientService.query.addOrUpdateInstClient(params, function(data){
            }, function(data){
                //TODO 弹出提示检索错误通知窗口
            });
        };

        //查询客户行业的控制编码
        clientService.query.defno("clientindustry", function(data){
            $scope.clientindustry = data;
        }, function(data){
           //TODO 提示信息
        });
        //查询客户类型的控制编码
        clientService.query.defno("clienttype", function(data){
            $scope.clienttype = data;
        }, function(data){
           //TODO 提示信息
        });
        //查询客户级别的控制编码
        clientService.query.defno("clientlevel", function(data){
            $scope.clientlevel = data;
        }, function(data){
           //TODO 提示信息
        });
        //查询客户来源的控制编码
        clientService.query.defno("clientsource", function(data){
            $scope.clientsource = data;
        }, function(data){
           //TODO 提示信息
        });
        //查询客户规模的控制编码
        clientService.query.mdInstScale(function(data){
            $scope.mdInstScaleId = data.bizMdInstScales;
        }, function(data){
            //TODO 提示信息
        });
        //查询客户职位的控制编码
        clientService.query.defno("contactposition", function(data){
            $scope.contactposition = data;
        }, function(data){
           //TODO 提示信息
        });*/
    });
