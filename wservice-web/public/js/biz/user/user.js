/**
 * Created by Shirley on 2015/12/5.
 */

angular.module("userApp",["ui.neptune","wservice.common","ngRoute","ui-notification"])
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
    .controller("UserInfoController", function(queryUserInfoById, Notification, QueryFileById, nptSessionManager, $uibModal, updatePasswd){
        var vm = this;
        vm.userInfo = queryUserInfoById;
        vm.updateUserPwd = updatePasswd;

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
                    vm.updateUserPwd.post({"oldPasswd":response.oriPwd, "newPasswd":response.newPwd}).then(function(response){
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
    })
    .controller("changePwdController", function($uibModalInstance){
        var vm=this;
        vm.model = {};
        vm.ok = function(){
            $uibModalInstance.close(vm.model);
        };
        vm.cancel = function(){
          $uibModalInstance.dismiss('cancel');
        };
    });