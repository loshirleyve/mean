
/**
 * Created by leon on 15/12/17.
 */

angular.module("AXAirlinePlanTaskApp", ["ui.neptune", "workorderApp.workorderForm","wservice.common", "ngRoute"])
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
        });


    }).factory("KitActionQuery", function (nptRepository) {
        return nptRepository("KitActionQuery");
    }).factory("QueryWorkorderInfo", function (nptRepository) {
        return nptRepository("queryWorkorderDetail");
    }).factory("StartAirlinePlanTask", function (nptRepository) {
        return nptRepository("StartAirlinePlanTask");
    }).factory("CompleteAirlinePlanTask", function(nptRepository) {
        return nptRepository("CompleteAirlinePlanTask");
    }).factory("QueryAirline", function(nptRepository) {
        return nptRepository("QueryAirline");
    }).controller("AXAirlinePlanTaskController", function ($routeParams,KitActionQuery,QueryWorkorderInfo,QueryAirline,StartAirlinePlanTask, CompleteAirlinePlanTask, CompleteWorkorderForm, nptSessionManager,Notification) {
        var vm = this;
        vm.code = $routeParams.code;
        //工单信息资源库
        vm.workorderInfo = QueryWorkorderInfo;
        vm.queryAirline=QueryAirline;
        //数据模型
        vm.model = {};

        //表单配置
        vm.completeWorkorderOptions = {
            store: CompleteWorkorderForm,
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
                    vm.model=response.data;
                    if(vm.model && vm.model.workOrder.state==='inservice')
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

        vm.queryLine=function()
        {
            vm.queryAirline.post({
                sourceid: vm.workorderid
            }).then(function (response) {
                vm.modelLine=response.data;
            }, function (error) {
                Notification.error({
                    title: '获取航线出错',
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

            StartAirlinePlanTask.post(params).then(function (response) {
                Notification.success({
                    message: '航线规划开始成功',
                    replaceMessage: true,
                    delay: 2000
                });
                vm.query();
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

            var params = {};
            var workorderids = [];

            workorderids.push(vm.workorderid);

            params.postscript = vm.postscript;
            params.workorderids = workorderids;
            params.userid = nptSessionManager.getSession().getUser().id;

            CompleteAirlinePlanTask.post(params).then(function (response) {
                Notification.success({
                    message: '完成航线规划成功',
                    replaceMessage: true,
                    delay: 2000
                });
                vm.query();
            }, function (error) {
                Notification.error({
                    title: '完成航线规划失败',
                    message: error.data.cause,
                    replaceMessage: true,
                    delay: 5000
                });
            });
        };

    }).controller("errorController", function () {

    });