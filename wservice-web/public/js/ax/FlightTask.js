/**
 * Created by rxy on 16/1/20.
 */
/**
 * Created by leon on 15/12/17.
 */

angular.module("FlightTaskApp", ["ui.neptune", "wservice.common", "ngRoute"])
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
        })
    }).factory("GetTaskUrl", function (nptRepository) {
        return nptRepository("GetTaskUrl");
    })
    .controller("FlightTaskController", function ($routeParams, $location,$window, queryWorkorderList,GetTaskUrl, nptSessionManager, Notification) {
        var vm = this;
        //工单信息资源库
        vm.workorderList = queryWorkorderList;
        //查询任务
        vm.query = function () {
            vm.workorderList.post({})
                .then(function (response) {
                vm.model = response.data;
            }, function (error) {
                Notification.error({
                    title: '获取任务列表出错',
                    message: error.data.cause,
                    replaceMessage: true,
                    delay: 5000
                });
            });
        };

        vm.getUrl = function (params) {
            GetTaskUrl.post(params)
                .then(function (response) {
                    $window.open(response.data);
                }, function (error) {
                    Notification.error({
                        title: '办理出错',
                        message: error.data.cause,
                        replaceMessage: true,
                        delay: 5000
                    });
                });
        };

        vm.doTask=function(id,type)
        {
            var params={};
            params.workorderId=id;
            if(type==='zxfx')
            {
                params.taskType='axFlightTask';
            }
            else if(type==='hxgh')
            {
                params.taskType='axAirlinePlanTask';
            }
            vm.getUrl(params);
        };
        vm.query();

    });
