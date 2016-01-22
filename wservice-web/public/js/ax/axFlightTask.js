/**
 * Created by leon on 15/12/17.
 */

angular.module("AXFlightTaskApp", ["ui.neptune", "AXFlightTaskApp.aXFlightTaskForm", "wservice.common", "ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider.when("/form/:code", {
            controller: "AXFlightTaskController as vm",
            templateUrl: "form.html",
            resolve: {
                sessionData: function (nptSession) {
                    return nptSession();
                }
            }
        }).when("/completeAirLine/:userid/:id/:code", {
            controller: "completeAirLineController as vm",
            templateUrl: "completeAirLine.html",
            resolve: {
                sessionData: function (nptSession) {
                    return nptSession();
                }
            }
        })
        .when("/error", {
            controller: "errorController as vm",
            templateUrl: "error.html"
        });

    }).factory("KitActionQuery", function (nptRepository) {
        return nptRepository("KitActionQuery");
    }).factory("QueryWorkorderInfo", function (nptRepository) {
        return nptRepository("queryWorkorderDetail");
    }).factory("StartFlightTask", function (nptRepository) {
        return nptRepository("StartFlightTask");
    }).factory("CompleteFlightTask", function (nptRepository) {
        return nptRepository("CompleteFlightTask");
    }).factory("QueryAirline", function (nptRepository) {
        return nptRepository("QueryAirline");
    }).factory("AddOrUpdateAirline", function (nptRepository) {
        return nptRepository("AddOrUpdateAirline");
    }).factory("AddOrUpdateAirlineLog", function (nptRepository) {
        return nptRepository("AddOrUpdateAirlineLog");
    }).factory("QueryFileByUserLevel", function (nptRepository, CurrentInst) {
        return nptRepository("QueryFile").params({
            "level": "user",
            "filetype": "doc"
        }).addRequestInterceptor(function(req){
            req.params.instid = CurrentInst.id;
            return req;
        });
    }).value("CurrentInst",{})
    .factory("OrgSelectTree", function (nptRepository,CurrentInst) {
        function builderOrgTreeNode(nodes, data) {
            if (data) {
                nodes.nodes = [];
                for (var i = 0; i < data.length; i++) {
                    var node = {
                        id: data[i].id,
                        title: data[i].name
                    };
                    builderOrgTreeNode(node, data[i].children);
                    nodes.nodes.push(node);
                }
            }
        }

        return nptRepository("queryOrgTree").addRequestInterceptor(function (request) {
            request.params.instid = CurrentInst.id;
            request.params.dimtype = "hr";
            return request;
        }).addResponseInterceptor(function (response) {
            var orgNodes = [{
                id: response.data.id,
                title: response.data.simplename
            }];
            builderOrgTreeNode(orgNodes[0], response.data.children);
            return orgNodes;
        });

    }).value("CurrentInst",{})
    .controller("AXFlightTaskController", function ($routeParams, $location,CurrentInst, KitActionQuery, QueryWorkorderInfo, QueryAirline, StartFlightTask, CompleteFlightTask,AddOrUpdateAirline, aXFlightTaskForm, nptSessionManager, Notification) {
        var vm = this;
        vm.code = $routeParams.code;
        //工单信息资源库
        vm.workorderInfo = QueryWorkorderInfo;
        vm.queryAirline = QueryAirline;
        vm.model = {workOrder: {state: ""}};
        vm.flight={};

        //表单配置
        vm.aXFlightTaskOptions = {
            store: aXFlightTaskForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
            }
        };

        if (vm.code) {
            KitActionQuery.post({
                code: vm.code
            }).then(function (response) {
                vm.params = angular.fromJson(response.data.params);
                vm.workorderid = vm.params.workorderid;
                vm.userid = vm.params.userid;
                vm.instid = vm.params.instid;
                CurrentInst.id = vm.params.instid;
                vm.query();
            }, function (error) {
                Notification.error({
                    title: "获取飞行计划出错.",
                    message: error.data.cause,
                    dealy: 5000
                });
                $location.path("/error");
            });
        }

        //查询任务
        vm.query = function () {

            if (vm.workorderid) {
                vm.workorderInfo.post({
                    workorderid: vm.workorderid
                }).then(function (response) {
                    vm.model = response.data;
                    vm.getFile(vm.model.orderAttachments);
                    if (vm.model && vm.model.workOrder.state != 'unstart')
                        vm.queryLine();
                }, function (error) {
                    Notification.error({
                        title: '获取飞行计划出错',
                        message: error.data.cause,
                        replaceMessage: true,
                        delay: 5000
                    });
                    $location.path("/error");
                });
            }
        };

        vm.queryLine = function () {
            vm.queryAirline.post({
                sourceid: vm.workorderid
            }).then(function (response) {
                vm.modelLine = response.data;
            }, function (error) {
                Notification.error({
                    title: '获取航线出错',
                    message: error.data.cause,
                    replaceMessage: true,
                    delay: 5000
                });
            });
        };

        vm.getFile = function (model) {
            if (model) {
                vm.temp = [];
                angular.forEach(model, function (value) {
                    vm.temp.push(value.inputvalue);
                });
                vm.flight.fileId=angular.copy(vm.temp);
            }
        };

        vm.startWorkorder = function () {
            var params = {};
            var workorderids = [];
            workorderids.push(vm.workorderid);
            vm.flight.workorderids = workorderids;
            vm.flight.createby=vm.userid;
            vm.flight.userid=vm.userid;
            delete vm.flight.fileId;
            StartFlightTask.post(vm.flight).then(function (response) {
                Notification.success({
                    message: '飞行计划开始成功',
                    replaceMessage: true,
                    delay: 2000
                });
                vm.query();
                vm.flight={};
            }, function (error) {
                Notification.error({
                    title: '飞行计划开始失败',
                    message: error.data.cause,
                    replaceMessage: true,
                    delay: 5000
                });
            });

        };

        vm.completeWorkorder = function () {
            if (vm.modelLine) {
                var a = false;
                angular.forEach(vm.modelLine, function (value) {
                    if (value.state === 'inservice') {
                        a = true;
                    }
                });
                if (a === true) {
                    Notification.error({
                        message: '航线没有全部完成，所以不可以完成任务！',
                        delay: 5000
                    });
                }
                else if(a===false){
                    if (vm.nptFormApi.form.$invalid) {
                        Notification.error({message: '请输入正确的飞行任务信息.', delay: 2000});
                    }
                    else {
                        var params = {};
                        var workorderids = [];

                        workorderids.push(vm.workorderid);
                        if (vm.flight.fileId) {
                            vm.flight.requirementId = "3";
                            vm.flight.attachmentValue = vm.flight.fileId[0];
                        }
                        delete vm.flight.fileId;
                        vm.flight.workorderids = workorderids;
                        vm.flight.createby=vm.userid;
                        vm.flight.userid=vm.userid;
                        vm.nptFormApi.form.$commitViewValue();
                        CompleteFlightTask.post(vm.flight).then(function (response) {
                            Notification.success({
                                message: '完成飞行计划成功',
                                replaceMessage: true,
                                delay: 2000
                            });
                            vm.query();
                            vm.flight={};
                        }, function (error) {
                            Notification.error({
                                title: '完成飞行计划失败',
                                message: error.data.cause,
                                replaceMessage: true,
                                delay: 2000
                            });
                        });
                    }
                }
            }
            else {
                Notification.error({
                    message: '请先制定航线规划',
                    delay: 2000
                });
            }
        };


        vm.startAirLine = function (id) {
            AddOrUpdateAirline.post({id:id,state:"inservice"}).then(function (response) {
                Notification.success({
                    message: '飞行开始执行',
                    replaceMessage: true,
                    delay: 2000
                });
                angular.forEach(vm.modelLine, function (value) {
                    if (value.id === id) {
                        value.state='inservice';
                    }
                });
            }, function (error) {
                Notification.error({
                    title: '飞行开始执行失败',
                    message: error.data.cause,
                    replaceMessage: true,
                    delay: 5000
                });
            });
        };

        vm.completeAirLine=function(id)
        {
            $location.path("/completeAirLine/"+vm.userid+"/"+ id+"/"+vm.code);
        };

        vm.showStart = function () {
            if (vm.model && vm.model.workOrder.state === 'unstart') {
                return true;
            }
            return false;
        };

        vm.showComplete = function () {
            if (vm.model && vm.model.workOrder.state === 'inservice') {
                return true;
            }
            return false;
        };

        vm.showAireLine = function () {
            if (vm.modelLine && vm.modelLine.length>0 ) {
                return true;
            }
            return false;
        };

        vm.unstartShow=function(state)
        {
            if (state==='unstart') {
                return true;
            }
            return false;
        };

        vm.inserviceShow=function(state)
        {
            if (state==='inservice') {
                return true;
            }
            return false;
        };
    }).controller("completeAirLineController", function ($routeParams, $location, aXAirLineLogForm, AddOrUpdateAirline,AddOrUpdateAirlineLog,nptSessionManager, Notification) {
        var vm = this;
        vm.userid = $routeParams.userid;
        vm.id = $routeParams.id;
        vm.code = $routeParams.code;
        vm.log={airlineid:vm.id,createby:vm.userid};
        //表单配置
        vm.aXAirLineLogOptions = {
            store: aXAirLineLogForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
            }
        };


        vm.completeAirLine = function () {
            AddOrUpdateAirline.post({id:vm.id,state:"complete"}).then(function (response) {
                Notification.success({
                    message: '完成飞行',
                    replaceMessage: true,
                    delay: 2000
                });
                vm.addAirLineLog();
            }, function (error) {
                Notification.error({
                    title: '完成飞行失败',
                    message: error.data.cause,
                    replaceMessage: true,
                    delay: 5000
                });
            });
        };

        vm.addAirLineLog = function () {
            AddOrUpdateAirlineLog.post(vm.log).then(function (response) {
                $location.path("/form/"+vm.code);
            }, function (error) {
                Notification.error({
                    title: '填写飞行日志失败',
                    message: error.data.cause,
                    replaceMessage: true,
                    delay: 5000
                });
            });
        };
    }).controller("errorController", function () {

    });
