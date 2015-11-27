/**
 * Created by Shirley on 2015/11/24.
 */

angular.module("fileApp", ["wservice.form.store.file", "wservice.common", "ngRoute"])
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
    .controller("SystemFileController", function($scope, $log, QueryImageByUserLevel,nptCache){
        var self = this;
        $scope.selected = [];

        $scope.selectImageOptions = {
            imageRepository: QueryImageByUserLevel,
            onRegisterApi: function (selectImageApi) {
                self.selectImageApi = selectImageApi;
            },
            single: true
        };

        $scope.imageOptions = {
            repository:QueryImageByUserLevel.addResponseInterceptor(function(response) {
                if (response.data) {
                    response.data.forEach(function(item) {
                        var file = nptCache.get("file", item.id);
                        if (file) {
                            item.thumbnailUrl = file.thumbnailUrl;
                        }
                    });
                }
                return response;
            }),
            searchProp:"id",
            labelProp:"thumbnailUrl",
            class:"col-md-2 thumbnail",
            emptyImage:"https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150",
            errorImage:"https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/logo_white_fe6da1ec.png"
        };

        $scope.open = function () {
            if (self.selectImageApi) {
                self.selectImageApi.open().then(function (response) {
                    $log.info("用户选择了图片", response);
                    self.selected = response;
                }, function (error) {
                    $log.info("取消选择", error);
                });
            }
        };
    })
    .controller("UserFileController", function($scope){

    });