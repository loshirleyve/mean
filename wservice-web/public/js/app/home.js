/**
 * Created by leon on 15/12/11.
 */

angular.module("HomeApp", ["ui.neptune", "ngRoute", "ui-notification"])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/dynamic", {
                controller: "HomeDynamicController as vm",
                templateUrl: "dynamic.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/dynamic/:fromuserid", {
                controller: "SendToMeController as vm",
                templateUrl: "send2me.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .otherwise({
                redirectTo: "/dynamic"
            });

    }).factory("QueryMsgsGroup", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryMsgsGroup").params({
            userid: nptSessionManager.getSession().getUser().id,
        });
    }).factory("QueryMsgCardByScene", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryMsgCardByScene").params({
            instid: nptSessionManager.getSession().getInst().id,
            userid: nptSessionManager.getSession().getUser().id
        });
    }).controller("HomeDynamicController", function (QueryMsgsGroup, nptCache, $location) {
        var vm = this;
        vm.reposMsgsGroup = QueryMsgsGroup;
        vm.model = [];

        //获取动态
        vm.query = function () {
            vm.reposMsgsGroup.post().then(function (response) {
                vm.model = response.data;

                //从cache中读取用户完整信息
                angular.forEach(vm.model, function (value) {
                    value.toUser = nptCache.get("user", value.touserid);
                    value.fromUser = nptCache.get("user", value.fromuserid);
                    value.inst = nptCache.get("inst", value.instid);
                });
            }, function (error) {
                console.info(error);
            });
        };

        vm.toDetail = function (item) {
            $location.path("/dynamic/" + item.fromuserid);
        };

        //查询消息
        vm.query();
    }).controller("SendToMeController", function ($routeParams, QueryMsgCardByScene, Notification) {
        var vm = this;
        vm.fromuserid = $routeParams.fromuserid;
        vm.reposMsgCardByScene = QueryMsgCardByScene;
        vm.model = [];

        vm.query = function () {
            if (vm.fromuserid) {
                vm.reposMsgCardByScene.post({
                    sence: "usergiveme",
                    fromuserid: vm.fromuserid
                }).then(function (response) {
                    vm.model = response.data;
                }, function (error) {
                    Notification.error({
                        title: "查询动态错误",
                        message: error.data.cause,
                        delay: 2000
                    })
                })
            }
        };

        vm.query();
    });