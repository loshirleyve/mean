/**
 * Created by Shirley on 2015/11/24.
 */

angular.module("fileApp", ["wservice.common","ngRoute"])
    .run(function(nptFormStore,QueryImageByUserLevel){
        nptFormStore.put("material",{
            options:{},
            field:[
                {
                    key:'selectImage',
                    type:'npt-select-image',
                    templateOptions: {
                        label: "选择图片",
                        imageRepository: QueryImageByUserLevel
                    }
                }
            ]
        });
    })
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
            .when("/systemFile",{
                controller:"SystemFileController",
                templateUrl: "systemFile.html",
                resolve:{
                    sessionData:function(nptSession){
                        return nptSession;
                    }
                }
            })
            .when("/userFile",{
                controller:"UserFileController",
                templateUrl: "userFile.html",
                resolve:{
                    sessionData:function(nptSession){
                        return nptSession;
                    }
                }
            });
    })
    .controller("MaterialController", function($scope){
    })
    .controller("SystemFileController", function($scope){

    })
    .controller("UserFileController", function($scope){

    });