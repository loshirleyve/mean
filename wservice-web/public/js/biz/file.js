/**
 * Created by Shirley on 2015/11/24.
 */

angular.module("fileApp", ["wservice.common","ngRoute"])
    .config(function($routeProvider){
        //注册文件管理路由
        $routeProvider
            .when("/material", {
                controller:"MaterialController",
                templateUrl: "material.html",
                resolve:{
                    sessionData:function(nptSession){
                        return nptSession;
                    }
                }
        })
    })
    .controller("MaterialController", function($scope){
    });