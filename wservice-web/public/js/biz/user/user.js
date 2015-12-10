/**
 * Created by Shirley on 2015/12/5.
 */

angular.module("userApp",["ui.neptune","wservice.common","ngRoute","ui-notification","userApp.userPwdForm",
    "wservice.common"])
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
    .factory("queryFileById", function(nptRepository){
        return nptRepository("QueryFileById");
    })
    .controller("UserInfoController", function(queryUserInfoById, Notification, queryFileById, $uibModal,
                                               updatePasswd, updateUserByHeaderfileid,
                                               UploadSignature, AddOrUpdateFileRepo){
        var vm = this;
        vm.userInfo = queryUserInfoById;
        vm.updateUserPwd = updatePasswd;
        vm.updateUserImg = updateUserByHeaderfileid;

        vm.uploadOptions = {
            uploadImage: false,
            uploadDoc: false,
            getSignature: UploadSignature.query,
            repository: AddOrUpdateFileRepo,
            repositoryParams:{"level":"user"},
            onRegisterApi: function (api) {
                vm.uploadApi = api;
            }
        };

        vm.queryUserInfo = function(){
            vm.userInfo.post().then(function(response){
                for(var key in response.cache.user){
                    if(response.cache.user[key].id == response.data.id){
                        vm.instName = response.cache.user[key].instname;
                    }
                }
                vm.headerfileid= response.data.headerfileid;
            },function(error){
                Notification.error({
                    message:error.data.cause, delay:2000
                });
            });
        };

        vm.queryUserInfo();

        vm.imageOptions = {
            repository: queryFileById,
            searchProp: "fileid",
            labelProp: "fileUrl"
        };

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

        vm.changeImg = function () {
            vm.uploadApi.uploadImage().then(function(datas) {
                if (datas.length ===0 ) {
                    return;
                }
                vm.updateUserImg.post({"headerfileid":datas[0].id}).then(function(response){
                    Notification.success({
                        message:'修改用户头像成功!', delay:2000
                    });
                    vm.headerfileid = datas[0].id;
                }, function(error){
                    Notification.error({
                        title:"修改用户头像失败.",
                        message:error.data.cause, delay:2000
                    });
                });
            });
        };
    })
    .controller("changePwdController", function($uibModalInstance, UserPwdForm, Notification){
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
            vm.nptFormApi.form.$commitViewValue();
            if(vm.nptFormApi.form.$invalid){
                var errorText = "";
                angular.forEach(vm.nptFormApi.getErrorMessages(), function(value){
                    errorText = errorText + value +"</br>";
                });
                Notification.error({
                    title:"请确认修改密码各项数据填写正确!",
                    message: errorText, delay:2000
                });
            }else{
                $uibModalInstance.close(vm.model);
            }
        };
        vm.cancel = function(){
          $uibModalInstance.dismiss('cancel');
        };
    });