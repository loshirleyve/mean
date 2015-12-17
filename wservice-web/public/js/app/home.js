/**
 * Created by leon on 15/12/11.
 */

angular.module("HomeApp", ["ui.neptune", "homeApp.homeForm", "wservice.common", "ngRoute", "ui-notification"])
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
            .when("/dynamic/sendMessage", {
                controller: "sendMessageController as vm",
                templateUrl: "sendMessage.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/dynamic/:fromuserid/:fromusertype", {
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
            .when("/comment/:msgcardid", {
                controller: "commentController as vm",
                templateUrl: "comment.html",
                resolve: {
                    sessionData: function (nptSession) {
                        return nptSession();
                    }
                }
            })
            .when("/share/:msgcardid", {
                controller: "shareController as vm",
                templateUrl: "share.html",
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
    }).factory("AddMsgCard", function (nptRepository,nptSessionManager) {
        return nptRepository("AddMsgCard").params({
            instid: nptSessionManager.getSession().getInst().id,
            userid: nptSessionManager.getSession().getUser().id
        });
    }).factory("QueryMsgByScene", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryMsgByScene").params({
            instid: nptSessionManager.getSession().getInst().id,
            userid: nptSessionManager.getSession().getUser().id
        });
    }).factory("queryInstDetail", function (nptRepository) {
        return nptRepository("queryInstDetail").params({
        });
    }).factory("QueryUserInfo", function (nptRepository) {
        return nptRepository("QueryUserInfoById").params({
        });
    }).factory("QueryMsgCardInfoById", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryMsgCardInfoById").params({
            userid: nptSessionManager.getSession().getUser().id
        });
    }).factory("QueryUserByInst", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryUserByInst").params({
            instid: nptSessionManager.getSession().getInst().id
        });
    }).factory("AddMsgCardComment", function (nptRepository, nptSessionManager) {
        return nptRepository("AddMsgCardComment").params({
            instid: nptSessionManager.getSession().getInst().id
        });
    }).factory("AddMsgCardShare", function (nptRepository, nptSessionManager) {
        return nptRepository("AddMsgCardShare").params({
            instid: nptSessionManager.getSession().getInst().id
        });
    }).factory("AddPraiseLikeByMsgCardId", function (nptRepository) {
        return nptRepository("AddPraiseLikeByMsgCardId").params({

        });
    }).factory("QueryTopics", function (nptRepository,nptSessionManager) {
        return nptRepository("QueryTopics").params({
            instid: nptSessionManager.getSession().getInst().id
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
            $location.path("/dynamic/" + item.fromuserid + "/" + item.fromtype);
        };

        //查询消息
        vm.query();
    }).controller("sendMessageController", function (QueryMsgsGroup, nptCache, $location, nptSessionManager, QueryUserInfo,AddMsgCard,messageForm) {
        var vm = this;
        var userid = nptSessionManager.getSession().getUser().id;
        vm.reposUserInfo = QueryUserInfo;
        vm.addMsgCard=AddMsgCard;
        vm.modelMessage={createby:angular.copy(userid)};

        //配置表单
        vm.messageFormOptions = {
            store: messageForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
                //注册提交事件
                vm.nptFormApi.addOnSubmitListen(save);
                //设置重置事件
                vm.nptFormApi.setOnActionListen(reset);
            }
        };

        function reset() {
            vm.modelMessage={createby:angular.copy(userid)};
        }

        function save() {

        }

        vm.queryUser = function () {
            if (userid) {
                vm.reposUserInfo.post({
                    userid: userid
                }).then(function (response) {
                    console.info(response.data);
                }, function (error) {
                    Notification.error({
                        title: "查询用户信息错误",
                        message: error.data.cause,
                        delay: 2000
                    });
                });
            }
        };
        vm.queryUser();

    }).controller("SendToMeController", function ($routeParams, $location, QueryMsgByScene, Notification, QueryUserInfo, queryInstDetail) {
        var vm = this;
        vm.fromuserid = $routeParams.fromuserid;
        vm.fromusertype = $routeParams.fromusertype;
        vm.reposMsgByScene = QueryMsgByScene;
        vm.reposUserInfo = QueryUserInfo;
        vm.queryInstInfo = queryInstDetail;
        vm.modelUser = {};
        vm.model = [];

        vm.query = function () {
            if (vm.fromuserid) {
                if (vm.fromusertype == 'person') {
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
                        });
                    });
                }
                else if (vm.fromusertype == 'inst') {
                    vm.reposMsgByScene.post({
                        sence: "instgiveme",
                        fromuserid: vm.fromuserid
                    }).then(function (response) {
                        vm.model = response.data;
                    }, function (error) {
                        Notification.error({
                            title: "查询动态错误",
                            message: error.data.cause,
                            delay: 2000
                        });
                    });
                }
            }
        };

        vm.queryFormUser = function () {
            if (vm.fromuserid) {
                if (vm.fromusertype == 'person') {
                    vm.reposUserInfo.post({
                        userid: vm.fromuserid
                    }).then(function (response) {
                        vm.modelUser = response.data;
                    }, function (error) {
                        Notification.error({
                            title: "查询用户信息错误",
                            message: error.data.cause,
                            delay: 2000
                        });
                    });
                }
                else if (vm.fromusertype == 'inst') {

                    vm.queryInstInfo.post({
                        instid: vm.fromuserid
                    }).then(function (response) {
                        vm.modelUser = response.data;
                    }, function (error) {
                        Notification.error({
                            title: "查询机构信息错误",
                            message: error.data.cause,
                            delay: 2000
                        });
                    });
                }
            }
        };
        vm.queryFormUser();
        vm.query();

        vm.toDetail = function (item) {
            $location.path("/dynamicInfo/" + item.id);
        };
    }).controller("MsgCardInfoController", function ($routeParams, $location, Notification, QueryMsgCardInfoById, AddPraiseLikeByMsgCardId, nptCache, nptSessionManager) {
        var vm = this;
        vm.msgcardid = $routeParams.msgcardid;
        vm.queryMsgCardInfo = QueryMsgCardInfoById;
        vm.addPraiseLike = AddPraiseLikeByMsgCardId;
        var userid = nptSessionManager.getSession().getUser().id;
        vm.praise = angular.copy("点赞");
        vm.model = {};

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

                    if (vm.model.mypraise === true) {
                        vm.praise =  angular.copy("取消点赞");
                    }

                }, function (error) {
                    Notification.error({
                        title: "查询消息详情出错",
                        message: error.data.cause,
                        delay: 2000
                    });
                });
            }
        };

        vm.onClickPraise = function () {
            if (vm.msgcardid) {
                vm.addPraiseLike.post({
                    msgcardid: vm.msgcardid,
                    userid: userid
                }).then(function (response) {
                    if (response.data.praise === 0) {
                        vm.praise =  angular.copy("点赞");
                        var praisesed=[];
                        angular.forEach(vm.model.praises, function (value) {
                            if(response.data.id!=value.id)
                            {
                                praisesed.push(value);
                            }
                        });
                        vm.model.praises=angular.copy(praisesed);
                    }
                    else {
                        vm.praise = angular.copy( "取消点赞");
                        vm.model.praises.push(response.data);
                        angular.forEach(vm.model.praises, function (value) {
                            value.praiseUser = nptCache.get("user", value.userid);
                        });

                    }
                }, function (error) {
                    Notification.error({
                        title: "点赞出错",
                        message: error.data.cause,
                        delay: 2000
                    });
                });
            }
        };

        vm.query();

    }).controller("commentController", function ($routeParams, $location, QueryMsgCardInfoById, AddMsgCardComment, nptCache, commentForm, nptSessionManager, Notification) {
        var vm = this;
        vm.msgcardid = $routeParams.msgcardid;
        vm.queryMsgCardInfo = QueryMsgCardInfoById;
        vm.addMsgCardComment = AddMsgCardComment;
        var userid = nptSessionManager.getSession().getUser().id;
        vm.model = {};
        vm.modelComment = {
            from: angular.copy(userid),
            createby: angular.copy(userid),
            type: 'normal',
            msgcardid: angular.copy(vm.msgcardid)
        };

        //配置表单
        vm.commentFormOptions = {
            store: commentForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
                //注册提交事件
                vm.nptFormApi.addOnSubmitListen(save);
                //设置重置事件
                vm.nptFormApi.setOnActionListen(reset);
            }
        };

        function reset() {
            vm.modelComment = {
                from: angular.copy(userid),
                createby: angular.copy(userid),
                type: 'normal',
                msgcardid: angular.copy(vm.msgcardid)
            };
        }

        function save() {
            vm.addComment();
        }

        vm.query = function () {
            if (vm.msgcardid) {
                vm.queryMsgCardInfo.post({
                    msgcardid: vm.msgcardid
                }).then(function (response) {
                    vm.model = response.data;
                }, function (error) {
                    Notification.error({
                        title: "查询消息详情出错",
                        message: error.data.cause,
                        delay: 2000
                    });
                });
            }
        };

        vm.addComment = function () {
            if (vm.msgcardid) {
                vm.addMsgCardComment.post(
                    vm.modelComment
                ).then(function (response) {
                        Notification.success({
                            message: "保存消息评论成功!",
                            delay: 2000
                        });
                        $location.path("/dynamicInfo/" + vm.msgcardid);
                    }, function (error) {
                        Notification.error({
                            title: "保存评论出错",
                            message: error.data.cause,
                            delay: 2000
                        });
                    });
            }
        };

        vm.query();
    }).controller("shareController", function ($routeParams, $location, QueryMsgCardInfoById, AddMsgCardShare, nptCache, shareForm, nptSessionManager, Notification) {
        var vm = this;
        vm.msgcardid = $routeParams.msgcardid;
        vm.queryMsgCardInfo = QueryMsgCardInfoById;
        vm.addMsgCardShare = AddMsgCardShare;
        var userid = nptSessionManager.getSession().getUser().id;
        vm.model = {};
        vm.modelShare = {
            userid: angular.copy(userid),
            createby: angular.copy(userid),
            type: 'normal',
            msgcardid: angular.copy(vm.msgcardid)
        };

        //配置表单
        vm.shareFormOptions = {
            store: shareForm,
            onRegisterApi: function (nptFormApi) {
                vm.nptFormApi = nptFormApi;
                //注册提交事件
                vm.nptFormApi.addOnSubmitListen(save);
                //设置重置事件
                vm.nptFormApi.setOnActionListen(reset);
            }
        };

        function reset() {
            vm.modelShare = {
                userid: angular.copy(userid),
                createby: angular.copy(userid),
                type: 'normal',
                msgcardid: angular.copy(vm.msgcardid)
            };
        }

        function save() {
            vm.addShare();
        }

        vm.query = function () {
            if (vm.msgcardid) {
                vm.queryMsgCardInfo.post({
                    msgcardid: vm.msgcardid
                }).then(function (response) {
                    vm.model = response.data;
                }, function (error) {
                    Notification.error({
                        title: "查询消息详情出错",
                        message: error.data.cause,
                        delay: 2000
                    });
                });
            }
        };

        vm.addShare = function () {
            if (vm.msgcardid) {
                vm.addMsgCardShare.post(
                    vm.modelShare
                ).then(function (response) {
                        Notification.success({
                            message: "保存消息转发成功!",
                            delay: 2000
                        });
                        $location.path("/dynamicInfo/" + vm.msgcardid);
                    }, function (error) {
                        Notification.error({
                            title: "保存转发出错",
                            message: error.data.cause,
                            delay: 2000
                        });
                    });
            }
        };

        vm.query();
    });