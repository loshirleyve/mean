/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

angular.module('wservice.common.directive.discuss', ["ui-notification"])
    .controller("DiscussController", function ($scope,nptSessionManager,Notification,$filter,nptCache) {
        var vm = this;
        vm.options = $scope.wsDiscuss || {};
        var source = vm.options.source || "so";
        var sourceid = vm.options.sourceid || $scope.wsDiscussSid;
        var sourceidAttr = $scope.wsDiscussSidAttr;
        vm.currentUser = nptSessionManager.getSession().getUser();
        vm.title = vm.options.title || "评论列表";

        vm.loadComment = function() {
            vm.textareaValue = "";
            if (vm.options.queryRepository) {
                vm.options.queryRepository.post({
                    "sourceid": sourceid +"",
                    "source": source
                });
            }
        };

        vm.getCacheObj = function(from) {
            return nptCache.get("user")[from];
        };


        vm.send = function() {
            if (!vm.options.textProp){
                Notification.error({
                    title: "添加评论失败.",
                    message: "无效的textProp", delay: 2000
                });
            } else if (!vm.options.queryRepository.data || !vm.options.queryRepository.data.id) {
                Notification.error({
                    title: "添加评论失败.",
                    message: "订单没有绑定消息卡片", delay: 2000
                });
            } else if (vm.textareaValue && vm.options.addRepository){
                var params = {};
                params.msgcardid = vm.options.queryRepository.data.id;
                params[vm.options.textProp] = vm.textareaValue;
                vm.addPromise = vm.options.addRepository.post(params).then(function(data) {
                    Notification.info({message: '添加评论成功.', delay: 2000});
                    vm.loadComment();
                },function(error) {
                    Notification.error({
                        title: "添加评论失败.",
                        message: error.data.cause, delay: 2000
                    });
                });
            }
        };

        if (!sourceid && sourceidAttr) {
            vm.watchSourceId = $scope.$watch("wsDiscuss",function(value) {
                if (value) {
                    sourceid = value;
                    vm.loadComment();
                    vm.watchSourceId();
                }
            });
        } else if (sourceid) {
            vm.loadComment();
        }

    })
    .directive("wsDiscuss", function () {
        return {
            restrict: "EA",
            controller: "DiscussController as vm",
            replace: true,
            templateUrl: function (element, attrs) {
                return attrs.templateUrl || "/template/discuss/discuss.html";
            },
            scope: {
                wsDiscuss: "=",
                wsDiscussSid:"=",
                wsDiscussSidAttr:"@wsDiscussSid"
            }
        };
    }).filter('nl2br', function() {
        var span = document.createElement('span');
        return function(input) {
            if (!input) return input;
            var lines = input.split('\n');

            for (var i = 0; i < lines.length; i++) {
                span.innerText = lines[i];
                span.textContent = lines[i];  //for Firefox
                lines[i] = span.innerHTML;
            }
            return lines.join('<br />');
        };
    });