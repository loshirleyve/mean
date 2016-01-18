/**
 * Created by Shirley on 2016/1/4.
 */

angular.module("UserProfileApp", ["ui.neptune","ngRoute", "ui-notification", "userApp.userPwdForm"])
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
        })
        .when("/signature", {
            controller:"UserSignatureController as vm",
            templateUrl:"signature.html",
            resolve:{
                sessionData:function(nptSession){
                    return nptSession();
                }
            }
        })
        .when("/changePwd", {
            controller:"UserChangePwdController as vm",
            templateUrl:"changePwd.html",
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
    .factory("updateUserBySignature", function(nptRepository, nptSessionManager){
        return nptRepository("UpdateUserBySignature").addRequestInterceptor(function(request){
            request.params.userid=nptSessionManager.getSession().getUser().id;
            request.params.instid=nptSessionManager.getSession().getInst().id;
            return request;
        });
    })
    .factory("updatePasswd", function(nptRepository, nptSessionManager){
        return nptRepository("UpdatePasswd").params({
            "userid":nptSessionManager.getSession().getUser().id
        });
    })
    .controller("UserProfileController", function(queryUserInfoById, $location, Notification, queryFileById, nptSession){
        $(window.document.body).css("background-color", "#EEF0EF");
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
    })
    .controller("UserSignatureController", function(queryUserInfoById, updateUserBySignature, Notification){
        $(window.document.body).css("background-color", "#EEF0EF");
        var vm = this;
        vm.signature="";
        vm.queryUserInfo = queryUserInfoById;
        vm.queryUserInfo.post().then(function(res){
            vm.signature = res.data.signature;
        }, function(err){
           Notification.error({
               message:err.data.cause,
               delay:2000
           });
        });
        vm.updateSignature = updateUserBySignature;
        vm.sure = function(signature){
            vm.updateSignature.post({"signature":signature}).then(function(res){
                Notification.success({message:'更新成功！',delay:2000});
            }, function(err){
                Notification.error({
                   message:err.data.cause,
                   delay:2000
                });
            });
        };
    })
    .controller("UserChangePwdController", function(updatePasswd, UserPwdForm, Notification){
        $(window.document.body).css("background-color", "#EEF0EF");
        var vm = this;
        vm.model = {};
        vm.updateUserPwd = updatePasswd;
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
                vm.updateUserPwd.post({"oldPasswd":vm.model.oldPasswd, "newPasswd":vm.model.newPasswd}).then(function(response){
                    Notification.success({message:'修改密码成功！',delay:2000});
                },function(err){
                    Notification.error({
                        title:"更改密码失败.",
                        message:err.data.cause, delay:2000
                    });
                });
            }
        };
    });
