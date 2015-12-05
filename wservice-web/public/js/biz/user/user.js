/**
 * Created by Shirley on 2015/12/5.
 */

angular.module("userApp",["ui.neptune","wservice.common","ngRoute","ui-notification"])
    .config(function($routeProvider){
        //注册用户路由
        $routeProvider.when("/userInfo",{
            controller: "UserInfoController as vm",
            templateUrl: "userInfo.html"
        })
        .otherwise({
            redirectTo: "/userInfo"
        });

    })
//    .factory("QueryUserInfoById", function(nptRepository, nptSessionManager){
//        return nptRepository("QueryUserInfoById").params({
//           "userid":nptSessionManager.getSession().getUser().id
//        });
//    })
    .factory("queryUserInfoById", function(nptRepository){
        return nptRepository("QueryUserInfoById").params({
           "userid":"10000001466017"
        });
    })
    .controller("UserInfoController", function(queryUserInfoById, Notification){
        var vm = this;
        vm.userInfo = queryUserInfoById;
        vm.queryUserInfo = function(){
            vm.userInfo.post().then(function(response){
            },function(error){
                Notification.error({
                    message:error.data.cause, delay:2000
                });
            });
        };
        vm.queryUserInfo();
    });