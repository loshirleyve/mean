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
    .factory("QueryImageByUserLevel", function (nptRepository) {
        return nptRepository("QueryFile").params({
            "userid": "186",
            "level": "user",
            "instid": "10000001463017",
            "filetype": "image"
        }).addRequestInterceptor(function (request) {
            return request;
        });
    })
    .factory("QueryFileById", function(nptRepository){
        return nptRepository("QueryFileById");
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
    .controller("UserInfoController", function(queryUserInfoById, Notification, $log, QueryImageByUserLevel,nptCache, QueryFileById, nptSessionManager){
        var vm = this;
        vm.userInfo = queryUserInfoById;

        vm.selected = [];

        vm.selectImageOptions = {
            imageRepository: QueryImageByUserLevel,
            onRegisterApi: function (selectImageApi) {
                vm.selectImageApi = selectImageApi;
            },
            single: true
        };

        /*vm.imageOptions = {
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
*/
//        vm.imageOptions = {
//            repository: QueryFileById,
//            searchProp: "fileid",
//            labelProp: "thumbnailUrl"
//        };

        vm.profile = {
            user: undefined,
            inst: undefined,
            init: function () {
                var self = this;
                //this.user = sessionData.getUser();
                //this.inst = sessionData.getInst();
                this.user = nptSessionManager.getSession().getUser();
                this.inst = nptSessionManager.getSession().getInst();
            }
        };








        vm.open = function () {
            if (vm.selectImageApi) {
                vm.selectImageApi.open().then(function (response) {
                    $log.info("用户选择了图片", response);
                    vm.selected = response;
                }, function (error) {
                    $log.info("取消选择", error);
                });
            }
        };


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