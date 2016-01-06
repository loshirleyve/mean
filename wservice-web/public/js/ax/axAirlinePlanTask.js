/**
 * Created by leon on 15/12/17.
 */

angular.module("AXairlinePlanTaskApp", ["ui.neptune", "workorderApp.workorderForm", "wservice.common", "ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider.when("/form/:code", {
            controller: "AXairlinePlanTaskController as vm",
            templateUrl: "form.html",
            resolve: {
                sessionData: function (nptSession) {
                    return nptSession();
                }
            }
        });

    }).factory("KitActionQuery", function (nptRepository) {
        return nptRepository("KitActionQuery");
    }).factory("QueryWorkorderInfo", function (nptRepository) {
        return nptRepository("queryWorkorderDetail");
    }).factory("UpdateWorkOrderInserviceById", function (nptRepository) {
        return nptRepository("updateWorkOrderInserviceById");
    }).factory("UpdateWorkOrderCompleteById", function(nptRepository) {
        return nptRepository("updateWorkOrderCompleteById");
    }).factory("QueryAirline", function(nptRepository) {
        return nptRepository("QueryAirline");
    }).controller("AXairlinePlanTaskController", function ($routeParams,KitActionQuery, QueryWorkorderInfo,QueryAirline, UpdateWorkOrderInserviceById,UpdateWorkOrderCompleteById, StartWorkorderForm, nptSessionManager,Notification) {
        var vm = this;
        vm.code = $routeParams.code;
        vm.model={};
        //工单信息资源库
        vm.workorderInfo = QueryWorkorderInfo;
        vm.queryAirline=QueryAirline;
        //表单配置
        vm.startWorkorderOptions = {
            store: StartWorkorderForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
            }
        };

        if(vm.code)
        {
            KitActionQuery.post({
                code: vm.code
            }).then(function (response) {
                vm.params = angular.fromJson(response.data.params);
                vm.workorderid=vm.params.workorderid;
                vm.query();
                vm.queryLine();
            }, function (error) {
                Notification.error({
                    title: "获取工单id错误.",
                    message: error.data.cause,
                    dealy: 5000
                });
            });
        }

        //查询任务
        vm.query = function () {

            if (vm.workorderid) {
                vm.workorderInfo.post({
                    workorderid: vm.workorderid
                }).then(function (response) {
                    vm.model=response.data;
                }, function (error) {
                    Notification.error({
                        title: '查询飞行任务失败',
                        message: error.data.cause,
                        replaceMessage: true,
                        delay: 5000
                    });
                });
            }
        };

        vm.queryLine=function()
        {
            vm.queryAirline.post({
                sourceid: vm.workorderid
            }).then(function (response) {
                vm.modelLine=response.data;
            }, function (error) {
                Notification.error({
                    title: '查询飞行航线失败',
                    message: error.data.cause,
                    replaceMessage: true,
                    delay: 5000
                });
            });
        };

        vm.showStart=function()
        {
            if(vm.model && vm.model.workOrder.state==='unstart')
            {
                return true;
            }
            return false;
        };

        vm.showComplete=function()
        {
            if(vm.model && vm.model.workOrder.state==='inservice')
            {
                return true;
            }
            return false;
        };

        vm.show=function()
        {
            if(vm.model && vm.model.workOrder.state !='complete')
            {
                return true;
            }
            return false;
        };

        vm.startWorkorder = function () {

            var params = {};
            var workorderids = [];

            workorderids.push(vm.workorderid);

            params.postscript = vm.postscript;
            params.workorderids = workorderids;
            params.userid = nptSessionManager.getSession().getUser().id;

            UpdateWorkOrderInserviceById.post(params).then(function (response) {
                Notification.success({
                    message: '工单开始成功',
                    replaceMessage: true,
                    delay: 2000
                });
                vm.query();
            }, function (error) {
                Notification.error({
                    title: '工单开始失败',
                    message: error.data.cause,
                    replaceMessage: true,
                    delay: 5000
                });
            });

        };

        vm.completeWorkorder = function () {
            var a=false;
            if(vm.modelLine) {
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
                else {
                    var params = {};
                    var workorderids = [];

                    workorderids.push(vm.workorderid);

                    params.postscript = vm.postscript;
                    params.workorderids = workorderids;
                    params.userid = nptSessionManager.getSession().getUser().id;

                    UpdateWorkOrderCompleteById.post(params).then(function (response) {
                        Notification.success({
                            message: '完成工单成功',
                            replaceMessage: true,
                            delay: 2000
                        });
                        vm.query();
                    }, function (error) {
                        Notification.error({
                            title: '完成工单失败',
                            message: error.data.cause,
                            replaceMessage: true,
                            delay: 5000
                        });
                    });
                }
            }
        };
    });