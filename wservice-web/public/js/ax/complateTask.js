/**
 * Created by leon on 15/12/17.
 */

angular.module("AXCompleteTaskApp", ["ui.neptune", "workorderApp.workorderForm","wservice.common", "ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider.when("/form/:code", {
            controller: "AXCompleteTaskController as vm",
            templateUrl: "form.html"
        });

    }).factory("QueryWorkorderInfo", function (nptRepository) {
        return nptRepository("queryWorkorderDetail");
    }).factory("UpdateWorkOrderCompleteById", function(nptRepository) {
        return nptRepository("updateWorkOrderCompleteById");
    }).controller("AXCompleteTaskController", function ($routeParams,QueryWorkorderInfo, UpdateWorkOrderCompleteById, CompleteWorkorderForm, nptSessionManager) {
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
        //查询工单
        vm.query = function () {
            if (vm.workorderid) {
                vm.workorderInfo.post({
                    workorderid: vm.workorderid
                }).then(function (response) {
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

        vm.completeWorkorder = function () {

            var params = {};
            var workorderids = [];

            workorderids.push(vm.workorderid);

            console.info(vm.model);

            params.postscript = vm.model.postscript;
            params.workorderids = workorderids;
            params.userid = nptSessionManager.getSession().getUser().id;

            UpdateWorkOrderCompleteById.post(params).then(function (response) {
                Notification.success({
                    message: '工单完成成功',
                    replaceMessage: true,
                    delay: 2000
                });
            }, function (error) {
                Notification.error({
                    title: '工单完成失败',
                    message: error.data.cause,
                    replaceMessage: true,
                    delay: 5000
                });
            });
        };
        vm.query();

    });