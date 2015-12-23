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
            .when("/dynamic/:fromuserid/:frominstid/:fromusertype", {
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
    }).factory("AddMsgCard", function (nptRepository, nptSessionManager) {
        return nptRepository("AddMsgCard").params({
            instid: nptSessionManager.getSession().getInst().id,
            userid: nptSessionManager.getSession().getUser().id
        });
    }).factory("QueryMsgByScene", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryMsgByScene").params({
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
    }).factory("QueryTopics", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryTopics").params({
            instid: nptSessionManager.getSession().getInst().id
        });
    }).factory("UpdateMsgCardState", function (nptRepository, nptSessionManager) {
        return nptRepository("UpdateMsgCardState").params({
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
            $location.path("/dynamic/" + item.fromuserid + "/"+item.instid+"/" + item.fromtype);
        };

        //查询消息
        vm.query();
    }).controller("sendMessageController", function (QueryMsgsGroup, nptCache, $location, nptSessionManager, QueryUserInfo, AddMsgCard, messageForm, Notification) {
        var vm = this;
        var userid = nptSessionManager.getSession().getUser().id;
        vm.addMsgCard = AddMsgCard;
        vm.modelMessage = {createby: angular.copy(userid), scope: "public", source: "none", msgFromtype: "person"};

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
            vm.modelMessage = {
                createby: angular.copy(userid),
                scope: "public",
                source: "none",
                msgFromtype: "person"};
        }

        function save() {
            var users = [];
            var attachments = [];
            var tempTopic = "";
            if (vm.modelMessage.toUsers) {
                angular.forEach(vm.modelMessage.toUsers, function (value) {
                    users.push({ "userid": value, "type": "user"});
                });
            }
            if (vm.modelMessage.pics) {
                angular.forEach(vm.modelMessage.pics, function (value) {
                    attachments.push({ "fileid": value});
                });
            }
            if (vm.modelMessage.topics) {
                angular.forEach(vm.modelMessage.topics, function (value) {
                    tempTopic += "#" + value + "# ";
                });
            }
            vm.modelMessage.users = users;
            vm.modelMessage.attachments = attachments;
            vm.modelMessage.content = tempTopic + vm.modelMessage.content;
            delete vm.modelMessage.toUsers;
            delete vm.modelMessage.pics;
            vm.addMsgCard.post(vm.modelMessage).then(function (response) {
                Notification.success({
                    message: "发送消息成功！",
                    delay: 2000
                });
                $location.path("/dynamic/" + response.data.from + "/"+ response.data.fromtype);
            }, function (error) {
                Notification.error({
                    title: "发送消息出错",
                    message: error.data.cause,
                    delay: 2000
                });
            });
        }

    }).controller("SendToMeController", function ($routeParams, $location, QueryMsgByScene, Notification, QueryUserInfo, queryInstDetail) {
        var vm = this;
        vm.fromuserid = angular.copy($routeParams.fromuserid);
        vm.fromusertype = $routeParams.fromusertype;
        vm.frominstid = $routeParams.frominstid;
        vm.reposMsgByScene = QueryMsgByScene;
        vm.reposUserInfo = QueryUserInfo;
        vm.queryInstInfo = queryInstDetail;
        vm.currUserName=angular.copy("");
        vm.model = [];

        vm.query = function () {
            if (vm.fromuserid) {
                if (vm.fromusertype == 'person') {
                    vm.reposMsgByScene.post({
                        sence: "usergiveme",
                        fromuserid: vm.fromuserid,
                        instid:vm.frominstid
                    }).then(function (response) {
                        vm.model = response.data;
                    }, function (error) {
                        Notification.error({
                            title: "获取消息错误",
                            message: error.data.cause,
                            delay: 2000
                        });
                    });
                }
                else if (vm.fromusertype == 'inst') {
                    vm.reposMsgByScene.post({
                        sence: "instgiveme",
                        fromuserid: vm.fromuserid,
                        instid:vm.frominstid
                    }).then(function (response) {
                        vm.model = response.data;
                    }, function (error) {
                        Notification.error({
                            title: "获取消息出错",
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
                        vm.currUserName = angular.copy(response.data.name);
                    }, function (error) {
                        Notification.error({
                            title: "获取用户信息出错",
                            message: error.data.cause,
                            delay: 2000
                        });
                    });
                }
                else if (vm.fromusertype == 'inst') {

                    vm.queryInstInfo.post({
                        instid: vm.frominstid
                    }).then(function (response) {
                        vm.currUserName = angular.copy(response.data.simplename);
                    }, function (error) {
                        Notification.error({
                            title: "获取机构信息出错",
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
    }).controller("MsgCardInfoController", function ($routeParams, $location, Notification, QueryMsgCardInfoById, AddPraiseLikeByMsgCardId, UpdateMsgCardState, nptCache, nptSessionManager) {
        var vm = this;
        vm.msgcardid = $routeParams.msgcardid;
        vm.queryMsgCardInfo = QueryMsgCardInfoById;
        vm.addPraiseLike = AddPraiseLikeByMsgCardId;
        vm.updateMsgCardState = UpdateMsgCardState;
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
                        vm.praise = angular.copy("取消点赞");
                    }

                    if (vm.model.state === 'unread') {
                        var msgcardidList = [];
                        msgcardidList.push(response.data.id);
                        vm.updatMsgState(msgcardidList);
                    }
                }, function (error) {
                    Notification.error({
                        title: "获取消息详情出错",
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
                        vm.praise = angular.copy("点赞");
                        var praisesed = [];
                        angular.forEach(vm.model.praises, function (value) {
                            if (response.data.id != value.id) {
                                praisesed.push(value);
                            }
                        });
                        vm.model.praises = angular.copy(praisesed);
                        vm.model.praisecount=vm.model.praisecount-1;
                    }
                    else {
                        vm.praise = angular.copy("取消点赞");
                        vm.model.praises.push(response.data);
                        angular.forEach(vm.model.praises, function (value) {
                            value.praiseUser = nptCache.get("user", value.userid);
                        });
                        vm.model.praisecount=vm.model.praisecount+1;
                    }
                }, function (error) {
                    Notification.error({
                        title: "点赞失败，请稍后在试！",
                        message: error.data.cause,
                        delay: 2000
                    });
                });
            }
        };

        vm.updatMsgState = function (msgcardidList) {
            vm.updateMsgCardState.post({
                msgcardidList: msgcardidList
            }).then(function (response) {
            }, function (error) {
            });
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
                        title: "获取消息详情出错",
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
                            message: "发送消息评论成功!",
                            delay: 2000
                        });
                        $location.path("/dynamicInfo/" + vm.msgcardid);
                    }, function (error) {
                        Notification.error({
                            title: "发送评论出错",
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
                        title: "获取消息详情出错",
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
                            message: "消息转发成功!",
                            delay: 2000
                        });
                        $location.path("/dynamicInfo/" + vm.msgcardid);
                    }, function (error) {
                        Notification.error({
                            title: "消息转发出错",
                            message: error.data.cause,
                            delay: 2000
                        });
                    });
            }
        };

        vm.query();
    });