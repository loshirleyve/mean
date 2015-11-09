/**
 * Created by shirley on 15/11/3.
 */

angular.module("clientApp", ["ui.neptune", "ngRoute"])
    .config(function ($routeProvider, DatatableStoreProvider) {
        //注册客户路由
        $routeProvider
            .when("/detail/:id", {
                controller: "BizPageDetailController",
                templateUrl: "detail.html"
            })
            .when("/detail", {
                //redirectTo: "/detail/add"
                controller: "BizPageDetailController",
                templateUrl: "addClient.html"
            })
            .when("/addClient",{
                controller:"BizPageDetailController",
                templateUrl: "addClient.html"
            })
            .when("/list", {
                controller: "BizPageListController",
                templateUrl: "list.html"
            })
            .otherwise({
                redirectTo: "/list"
            });

        DatatableStoreProvider.store("client", {
            "header": [
                {
                    "name": "name",
                    "label": "名称"
                },
                {
                    "name": "industry",
                    "label": "行业"
                },
                {
                    "name": "type",
                    "label": "类型"
                },
                {
                    "name": "level",
                    "label": "级别"
                },
                {
                    "name": "source",
                    "label": "来源"
                },
                {
                    "name": "contactman",
                    "label": "联系人"
                },
                {
                    "name": "contactphone",
                    "label": "电话"
                },
                {
                    "name": "createdate",
                    "label": "创建日期"
                }
            ],
            "action": [
                {
                    "name": "view",
                    "label": "查看",
                    "link": "#detail"
                }
            ]
        });

    })
    .service("clientService", function ($http, $location, nptResource) {
        var self = this;

        /**
         * 切换是否执行检查新订单
         */
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
                    self.checkNew.text = "检查新订单"
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
            }
            ,
            list: function (state, success, error) {
                //将按钮设置为查询中
                self.query.loading('loading');
                //如果当前查询状态不是全部类型则将状态作为参数传递到服务器查询
                var params = {};

                if (state !== "all") {
                    params["state"] = state;
                }

                //总是加入当前用户以及机构作为查询参数
                params["instid"] = "10000001463017";
                params["userid"] = "10000001498059";

                nptResource
                    .post("queryInstClients", params, function (data) {
                        self.query.data = data;
                        self.query.state = state;
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
               /* $("#waitconfirm").button(state);
                $("#inservice").button(state);
                $("#buy").button(state);*/
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

    }).
    controller("BizPageListController", function ($scope, $http, $location, clientService) {
        $scope.data = [];
        $scope.clientAction = function (type, item, index) {
            console.info(type);
            if (item && type === "view") {
                $location.path("/detail/" + item.id);
            }
        };

        //设置自定义查询以及检查新订单
        $scope.query = clientService.query;
        $scope.checkNew = clientService.checkNew;

        /**
         * 根据状态查询当前用户的客户列表
         */
        $scope.queryByState = function () {
            clientService.query.list($scope.query.state, function (data) {
                $scope.data = data;
            }, function (data) {
                //TODO 弹出提示检索错误通知窗口
            })
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
                    $scope.selected=$scope.clientindustry1[0].name;
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
            });
        };
    })
    .controller("BizPageDetailController", function ($scope, $location, $routeParams, clientService) {
        $scope.clientid = $routeParams.id;

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
            //console.info($scope.client);
            var params={};
            params["instid"] = "10000001463017";
            params["sn"] = $scope.add.name;
            params["name"] = $scope.add.name;
            params["fullname"] = $scope.add.fullname;
            params["type"] = $scope.data.type;
            params["level"] = $scope.data.level;
            params["contactman"] = $scope.add.contactman;
            params["contactphone"] = $scope.add.contactphone;
            params["region"] = $scope.add.region;
            params["source"] = $scope.data.source;
            params["industry"] = $scope.data.industry;
            params["contactposition"] = $scope.data.contactposition;
            params["createby"] ="10000001498059";
            params["scaleid"] = $scope.data.scaleid.type;
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
        });
    });
