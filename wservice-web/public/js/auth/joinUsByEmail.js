/**
 * Created by Shirley on 2015/12/11.
 */

angular.module("joinUsByEmailApp", ["ui.neptune", "ngRoute", "joinUsByEmailApp.emailForm", "ui-notification"])
    .config(function($routeProvider){
        $routeProvider
            .when("/", {
                controller:"JoinUsByEmailController as vm",
                templateUrl:"joinUsByEmail.html",
                resolve:{
                    sessionData:function(nptSession){
                        return nptSession();
                    }
                }
            })
            .when("/readyLogin/:email", {
                controller:"ReadyLoginController as vm",
                templateUrl:"readyLogin.html",
                resolve:{
                    sessionData:function(nptSession){
                        return nptSession();
                    }
                }
            });
    })
    .factory("AddUserByEmail", function(nptRepository){
        return nptRepository("AddUserByEmail");
    })
    .controller("JoinUsByEmailController", function($location, AddUserByEmail, EmailForm, Notification){
        var vm = this;
        vm.emailFormOption = {
            store:EmailForm,
            onRegisterApi: function(nptFormApi){
                vm.nptFormApi = nptFormApi;
            }
        };
        vm.addUserByEmailService = AddUserByEmail;
        vm.sure = function(email){
            vm.nptFormApi.form.$commitViewValue();
            if(vm.nptFormApi.form.$invalid){
                var errorText = "";
                angular.forEach(vm.nptFormApi.getErrorMessages(), function(value){
                    errorText = errorText + value + "</br>";
                });
                Notification.error({
                    title:"请输入正确的邮箱",
                    message:errorText, delay:2000
                });
            }
            else{
                vm.addUserByEmailService.post(email)
                    .then(function(response){
                        Notification.success({
                           message:'请进行邮箱验证来完成您注册的最后一步！', delay:2000
                        });
                        $location.path("/readyLogin/" + email.email);
                    }, function(err){
                        Notification.error({
                           title:"注册失败.",
                           message:err.data.cause, delay:2000
                        });
                    });
            }
        };
    })
    .controller("ReadyLoginController", function(){
        var vm = this;
    });
