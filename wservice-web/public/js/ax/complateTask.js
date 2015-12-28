/**
 * Created by leon on 15/12/17.
 */

angular.module("AXCompleteTaskApp", ["ui.neptune", "workorderApp.workorderForm","wservice.common", "ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider.when("/form/:code", {
            controller: "AXCompleteTaskController as vm",
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
    }).factory("UpdateWorkOrderCompleteById", function(nptRepository) {
        return nptRepository("updateWorkOrderCompleteById");
    }).controller("AXCompleteTaskController", function ($routeParams,KitActionQuery,QueryWorkorderInfo, UpdateWorkOrderCompleteById, CompleteWorkorderForm, nptSessionManager,Notification) {
        var vm = this;
        vm.code = $routeParams.code;
        //工单信息资源库
        vm.workorderInfo = QueryWorkorderInfo;
        vm.workorderid = "10000002387500";
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
                    title: "获取工单id错误.",
                    message: error.data.cause,
                    dealy: 5000
                });
            });
        }

        //查询工单
        vm.query = function () {
            if (vm.workorderid) {
                vm.workorderInfo.post({
                    workorderid: vm.workorderid
                }).then(function (response) {
                    vm.model=response.data;
                }, function (error) {
                    Notification.error({
                        title: '查询工单失败',
                        message: error.data.cause,
                        replaceMessage: true,
                        delay: 5000
                    });
                });
            }
        };

        vm.show=function()
        {
            if(vm.model && vm.model.workOrder.state==='inservice')
            {
                return true;
            }
            return false;
        };

        vm.completeWorkorder = function () {

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
        };

    });