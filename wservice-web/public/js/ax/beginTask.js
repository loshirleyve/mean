/**
 * Created by leon on 15/12/17.
 */

angular.module("AXBeginTaskApp", ["ui.neptune", "workorderApp.workorderForm", "workorderApp.WorkorderAttachmentGrid", "workorderApp.WorkorderCommentGrid", "wservice.common", "ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider.when("/form/:code", {
            controller: "AXBeginTaskController as vm",
            templateUrl: "form.html",
            resolve: {
                sessionData: function (nptSession) {
                    return nptSession();
                }
            }
        }).when("/detail/:id", {
            controller: "AXTaskDetailController as vm",
            templateUrl: "detail.html",
            resolve: {
                sessionData: function (nptSession) {
                    return nptSession();
                }
            }
        });

    }).factory("QueryWorkorderInfo", function (nptRepository) {
        return nptRepository("queryWorkorderDetail");
    }).factory("UpdateWorkOrderInserviceById", function (nptRepository) {
        return nptRepository("updateWorkOrderInserviceById");
    })
    .controller("AXBeginTaskController", function ($routeParams, QueryWorkorderInfo, UpdateWorkOrderInserviceById, StartWorkorderForm, nptSessionManager) {
        var vm = this;
        vm.code = $routeParams.code;
        //工单信息资源库
        vm.workorderInfo = QueryWorkorderInfo;
        vm.workorderid = "10000002387500";
        //表单配置
        vm.startWorkorderOptions = {
            store: StartWorkorderForm,
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

        vm.startWorkorder = function () {
            var params = {};
            var workorderids = [];

            workorderids.push(vm.workorderid);

            console.info(vm.model);

            params.postscript = vm.model.postscript;
            params.workorderids = workorderids;
            params.userid = nptSessionManager.getSession().getUser().id;

            UpdateWorkOrderInserviceById.post(params).then(function (response) {
                Notification.success({
                    message: '工单开始成功',
                    replaceMessage: true,
                    delay: 2000
                });

            }, function (error) {
                Notification.error({
                    title: '工单开始失败',
                    message: error.data.cause,
                    replaceMessage: true,
                    delay: 5000
                });
            });

        };

        vm.query();
    }).controller("AXTaskDetailController", function ($routeParams, QueryWorkorderInfo, WorkorderAttachmentGrid, WorkorderCommentGrid) {
        var vm = this;
        //工单信息资源库
        vm.workorderInfo = QueryWorkorderInfo;
        vm.workorderid = "10000002387500";

        //数据模型
        vm.modelAttachment = [];
        vm.modelComment = [];

        //配置工单资料
        vm.workorderAttachmentOptions = {
            store: WorkorderAttachmentGrid,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
            }
        };

        //配置工单评价
        vm.workorderCommentOptions = {
            store: WorkorderCommentGrid,
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
                    vm.modelAttachment = response.data.orderAttachments;
                    vm.modelComment = response.data.workorderComment;

                    //获取用户头像id
                    if (vm.modelComment) {
                        var commentUserId = vm.modelComment.senderid;
                        vm.commentUserUrl = response.cache.user[commentUserId].url;
                    }
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
        vm.query();
    });