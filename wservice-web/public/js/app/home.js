/**
 * Created by leon on 15/12/11.
 */

angular.module("HomeApp", ["ui.neptune", "ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                controller: "HomeDynamicController as vm",
                templateUrl: "dynamic.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            }).otherwise({
                redirectTo: "/"
            });

    }).factory("QueryMsgsGroup", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryMsgsGroup").params({
            userid: nptSessionManager.getSession().getUser().id,
        });
    }).controller("HomeDynamicController", function (QueryMsgsGroup, nptCache) {
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
                console.info(vm.model);
            }, function (error) {
                console.info(error);
            });
        };

        vm.toDetail = function (item) {
            console.info(item);
        };

        //查询消息
        vm.query();
    });