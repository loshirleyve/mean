/**
 * Created by rxy on 16/1/20.
 */
angular.module("FlightTaskApp", ["ui.neptune", "wservice.common", "ngRoute", "ui-notification"])
    .config(function ($routeProvider) {
        $routeProvider.when("/list", {
            controller: "FlightTaskController as vm",
            templateUrl: "list.html",
            resolve: {
                sessionData: function (nptSession) {
                    return nptSession();
                }
            }
        }).otherwise({
            redirectTo: "/list"
        });

    }).factory("queryWorkorderList", function (nptRepository, nptSessionManager) {
        return nptRepository("queryWorkorderList").params({
            instid: nptSessionManager.getSession().getInst().id,
            processid: nptSessionManager.getSession().getUser().id
        });
    }).factory("GetTaskUrl", function (nptRepository) {
        return nptRepository("GetTaskUrl");
    }).service("FlightTaskListQueryService", function (Notification, queryWorkorderList) {
        var self = this;

        self.flightTaskList = queryWorkorderList;

        self.query = function (params) {
            params = params || {};
            self.flightTaskList.post(params).then(function (response) {
                console.info(response.data);
            }, function (error) {
                Notification.error({title: '查询任务列表出现错误,请稍后再试.', message: error.data.cause, delay: 2000});
            });
        };

        //建立待查询列表
        self.queryList = [
            {
                label: "全部",
                type: "all",
                callback: function () {
                    self.query();
                }
            },
            {
                label: "未开始",
                type: "unstart",
                callback: function () {
                    self.query({
                        state: "unstart"
                    });
                }
            },
            {
                label: "处理中",
                type: "inservice",
                callback: function () {
                    self.query({
                        state: "inservice"
                    });
                }
            },
            {
                label: "已完成",
                type: "complete",
                callback: function () {
                    self.query({
                        state: "complete"
                    });
                }
            }
        ];

        //选择查询列表
        self.selectQuery = function (query) {
            if (query) {
                self.currQuery = query;
                if (query.callback) {
                    query.callback();
                }
            }
        };

        //选择一个默认查询
        self.selectQuery(self.queryList[0]);

    })
    .controller("FlightTaskController", function ($routeParams, $location, $window, FlightTaskListQueryService, GetTaskUrl, nptSessionManager, Notification) {
        var vm = this;
        //工单信息资源库
        vm.queryService = FlightTaskListQueryService;

        vm.url = {};
        vm.getUrl = function (params) {
            GetTaskUrl.post(params)
                .then(function (response) {
                    vm.url[params.workorderId] = response.data;
                }, function (error) {
                    Notification.error({ title: '办理出错',
                        message: error.data.cause,
                        replaceMessage: true,
                        delay: 5000
                    });
                });
        };

        vm.doTask = function (id, type) {
            var params = {};
            params.workorderId = id;
            if (type === 'zxfx') {
                params.taskType = 'axFlightTask';
            }
            else if (type === 'hxgh') {
                params.taskType = 'axAirlinePlanTask';
            }
            vm.getUrl(params);
        };

    });
