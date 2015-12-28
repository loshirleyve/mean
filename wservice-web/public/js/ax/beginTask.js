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

    }).factory("KitActionQuery", function (nptRepository) {
        return nptRepository("KitActionQuery");
    }).factory("QueryWorkorderInfo", function (nptRepository) {
        return nptRepository("queryWorkorderDetail");
    }).factory("UpdateWorkOrderInserviceById", function (nptRepository) {
        return nptRepository("updateWorkOrderInserviceById");
    })
    .controller("AXBeginTaskController", function ($routeParams,KitActionQuery, QueryWorkorderInfo, UpdateWorkOrderInserviceById, StartWorkorderForm, nptSessionManager,Notification) {
        var vm = this;
        vm.code = $routeParams.code;
        vm.model={};
        //工单信息资源库
        vm.workorderInfo = QueryWorkorderInfo;
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
            if(vm.model && vm.model.workOrder.state==='unstart')
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