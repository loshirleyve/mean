/**
 * Created by leon on 15/12/17.
 */

angular.module("AXAirlinePlanTaskApp", ["ui.neptune", "AXAirlinePlanTaskApp.aXAirlinePlanTaskForm", "wservice.common", "ngRoute", "ui-notification"])
    .config(function ($routeProvider) {
        $routeProvider.when("/form/:code", {
            controller: "AXAirlinePlanTaskController as vm",
            templateUrl: "form.html",
            resolve: {
                sessionData: function (nptSession) {
                    return nptSession();
                }
            }
        }).when("/error", {
            controller: "errorController as vm",
            templateUrl: "error.html"
        }).otherwise({
            redirectTo: "/form/:code"
        });
    }).factory("KitActionQuery", function (nptRepository) {
        return nptRepository("KitActionQuery");
    }).factory("QueryWorkorderInfo", function (nptRepository) {
        return nptRepository("queryWorkorderDetail");
    }).factory("StartAirlinePlanTask", function (nptRepository) {
        return nptRepository("StartAirlinePlanTask");
    }).factory("CompleteAirlinePlanTask", function (nptRepository) {
        return nptRepository("CompleteAirlinePlanTask");
    }).factory("QueryAirline", function (nptRepository) {
        return nptRepository("QueryAirline");
    }).factory("QueryFileByUserLevel", function (nptRepository, CurrentInst) {
        return nptRepository("QueryFile").params({
            "level": "user",
            "filetype": "doc"
        }).addRequestInterceptor(function (req) {
            req.params.instid = CurrentInst.id;
            return req;
        });
    }).value("CurrentInst", {})
    .factory("AddOrUpdateFileRepo", function (nptRepository, CurrentInst,CurrentUser) {
        return nptRepository("AddOrUpdateFile").params({
        }).addRequestInterceptor(function (req) {
            req.params.instid = CurrentInst.id;
            req.params.createby = CurrentUser.id;
            return req;
        });
    }).value("CurrentUser", {})
    .controller("AXAirlinePlanTaskController", function ($routeParams, CurrentInst,CurrentUser, KitActionQuery, QueryWorkorderInfo, QueryAirline, StartAirlinePlanTask, CompleteAirlinePlanTask, aXAirlinePlanTaskForm, aXAirlinePlanTask2Form, nptSessionManager, Notification) {
        var vm = this;
        vm.code = $routeParams.code;
        //工单信息资源库
        vm.workorderInfo = QueryWorkorderInfo;
        vm.queryAirline = QueryAirline;
        //数据模型
        vm.model = {workOrder: {state: ""}};
        vm.airLinePlan = {};
        //表单配置
        vm.aXAirlinePlanTaskOptions = {
            store: aXAirlinePlanTaskForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
            }
        };

        //表单配置
        vm.aXAirlinePlanTask2Options = {
            store: aXAirlinePlanTask2Form,
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
                CurrentUser.id=vm.params.userid;
                CurrentInst.id = vm.params.instid;
                vm.query();
            }, function (error) {
                Notification.error({
                    title: "获取航线规划出错.",
                    message: error.data.cause,
                    dealy: 5000
                });
                $location.path("/error");
            });
        }

        //查询工单
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
                        title: '获取航线规划出错',
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
                vm.airLinePlan.fileId = angular.copy(vm.temp);
            }
        };

        vm.startWorkorder = function () {
            var workorderids = [];
            workorderids.push(vm.workorderid);
            delete vm.airLinePlan.fileId;
            delete vm.airLinePlan.attachmentValue;
            vm.airLinePlan.workorderids = workorderids;
            vm.airLinePlan.workorderids = workorderids;
            vm.airLinePlan.userid = vm.userid;
            StartAirlinePlanTask.post(vm.airLinePlan).then(function (response) {
                Notification.success({
                    message: '航线规划开始成功',
                    replaceMessage: true,
                    delay: 2000
                });
                vm.query();
                vm.airLinePlan = {};
            }, function (error) {
                Notification.error({
                    title: '航线规划开始失败',
                    message: error.data.cause,
                    replaceMessage: true,
                    delay: 5000
                });
            });

        };

        vm.completeWorkorder = function () {
            var workorderids = [];
            workorderids.push(vm.workorderid);
            if (vm.airLinePlan.fileId) {
                vm.airLinePlan.requirementId = "3";
                vm.airLinePlan.attachmentValue = vm.airLinePlan.fileId;
            }
            delete vm.airLinePlan.fileId;
            vm.airLinePlan.workorderids = workorderids;
            vm.airLinePlan.userid = vm.userid;
            CompleteAirlinePlanTask.post(vm.airLinePlan).then(function (response) {
                Notification.success({
                    message: '完成航线规划成功',
                    replaceMessage: true,
                    delay: 2000
                });
                vm.query();
                vm.airLinePlan = {};
            }, function (error) {
                Notification.error({
                    title: '完成航线规划失败',
                    message: error.data.cause,
                    replaceMessage: true,
                    delay: 5000
                });
            });
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
            if (vm.modelLine && vm.modelLine.length > 0) {
                return true;
            }
            return false;
        };

    }).controller("errorController", function () {

    });