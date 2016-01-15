/**
 * Created by Shirley on 2016/1/4.
 */

angular.module("UserProfileApp", ["ui.neptune","ngRoute", "ui-notification"])
    .config(function($routeProvider){
        $routeProvider
        .when("/", {
            controller:"UserProfileController as vm",
            templateUrl:"profile.html",
            resolve:{
                sessionData:function(nptSession){
                    return nptSession();
                }
            }
        })
        .when("/userInfo", {
            controller:"UserProfileController as vm",
            templateUrl:"userInfo.html",
            resolve:{
                sessionData:function(nptSession){
                    return nptSession();
                }
            }
        });
    })
    .factory("queryUserInfoById", function(nptRepository, nptSessionManager){
        return nptRepository("QueryUserInfoById").addRequestInterceptor(function(request){
            request.params.userid=nptSessionManager.getSession().getUser().id;
            request.params.instid=nptSessionManager.getSession().getInst().id;
            return request;
        });
    })
    .factory("queryFileById", function(nptRepository){
        return nptRepository("QueryFileById");
    })
    .controller("UserProfileController", function(queryUserInfoById, $location, Notification, queryFileById, nptSession){
        var vm = this;
        vm.userInfo = queryUserInfoById;
        vm.queryUserInfo = function() {
            vm.userInfo.post().then(function (res) {
                angular.forEach(res.cache.user, function(key){
                   if(key.id == res.data.id){
                       vm.instName = key.instname;
                   }
                });
                vm.headerfileid = res.data.headerfileid;
            }, function (err) {
                Notification.error({
                    message: err.data.cause,
                    delay: 2000
                });
            });
        };
        vm.imageOptions={
            repository:queryFileById,
            searchProp:"fileid",
            labelProp:"fileUrl"
        };
        nptSession().then(function(){
            vm.queryUserInfo();
        });
        vm.toClient = function(){
            location.href="/biz/client";
        };
        vm.transInst = function(){
            location.href="/inst/select?focus=1"
        };
        vm.toUserInfo = function(){
            $location.path("/userInfo");
        };
        vm.toMyWallet = function(){
            location.href="/mobile/myWallet";
        };
    });
