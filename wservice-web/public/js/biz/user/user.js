/**
 * Created by Shirley on 2015/12/5.
 */

angular.module("userApp",["ui.neptune","wservice.common","ngRoute","ui-notification","userApp.userPwdForm"])
    .config(function($routeProvider){
        //注册用户路由
        $routeProvider.when("/userInfo",{
            controller: "UserInfoController as vm",
            templateUrl: "userInfo.html",
            resolve:{
                sessionData:function(nptSession){
                    return nptSession();
                }
            }
        })
        .otherwise({
            redirectTo: "/userInfo"
        });

    })
    .factory("queryUserInfoById", function(nptRepository, nptSessionManager){
        return nptRepository("QueryUserInfoById").params({
           "userid":nptSessionManager.getSession().getUser().id
        });
    })
    .factory("updatePasswd", function(nptRepository, nptSessionManager){
        return nptRepository("UpdatePasswd").params({
           "userid":nptSessionManager.getSession().getUser().id
        });
    })
    .factory("updateUserByHeaderfileid", function(nptRepository, nptSessionManager){
        return nptRepository("UpdateUserByHeaderfileid").params({
           "userid":nptSessionManager.getSession().getUser().id
        });
    })
    .factory("queryFile", function(nptRepository, nptSessionManager){
        return nptRepository("QueryFile").params({
           "userid":nptSessionManager.getSession().getUser().id,
            "level":"user",
            "instid":nptSessionManager.getSession().getInst().id,
            "filetype":"image"
        }).addRequestInterceptor(function(request){
            return request;
        });
    })
    .controller("UserInfoController", function(queryUserInfoById, Notification, QueryFileById, nptSessionManager, $uibModal, updatePasswd, $log, queryFile, nptCache, updateUserByHeaderfileid){
        var vm = this;
        vm.userInfo = queryUserInfoById;
        vm.updateUserPwd = updatePasswd;
        vm.updateUserImg = updateUserByHeaderfileid;

        vm.imageOptions = {
            repository: QueryFileById,
            searchProp: "fileid",
            labelProp: "thumbnailUrl"
        };

        vm.profile = {
            user: undefined,
            inst: undefined,
            init: function () {
                var self = this;
                this.user = nptSessionManager.getSession().getUser();
                this.inst = nptSessionManager.getSession().getInst();
            }
        };

        vm.profile.init();

        vm.queryUserInfo = function(){
            vm.userInfo.post().then(function(response){
            },function(error){
                Notification.error({
                    message:error.data.cause, delay:2000
                });
            });
        };
        vm.queryUserInfo();

        vm.changePwd = function(){
            $uibModal.open({
                animation:true,
                templateUrl:'changePassword.html',
                controller:'changePwdController',
                controllerAs:'vm'
            }).result.then(function(response){
                    //调用更改用户密码服务
                    vm.updateUserPwd.post({"oldPasswd":response.oldPasswd, "newPasswd":response.newPasswd}).then(function(response){
                        Notification.success({message:'修改密码成功！',delay:2000});
                    },function(err){
                        Notification.error({
                            title:"更改密码失败.",
                            message:err.data.cause, delay:2000
                        });
                    });
                }, function(){
                    //用户关闭
                }) ;
        };

        vm.selectImageOptions = {
            imageRepository: queryFile,
            onRegisterApi: function (selectImageApi) {
                vm.selectImageApi = selectImageApi;
            },
            single: true
        };

        vm.imageOptions = {
            repository:queryFile.addResponseInterceptor(function(response) {
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


        vm.changeImg = function () {
            if (vm.selectImageApi) {
                vm.selectImageApi.open().then(function (response) {
                    $log.info("用户选择了图片", response);
                    vm.updateUserImg.post({"headerfileid":response[0].file.id}).then(function(response){
                        Notification.success({
                            message:'修改用户头像成功!', delay:2000
                        });
                    }, function(error){
                        Notification.error({
                            title:"修改用户头像失败.",
                            message:error.data.cause, delay:2000
                        });
                    });
                }, function (error) {
                    $log.info("取消选择", error);
                });
            }
        };
    })
    .controller("changePwdController", function($uibModalInstance, UserPwdForm){
        var vm=this;
        vm.model = {};
        //修改用户密码表单配置
        vm.userPwdFormOptions = {
          store:UserPwdForm,
          onRegisterApi: function(nptFormApi){
              vm.nptFormApi = nptFormApi;
          }
        };
        vm.ok = function(){
            $uibModalInstance.close(vm.model);
        };
        vm.cancel = function(){
          $uibModalInstance.dismiss('cancel');
        };
    });