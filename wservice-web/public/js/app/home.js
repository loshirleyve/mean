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
            .when("/dynamicInfo/:msgcardid", {
                controller: "MsgCardInfoController as vm",
                templateUrl: "msgcardInfo.html",
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
            userid: nptSessionManager.getSession().getUser().id
        });
    }).factory("QueryMsgByScene", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryMsgByScene").params({
            instid: nptSessionManager.getSession().getInst().id,
            userid: nptSessionManager.getSession().getUser().id
        });
    }).factory("QueryUserInfoById", function (nptRepository) {
        return nptRepository("QueryUserInfoById").params({
        });
    }).factory("QueryMsgCardInfoById", function (nptRepository,nptSessionManager) {
        return nptRepository("QueryMsgCardInfoById").params({
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
                console.info(vm.model);
            }, function (error) {
                console.info(error);
            });
        };

        vm.toDetail = function (item) {
            $location.path("/dynamic/" + item.fromuserid);
        };

        //查询消息
        vm.query();
    }).controller("SendToMeController", function ($routeParams,$location, QueryMsgByScene, Notification,QueryUserInfoById) {
        var vm = this;
        vm.fromuserid = $routeParams.fromuserid;
        vm.reposMsgByScene = QueryMsgByScene;
        vm.reposUserInfo =QueryUserInfoById;
        vm.model = [];

        vm.query = function () {
            if (vm.fromuserid) {
                vm.reposMsgByScene.post({
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

        vm.queryFormUser=function()
        {
            if (vm.fromuserid) {
                vm.reposUserInfo.post({
                    userid: vm.fromuserid
                }).then(function (response) {
                }, function (error) {
                    Notification.error({
                        title: "查询用户错误",
                        message: error.data.cause,
                        delay: 2000
                    })
                })
            }
        };
        vm.queryFormUser();
        vm.query();

        vm.toDetail = function (item) {
            $location.path("/dynamicInfo/" + item.id);
        };
    }).controller("MsgCardInfoController", function ($routeParams,$location, Notification,QueryMsgCardInfoById,nptCache) {
        var vm = this;
        vm.msgcardid = $routeParams.msgcardid;
        vm.queryMsgCardInfo = QueryMsgCardInfoById;
        vm.model = [];

        vm.query = function () {
            if (vm.msgcardid) {
                vm.queryMsgCardInfo.post({
                    msgcardid: vm.msgcardid
                }).then(function (response) {
                    vm.model = response.data;

                    angular.forEach(vm.model.comments, function (value) {
                        value.fromUser = nptCache.get("user", value.from);
                    });

                    angular.forEach(vm.model.praises, function (value) {
                        value.praiseUser = nptCache.get("user", value.userid);
                    });

                    angular.forEach(vm.model.shares, function (value) {
                        value.toUser = nptCache.get("user", value.touserid);
                        value.fromUser = nptCache.get("user", value.fromuserid);
                    });



                }, function (error) {
                    Notification.error({
                        title: "查询消息详情出错",
                        message: error.data.cause,
                        delay: 2000
                    })
                })
            }
        };

        vm.query();
    });